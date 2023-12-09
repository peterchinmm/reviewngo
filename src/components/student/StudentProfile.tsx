"use client";

import React, { useState } from "react";
import {
  Breadcrumbs,
  Typography,
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
  Avatar,
  Box,
  Modal,
} from "@mui/material";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { AllUser } from "@/lib/types";
import {
  UpdateStudentInput,
  UpdateStudentSchema,
} from "@/lib/validations/student.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiUpdateStudent, apiUpdateStudentImage } from "@/lib/api-requests";
import FormInput from "../FormInput";
import Input from "../Input";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import crypto from "crypto";

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 50,
      height: 50,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex")
}

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
}

interface StudentProfileProps {
  user: AllUser;
}

export default function StudentProfile({ user }: StudentProfileProps) {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [path, setPath] = React.useState<string>("");
  const store = useStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cloudName = process.env["NEXT_PUBLIC_CLOUDNAME"] as string;
  const apiKey = process.env["NEXT_PUBLIC_CLOUDAPIKEY"] as string;
  const apiSecret = process.env["NEXT_PUBLIC_CLOUDINARYSECRET"] as string;

  const studentDetails = user.student;

  const methods = useForm<UpdateStudentInput>({
    resolver: zodResolver(UpdateStudentSchema),
    defaultValues: {
      firstName: studentDetails?.firstName,
      lastName: studentDetails?.lastName,
      phoneNo: studentDetails?.phoneNo,
    },
  });

  const {
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

  async function UpdateStudentFunction(credentials: UpdateStudentInput) {
    store.setRequestLoading(true);
    try {
      const student = await apiUpdateStudent(
        JSON.stringify(credentials),
        studentDetails?.id as string
      );
      console.log(student);
      if (student) {
        toast.success("Updated Successfully");
        return window.location.reload();
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

  const onSubmitHandler: SubmitHandler<UpdateStudentInput> = (values) => {
    UpdateStudentFunction(values);
  };

  const FileUpload = () => {
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      setPath(URL.createObjectURL(acceptedFiles[0]));
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()} className="border-dashed border-2 p-4">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop your photo here, or click to select files</p>
        )}
        <ul>
          {files
            ? files.map((file: any) => (
                <li key={file.path}>
                  <DescriptionOutlinedIcon /> {file.path} - {file.type}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  };

  const handleSubmitFile = async () => {
    if (!files) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ydahyvhy");

    try {
      store.setRequestLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqpnljzae/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const values = {
        img: data.public_id,
      };
      try {
        const student = await apiUpdateStudentImage(
          JSON.stringify(values),
          studentDetails?.id as string
        );
        console.log(student);
        if (student) {
          setFiles(undefined);
          toast.success("Image Uploaded Successfully");
          return window.location.reload();
        }
      } catch (error: any) {
        if (error instanceof Error) {
          handleApiError(error);
        } else {
          toast.error(error.message);
          console.log("Error message:", error.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      store.setRequestLoading(false);
    }
  };

  const handleDeleteImage = async() => {
    const public_id = studentDetails?.img as string;
    const timestamp = new Date().getTime();
    const signature = generateSHA1(generateSignature(public_id, apiSecret))
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    handleClose()
    
    if(public_id) {
      const values = {
        img: "",
      };

      try {
        store.setRequestLoading(true)
        const student = await apiUpdateStudentImage(
          JSON.stringify(values),
          studentDetails?.id as string
        );
        console.log(student);
        if (student) {
          try{
            const response = await fetch(url, {
              method: "POST",
              body: JSON.stringify({
                public_id: public_id,
                signature: signature,
                api_key: apiKey,
                timestamp: timestamp
              })
            })

            if(response) {
              toast.success("Image Deleted Successfully");
              return window.location.reload();
            }
          }catch(error){
            console.error(error)
          }
        }
      } catch (error: any) {
        if (error instanceof Error) {
          handleApiError(error);
        } else {
          toast.error(error.message);
          console.log("Error message: ", error.message)
        }
      } finally {
        store.setRequestLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">Profile</h1>
        <Breadcrumbs>
          <Link href="/">Dashboard</Link>
          <Typography color="text-primary">Profile</Typography>
        </Breadcrumbs>
      </div>
      <Grid container spacing={5}>
        <Grid item xs={7}>
          <Paper sx={{ p: 3 }}>
            <h1 className="pb-4 font-black">Personal information</h1>
            <Divider />
            <div className="py-10 flex flex-col">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormInput name="firstName" label="First Name" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormInput name="lastName" label="Last Name" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput name="phoneNo" label="Phone Number" />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        label="Matric No"
                        disabled
                        value={studentDetails?.matricNo}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input label="Email" disabled value={user.user.email} />
                    </Grid>
                  </Grid>
                  <div className="flex justify-end pt-5">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "#3C50E0" }}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper sx={{ p: 3 }}>
            <h1 className="pb-4 font-black">Your Photo</h1>
            <Divider />
            <div className="py-10 flex flex-col p-2">
              <div className="flex flex-row items-center pb-5">
                <Avatar
                  {...stringAvatar(
                    `${studentDetails?.firstName} ${studentDetails?.lastName}`
                  )}
                  src={
                    studentDetails?.img
                      ? `https://res.cloudinary.com/dqpnljzae/image/upload/v1699894859/${studentDetails?.img}.jpg`
                      : ""
                  }
                />
                <div className="flex flex-col pl-5">
                  <h1>Edit your photo</h1>
                  <Button variant="text" color="error" onClick={handleOpen}>
                    Delete
                  </Button>
                </div>
              </div>
              <FileUpload />
              <div className="flex justify-end pt-5">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#3C50E0" }}
                  onClick={handleSubmitFile}
                >
                  Save
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={modalBoxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <div className="w-full flex justify-end mt-5">
            <Button variant="contained" color="error" onClick={handleDeleteImage}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
      {store.requestLoading && <Loading />}
    </div>
  );
}
