"use client";

import ForumStatusChip from "@/components/ForumStatus";
import {
  Breadcrumbs,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import Link from "next/link";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { LoremIpsum } from "react-lorem-ipsum";
import { useState, useEffect, useContext } from "react";
import { Message } from "@/lib/types";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import moment from "moment";
import {
  CreateMessageInput,
  CreateMessageSchema,
} from "@/lib/validations/message.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiCreateMessage } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

export default function ForumDetails({
  params,
}: {
  params: { forum: string };
}) {
  const forumId = params.forum;
  const [messages, setMessages] = useState<Message[]>([] as Message[]);
  const { userDetails } = useContext(UserDetailsContext);
  const store = useStore();

  const methods = useForm<CreateMessageInput>({
    resolver: zodResolver(CreateMessageSchema),
    defaultValues: {
      userId: userDetails.user?.id,
      forumId: forumId,
    },
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
      register("userId", { value: userDetails.user?.id });
      register("forumId", { value: forumId });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    register("userId", { value: userDetails.user?.id });
    register("forumId", { value: forumId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/message?forumId=${forumId}`,
      {
        cache: "no-store",
      }
    );

    setMessages(await res.json());
  };

  useEffect(() => {
    getData();
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function CreateMessageFunction(credentials: CreateMessageInput) {
    store.setRequestLoading(true);
    try {
      const message = await apiCreateMessage(JSON.stringify(credentials));

      if (message) {
        toast.success("Message sent");
        return getData();
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

  const onSubmitHandler: SubmitHandler<CreateMessageInput> = (values) => {
    CreateMessageFunction(values);
  };

  return (
    <div className="flex flex-col p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">{messages[0]?.forum.title}</h1>
        <Breadcrumbs>
          <Link href="/">Dashboard</Link>
          <Link href="/forum">Forum List</Link>
          <Typography color="text-primary">
            {messages[0]?.forum.title}
          </Typography>
        </Breadcrumbs>
      </div>
      <Paper sx={{ p: 5 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={3}>
            <div className="flex flex-col">
              <h1 className="font-black pb-2">Forum ID</h1>
              <p>{forumId}</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="flex flex-col">
              <h1 className="font-black pb-2">Opened By</h1>
              <p>
                {messages[0]?.forum.userId === userDetails.user?.id
                  ? "You"
                  : messages[0]?.forum.createdBy.student
                  ? `${messages[0]?.forum.createdBy.student?.firstName} ${messages[0]?.forum.createdBy.student?.lastName}`
                  : `${messages[0]?.forum.createdBy.lecturer?.firstName} ${messages[0]?.forum.createdBy.lecturer?.lastName}`}
              </p>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ justifyContent: "center", display: "flex" }}>
            <div className="flex flex-row items-center">
              <ForumStatusChip status={messages[0]?.forum.status} />
              <Button variant="text" sx={{ ml: 2 }}>
                Close Forum
              </Button>
            </div>
          </Grid>
        </Grid>
        <Divider sx={{ py: 1 }} />
        <div className="p-5 flex flex-col">
          <div className="overflow-auto min-h-96 max-h-96 p-2">
            {messages.map((message) => (
              <div className="flex flex-col py-3" id={message.id}>
                <p className="text-sm">
                  {message?.sentBy.id === userDetails.user?.id
                    ? "You"
                    : message?.sentBy.student
                    ? `${message?.sentBy.student?.firstName} ${message?.sentBy.student?.lastName}`
                    : `${message?.sentBy.lecturer?.firstName} ${message?.sentBy.lecturer?.lastName}`}
                </p>
                <div className="bg-[#EFF4FB] p-2 my-1">{message?.message}</div>
                <p className="text-sm">
                  {moment(message?.createdOn).format("DD/MM/YYYY hh:mma")}
                </p>
              </div>
            ))}
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="flex flex-col w-full py-3">
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
            </form>
          </FormProvider>
        </div>
      </Paper>
      {store.requestLoading && <Loading />}
    </div>
  );
}
