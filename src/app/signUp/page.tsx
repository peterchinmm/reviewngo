"use client";

import Image from "next/image";
import logo from "public/assets/images/logo.png";
import paperHolding from "public/assets/images/paperHolding.png";
import Link from "next/link";
import { Button } from "@mui/material";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiRegisterUser } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import USERTYPE from "@/constants/USERTYPE";
import Loading from "@/components/Loading";

export default function SignUp() {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: RegisterUserInput) {
    store.setRequestLoading(true);
    try {
      const user = await apiRegisterUser(JSON.stringify(credentials));
      if (user) {
        return router.push("/login");
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

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold py-5">Sign Up</h1>
      <div className="bg-white h-3/4 w-3/4 shadow-lg grid grid-cols-2 divide-x-2">
        <div className="flex justify-center items-center flex-col p-2">
          <div className="flex justify-center items-center">
            <Image src={logo} alt="logo" height={80} width={80} />
            <h1 className="text-2xl px-3">Review N Go</h1>
          </div>
          <div className="w-1/2">
            <p className="text-center text-[#64748B] text-base py-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
          </div>
          <Image src={paperHolding} alt="paper holding guy" />
        </div>
        <div className="grid-rows-2 pt-20">
          <div className="flex justify-center items-center px-5 flex-col">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
              >
                <FormInput name="email" label="Email" type="email" />
                <FormInput name="password" label="Password" type="password" />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                />
                <div className="flex flex-row justify-around">
                  <label>
                    <div className="flex">
                      <input
                        type="radio"
                        value={"STUDENT" as USERTYPE}
                        {...register("userType")}
                      />
                      <h1 className="pl-2">Student</h1>
                    </div>
                  </label>
                  <label>
                    <div className="flex">
                      <input
                        type="radio"
                        value={"LECTURER" as USERTYPE}
                        {...register("userType")}
                      />
                      <h1 className="pl-2">Lecturer</h1>
                    </div>
                  </label>
                  <label>
                    <div className="flex">
                      <input
                        type="radio"
                        value={"ADMIN" as USERTYPE}
                        {...register("userType")}
                      />
                      <h1 className="pl-2">Admin</h1>
                    </div>
                  </label>
                </div>
                <Button className="py-3" fullWidth type="submit">
                  Create account
                </Button>
              </form>
            </FormProvider>
          </div>
          <div className="flex justify-center items-center flex-row">
            <h1>Already have an account?</h1>
            <Link href="/">
              <h1 className="text-sky-500 pl-2 cursor-pointer">Sign In</h1>
            </Link>
          </div>
        </div>
      </div>
      {store.requestLoading && <Loading />}
    </div>
  );
}
