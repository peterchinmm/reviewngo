"use client";

import React, { useState, useEffect } from "react";
import FormInput from "../FormInput";
import {
  RegisterLecturerInput,
  RegisterLecturerSchema,
} from "@/lib/validations/lecturer.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store";
import { apiRegisterLecturer } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@mui/material";
import Loading from "../Loading";

interface RegisterLecturerProps {
  userId: string;
}

const LecturerCompleteProfile = ({ userId }: RegisterLecturerProps) => {
  const store = useStore();
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: any) => {
    if (event.key === ",") {
      event.preventDefault();
      if (inputValue && !keywords.includes(inputValue)) {
        setKeywords([...keywords, inputValue]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (chipToDelete: any) => {
    setKeywords((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const methods = useForm<RegisterLecturerInput>({
    defaultValues: {
      expertise: keywords,
    },
    resolver: zodResolver(RegisterLecturerSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    register("userId", { value: userId });
  }, [register]);

  useEffect(() => {
    setValue("expertise", keywords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  async function RegisterLecturerFunction(credentials: RegisterLecturerInput) {
    store.setRequestLoading(true);
    try {
      const data = await apiRegisterLecturer(JSON.stringify(credentials));
      if (data) {
        const response = await fetch(`http://127.0.0.1:5000/update-lecturer-titles/${data.lecturer.id}`,
        {
          method: "PUT"
        })

        if (response) {
          toast.success("Lecturer Profile Updated");
          store.setAuthUser(data.user);
          return router.push("/");

        }
      }
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<RegisterLecturerInput> = (values) => {
    RegisterLecturerFunction(values);
  };

  return (
    <div className="h-auto">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
        >
          <FormInput label="First Name" name="firstName" />
          <FormInput label="Last Name" name="lastName" />
          <FormInput label="Phone Number" name="phoneNo" />
          <div className="">
            <label htmlFor="expertise" className="block text-ct-blue-600 mb-3">
              Expertise
            </label>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Press ',' to input new keyword"
                className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex flex-wrap pt-2">
                {keywords.map((keyword) => (
                  <Chip
                    key={keyword}
                    label={keyword}
                    onDelete={() => handleDelete(keyword)}
                    className="m-2"
                  />
                ))}
              </div>
            </div>
            {errors["expertise"] && (
              <span className="text-red-500 text-xs pt-1 block">
                {errors["expertise"]?.message as string}
              </span>
            )}
          </div>
          <FormInput
            label="Google Scholar Profile Link"
            name="googleScholarLink"
          />

          <Button fullWidth type="submit">
            Update
          </Button>
        </form>
      </FormProvider>
      {store.requestLoading && <Loading />}
    </div>
  );
};

export default LecturerCompleteProfile;
