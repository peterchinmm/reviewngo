import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import REVIEW_SCORE from "@/constants/REVIEW_SCORE";
import PAPER_RESULT from "@/constants/PAPER_RESULT";
import {
  ReviewReportInput,
  ReviewReportSchema,
} from "@/lib/validations/reviewReport.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store";
import FormInput from "./FormInput";
import { apiReviewReport } from "@/lib/api-requests";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface ReviewFormProps {
  reviewReportId: string;
}

export default function ReviewForm({ reviewReportId }: ReviewFormProps) {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<ReviewReportInput>({
    resolver: zodResolver(ReviewReportSchema),
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

  interface Titles {
    name: string;
    value: "titleScore" | "objectiveScore" | "problemStatementScore" | "projectScopeScore" | "methodologyScore" | "projectPlanScore" | "remarks" | "overallScore"
  }

  const titles: Titles[] = [
    { name: "Project Title", value: "titleScore" },
    { name: "Project Objective", value: "objectiveScore" },
    { name: "Problem Statement", value: "problemStatementScore" },
    { name: "Project Scope", value: "projectScopeScore" },
    { name: "Methodology", value: "methodologyScore" },
    { name: "Project Plan", value: "projectPlanScore" },
  ];

  async function ReviewReportFunction(credentials: ReviewReportInput) {
    store.setRequestLoading(true);
    try {
      const reviewReport = await apiReviewReport(
        JSON.stringify(credentials),
        reviewReportId
      );

      if (reviewReport) {
        toast.success("Review Report Added Successfully");
        return router.push(`/paper/${reviewReport.paperId}`);
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

  const onSubmitHandler: SubmitHandler<ReviewReportInput> = (values) => {
    ReviewReportFunction(values);
  };

  return (
    <div className="pt-5">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="">
          <Grid container spacing={4}>
            {titles.map((title) => (
              <Grid key={title.name} item xs={4}>
                <label htmlFor={title.value} className="block text-ct-blue-600 mb-3">
                  {title.name}
                </label>
                <select {...register(title.value)} className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]">
                  <option value="" selected disabled hidden>
                    Select one
                  </option>
                  {(Object.keys(REVIEW_SCORE) as Array<REVIEW_SCORE>).map(
                    (score) => (
                      <option id={score} value={score}>
                        {score.split("_").join(" ")}
                      </option>
                    )
                  )}
                </select>
                {errors[title.value] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors[title.value]?.message as string}
                  </span>
                )}
              </Grid>
            ))}
            <Grid item xs={6}>
              <FormInput name="remarks" label="Overall Evaluation"/>
            </Grid>
            <Grid item xs={6}>
              <div className="flex flex-col">
              <label htmlFor="overallScore" className="block text-ct-blue-600 mb-3">
                  Decision
                </label>
                <select {...register("overallScore")} className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4 bg-[#F1F5F9]">
                  <option value="" selected disabled hidden>
                    Select one
                  </option>
                  {(Object.keys(PAPER_RESULT) as Array<PAPER_RESULT>).map(
                    (score) => (
                      <option id={score} value={score}>
                        {score.split("_").join(" ")}
                      </option>
                    )
                  )}
                </select>
                {errors["overallScore"] && (
                  <span className="text-red-500 text-xs pt-1 block">
                    {errors["overallScore"]?.message as string}
                  </span>
                )}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#3C50E0", marginTop: "2rem" }}
                  fullWidth
                  type="submit"
                >
                  Submit Review
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      { store.requestLoading && <Loading />}
    </div>
  );
}
