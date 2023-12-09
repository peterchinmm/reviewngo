"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Chip,
  Breadcrumbs,
  Typography,
  Grid,
  Paper,
  Divider,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { loremIpsum } from "react-lorem-ipsum";
import Link from "next/link";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormInput from "@/components/FormInput";
import { NewPaperInput, NewPaperSchema } from "@/lib/validations/paper.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store";
import { apiCreatePaper } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { FilteredLecturer } from "@/lib/types";

export default function NewPaper() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [path, setPath] = React.useState<string>("");
  const { userDetails } = useContext(UserDetailsContext);
  const [lecturers, setLecturers] = useState<FilteredLecturer[]>(
    [] as FilteredLecturer[]
  );
  const store = useStore();
  const router = useRouter();

  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/lecturers", {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("Something went wrong!");
    }

    setLecturers(await res.json());
  };

  const handleKeyDown = (event: any) => {
    if (event.key === ",") {
      event.preventDefault();
      if (inputValue && !keywords.includes(inputValue)) {
        setKeywords([...keywords, inputValue]);
      }
      setInputValue("");
    }
  };

  const methods = useForm<NewPaperInput>({
    defaultValues: {
      keywords: keywords,
      file: "",
    },
    resolver: zodResolver(NewPaperSchema),
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

  // useEffect(() => {
  //   register("studentId", { value: userDetails.student?.id });
  // }, [register]);

  useEffect(() => {
    setValue("keywords", keywords);
    setValue("studentId", userDetails.student?.id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (chipToDelete: any) => {
    setKeywords((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const FileUpload = () => {
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      setPath(URL.createObjectURL(acceptedFiles[0]));
      setValue("file", "true");
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

  async function NewPaperFunction(credentials: NewPaperInput) {
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
        ...credentials,
        file: data.public_id,
      };
      try {
        const paper = await apiCreatePaper(JSON.stringify(values));
        if (paper) {
          const response = await fetch(`http://127.0.0.1:5000/select-lecturer/${paper.id}`, {
            method: "POST"
          })

          if (response) {
            toast.success("Paper Created");
            return router.push("/paper");
          }

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
  }

  const onSubmitHandler: SubmitHandler<NewPaperInput> = (values) => {
    NewPaperFunction(values);
  };

  function compare(a: any, b: any) {
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    return 0;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col p-7">
          <div className="flex flex-row justify-between pb-10">
            <h1 className="font-black text-3xl">Add New Submission</h1>
            <Breadcrumbs>
              <Link href="/">Dashboard</Link>
              <Link href="/paper">Paper List</Link>
              <Typography color="text-primary">Add New Submission</Typography>
            </Breadcrumbs>
          </div>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Paper sx={{ p: 3 }}>
                <h1 className="pb-4 font-black">Paper information</h1>
                <Divider />
                <div className="max-w-md w-full overflow-hidden bg-ct-dark-200 rounded-2xl p-8 space-y-5">
                  <FormInput name="title" label="Title" />
                  <div>
                    <label
                      htmlFor={"lecturerId"}
                      className="block text-ct-blue-600 mb-3"
                    >
                      Supervisor
                    </label>
                    <select
                      {...register("lecturerId")}
                      className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]"
                    >
                      <option value="" selected disabled hidden>
                        Select one
                      </option>
                      {lecturers.sort(compare).map((lecturer) => (
                        <option id={lecturer.id} value={lecturer.id}>
                          {`${lecturer.firstName} ${lecturer.lastName}`}
                        </option>
                      ))}
                    </select>
                    {errors["lecturerId"] && (
                      <span className="text-red-500 text-xs pt-1 block">
                        {errors["lecturerId"]?.message as string}
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      htmlFor="keywords"
                      className="block text-ct-blue-600 mb-3"
                    >
                      Keywords
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
                    {errors["keywords"] && (
                      <span className="text-red-500 text-xs pt-1 block">
                        {errors["keywords"]?.message as string}
                      </span>
                    )}
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ p: 3 }}>
                <h1 className="pb-4 font-black">File Upload</h1>
                <Divider />
                <div className="py-5">
                  <FileUpload />
                  {errors["file"] && (
                      <span className="text-red-500 text-xs pt-1 block">
                        {errors["file"]?.message as string}
                      </span>
                    )}
                </div>
                {/* <FormGroup sx={{ pb: 2 }}>
                  <FormControlLabel
                    sx={{ alignItems: "flex-start", display: "flex" }}
                    required
                    control={<Checkbox />}
                    label={loremIpsum()}
                  />
                  <FormControlLabel
                    sx={{ alignItems: "flex-start", display: "flex" }}
                    required
                    control={<Checkbox />}
                    label={loremIpsum()}
                  />
                </FormGroup> */}
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  style={{ backgroundColor: "#3C50E0" }}
                >
                  Submit Paper
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </form>
      { store.requestLoading && <Loading />}
    </FormProvider>
  );
}
