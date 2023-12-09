"use client";

import { useContext } from "react";
import PAPER_RESULT from "@/constants/PAPER_RESULT";
import PAPER_STATUS from "@/constants/PAPER_STATUS";
import REVIEW_SCORE from "@/constants/REVIEW_SCORE";
import { Grid, Alert, AlertTitle } from "@mui/material";
import StudentReviewing from "./student/StudentReviewing";
import LecturerReviewing from "./lecturer/LecturerReviewing";
import useSession from "@/lib/useSession";
import { useState, useEffect } from "react";
import { ReviewReport } from "@/lib/types";
import { UserDetailsContext } from "@/context/UserDetailsContext";

interface StatusProps {
  status: PAPER_STATUS;
  paper: string;
}

export default function ReviewResult(props: StatusProps) {
  const { status, paper } = props;
  const { userDetails } = useContext(UserDetailsContext);
  const [reviewReport, setReviewReport] = useState<ReviewReport[]>(
    [] as ReviewReport[]
  );
  const [oneReviewReport, setOneReviewReport] = useState<ReviewReport[]>(
    [] as ReviewReport[]
  );

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/reviewReport?paperId=${paper}`,
      {
        cache: "no-store",
      }
    );

    const resres = await fetch(
      `http://localhost:3000/api/reviewReport?paperId=${paper}&lecturerId=${userDetails.lecturer?.id}`
    );

    setReviewReport(await res.json());
    setOneReviewReport(await resres.json());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return status !== PAPER_STATUS.PENDING ? (
    userDetails.user?.userType === "STUDENT" &&
    status === PAPER_STATUS.REVIEWING ? (
      <StudentReviewing />
    ) : (
      <>
        {userDetails.user?.userType === "STUDENT" || oneReviewReport[0]?.reviewed ? (
          <div className="pt-5">
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Project Title</h1>
                  {reviewReport.map((review, index) => (
                    <p key={review.id} className="capitalize">
                      {`Examiner ${index + 1}: ${
                        review.titleScore
                          ? REVIEW_SCORE[review.titleScore]
                              .toLowerCase()
                              .replace("_", " ")
                          : "-"
                      }`}
                    </p>
                  ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Project Objective</h1>
                  {reviewReport.map((review, index) => (
                    <p key={review.id} className="capitalize">
                      {`Examiner ${index + 1}: ${
                        review.objectiveScore
                          ? REVIEW_SCORE[review.objectiveScore]
                              .toLowerCase()
                              .replace("_", " ")
                          : "-"
                      }`}
                    </p>
                  ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Problem Statement</h1>
                  {reviewReport.map((review, index) => (
                    <p key={review.id} className="capitalize">
                      {`Examiner ${index + 1}: ${
                        review.problemStatementScore
                          ? REVIEW_SCORE[review.problemStatementScore]
                              .toLowerCase()
                              .replace("_", " ")
                          : "-"
                      }`}
                    </p>
                  ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Project Scope</h1>
                  {reviewReport.map((review, index) => (
                    <p key={review.id} className="capitalize">
                      {`Examiner ${index + 1}: ${
                        review.projectScopeScore
                          ? REVIEW_SCORE[review.projectScopeScore]
                              .toLowerCase()
                              .replace("_", " ")
                          : "-"
                      }`}
                    </p>
                  ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Methodology</h1>
                  {reviewReport.map((review, index) => (
                    <p key={review.id} className="capitalize">
                      {`Examiner ${index + 1}: ${
                        review.methodologyScore
                          ? REVIEW_SCORE[review.methodologyScore]
                              .toLowerCase()
                              .replace("_", " ")
                          : "-"
                      }`}
                    </p>
                  ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Project Plan</h1>
                  {reviewReport.map((review, index) => (
                    <p key={review.id} className="capitalize">
                      {`Examiner ${index + 1}: ${
                        review.projectPlanScore
                          ? REVIEW_SCORE[review.projectPlanScore]
                              .toLowerCase()
                              .replace("_", " ")
                          : "-"
                      }`}
                    </p>
                  ))}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">
                    Examiner 1's Overall Evaluation
                  </h1>
                  <p>{reviewReport[0]?.remarks}</p>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">
                    Examiner 2's Overall Evaluation
                  </h1>
                  <p>{reviewReport[1]?.remarks}</p>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Examiner 1's Decision</h1>
                  <p className="capitalize">
                    {reviewReport[0]?.overallScore
                      ? PAPER_RESULT[reviewReport[0].overallScore]
                          .toLowerCase()
                          .replace("_", " ")
                      : "-"}
                  </p>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="flex flex-col">
                  <h1 className="font-black pb-2">Examiner 2's Decision</h1>
                  <p className="capitalize">
                    {reviewReport[1]?.overallScore
                      ? PAPER_RESULT[reviewReport[1].overallScore]
                          .toLowerCase()
                          .replace("_", " ")
                      : "-"}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                {status !== PAPER_STATUS.REVIEWING ? (
                  status === PAPER_STATUS.ACCEPTED ? (
                    <Alert severity="success">
                      <AlertTitle sx={{ fontWeight: "fontWeightBold" }}>
                        Congratulations! Your proposal has been accepted!
                      </AlertTitle>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      <AlertTitle sx={{ fontWeight: "fontWeightBold" }}>
                        Your FYP is in danger!
                      </AlertTitle>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Alert>
                  )
                ) : (
                  <Alert severity="info">
                    <AlertTitle sx={{ fontWeight: "fontWeightBold" }}>
                      This paper has not been fully reviewed yet...
                    </AlertTitle>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Alert>
                )}
              </Grid>
            </Grid>
          </div>
        ) : (
          <LecturerReviewing paper={paper} />
        )}
      </>
    )
  ) : userDetails.user?.userType === "LECTURER" ? (
    <LecturerReviewing paper={paper} />
  ) : (
    <StudentReviewing />
  );
}
