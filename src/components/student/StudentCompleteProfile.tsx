"use client";

import React, { useState } from "react";
import FormInput from "../FormInput";
import {
  RegisterStudentInput,
  RegisterStudentSchema,
} from "@/lib/validations/student.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useStore from "@/store";
import { apiRegisterStudent } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ProgramCode } from "@/lib/types";
import { Button } from "@mui/material";
import useSession from "@/lib/useSession";
import Loading from "../Loading";

interface RegisterStudentProps {
  userId: string;
}

const StudentCompleteProfile = ({ userId }: RegisterStudentProps) => {
  const store = useStore();
  const router = useRouter();
  const [programCode, setProgramCode] = useState<ProgramCode[]>(
    [] as ProgramCode[]
  );

  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/programCode", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Something went wrong!");
    }

    setProgramCode(await res.json());
  };

  const methods = useForm<RegisterStudentInput>({
    resolver: zodResolver(RegisterStudentSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function compare(a: any, b: any) {
    if (a.programCode < b.programCode) {
      return -1;
    }
    if (a.programCode > b.programCode) {
      return 1;
    }
    return 0;
  }

  async function RegisterStudentFunction(credentials: RegisterStudentInput) {
    store.setRequestLoading(true);
    try {
      const user = await apiRegisterStudent(JSON.stringify(credentials));
      if (user) {
        toast.success("Student Profile Updated");
        store.setAuthUser(user)
        return router.push("/");
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

  const onSubmitHandler: SubmitHandler<RegisterStudentInput> = (values) => {
    RegisterStudentFunction(values);
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
          <FormInput label="Matric Number" name="matricNo" />
          <div>
            <label
              htmlFor={"programCodeId"}
              className="block text-ct-blue-600 mb-3"
            >
              Program Code
            </label>
            <select
              {...register("programCodeId")}
              className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]"
            >
              <option value="" selected disabled hidden>
                Select one
              </option>
              {programCode.sort(compare).map((code) => (
                <option id={code.id} value={code.id}>
                  {`${code.programCode} - ${code.programName}`}
                </option>
              ))}
            </select>
            {errors["programCodeId"] && (
              <span className="text-red-500 text-xs pt-1 block">
                {errors["programCodeId"]?.message as string}
              </span>
            )}
          </div>
          <Button fullWidth type="submit">
            Update
          </Button>
        </form>
      </FormProvider>
      {store.requestLoading && <Loading />}
    </div>
  );
};

export default StudentCompleteProfile;
