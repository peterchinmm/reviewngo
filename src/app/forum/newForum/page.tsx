"use client"

import {
  Breadcrumbs,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import Link from "next/link";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  CreateForumInput,
  CreateForumSchema,
} from "@/lib/validations/forum.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useContext } from "react";
import { apiCreateForum } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { UserDetailsContext } from "@/context/UserDetailsContext";

export default function NewForum() {
  const store = useStore();
  const router = useRouter();
  const { userDetails } = useContext(UserDetailsContext);

  const methods = useForm<CreateForumInput>({
    resolver: zodResolver(CreateForumSchema),
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
    register("userId", { value: userDetails.user?.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function CreateForumFunction(credentials: CreateForumInput) {
    store.setRequestLoading(true);
    try {
      const forum = await apiCreateForum(JSON.stringify(credentials));

      if (forum) {
        toast.success("Forum Created");
        return router.push(`/forum/${forum.id}`);
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

  const onSubmitHandler: SubmitHandler<CreateForumInput> = (values) => {
    CreateForumFunction(values);
  };

  return (
    <div className="flex flex-col p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">Create New Forum</h1>
        <Breadcrumbs>
          <Link href="/">Dashboard</Link>
          <Link href="/forum">Forum List</Link>
          <Typography color="text-primary">Create New Forum</Typography>
        </Breadcrumbs>
      </div>
      <Paper sx={{ p: 5 }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInput label="Forum Title" name="title" />
            <Divider sx={{ py: 1 }} />
            <div className="p-5 flex flex-col">
              <div className="overflow-auto h-96 max-h-96 p-2"></div>
              <div className="flex flex-col py-3">
                <FormInput label="Type something here" name="message" />
                <div className="flex justify-end w-full pt-3">

                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#3C50E0", marginLeft: "1rem" }}
                >
                  <SendOutlinedIcon />
                </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </Paper>
      { store.requestLoading && <Loading /> }
    </div>
  );
}
