"use client";

import Image from "next/image";
import logo from "public/assets/images/logo.png";
import paperHolding from "public/assets/images/paperHolding.png";
import Link from "next/link";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiLoginUser } from "@/lib/api-requests";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import FormInput from "@/components/FormInput";
import USERTYPE from "@/constants/USERTYPE";
import Loading from "@/components/Loading";

export default function LoginDetails({
  params,
}: {
  params: { userType: string };
}) {
  const store = useStore();
  const router = useRouter();
  const userType = params.userType;

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
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

	useEffect(() => {
		register("userType", { value: userType.toUpperCase() as USERTYPE })
	 }, [register])

  useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function LoginUserFunction(credentials: LoginUserInput) {
    store.setRequestLoading(true);
    try {
      await apiLoginUser(JSON.stringify(credentials));

      toast.success("Logged in successfully");
      return router.push("/");
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false)
			reset();
			register("userType", { value: userType.toUpperCase() as USERTYPE });
    }
  }

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    LoginUserFunction(values);
  };
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold py-5">Sign In</h1>
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
          <div className="flex flex-col px-5 justify-center items-center">
            <h1 className="capitalize text-2xl">
              Welcome <span className="font-black">{`${userType}`}</span>{" "}
            </h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full mx-auto overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5"
              >
                <FormInput label="Email" name="email" type="email" />
                <FormInput label="Password" name="password" type="password" />
                <Button type="submit">Log in</Button>
              </form>
            </FormProvider>
          </div>
          <div className="flex justify-center items-center flex-row">
            <h1>Wrong User Type?</h1>
            <Link href="/login">
              <h1 className="text-sky-500 pl-2 cursor-pointer">Back</h1>
            </Link>
          </div>
        </div>
      </div>
			{ store.requestLoading && <Loading />}
    </div>
  );
}

