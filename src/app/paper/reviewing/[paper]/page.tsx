"use client";

import { useContext, useEffect, useState } from "react";
import PaperStatusChip from "@/components/Status";
import {
  Breadcrumbs,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReviewForm from "@/components/ReviewForm";
import AccessDenied from "@/components/AccessDenied";
import useSession from "@/lib/useSession";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { ReviewReport } from "@/lib/types";

export default function PaperReview({ params }: { params: { paper: string } }) {
  const paperId = params.paper;
  const { userDetails } = useContext(UserDetailsContext);
  const [reviewReport, setReviewReport] = useState<ReviewReport[]>(
    [] as ReviewReport[]
  );

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/reviewReport?paperId=${paperId}&lecturerId=${userDetails.lecturer?.id}`,
      {
        cache: "no-store",
      }
    );

    setReviewReport(await res.json());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">{reviewReport[0]?.papers?.title}</h1>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Dashboard</Link>
          <Link href="/paper">Paper List</Link>
          <Link href={`/paper/${paperId}`}>{reviewReport[0]?.papers?.title}</Link>
          <Typography color="text-primary">Review</Typography>
        </Breadcrumbs>
      </div>
      <Paper sx={{ p: 5 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={3}>
            <div className="flex flex-col">
              <h1 className="font-black pb-2">Submitted By</h1>
              <p>{`${reviewReport[0]?.papers?.submittedBy?.firstName} ${reviewReport[0]?.papers?.submittedBy?.lastName}`}</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="flex flex-col">
              <h1 className="font-black pb-2">Keywords</h1>
              <p>
                {reviewReport[0]?.papers?.keywords?.map((keyword) => (
                  <span>{`${keyword}, `}</span>
                ))}
              </p>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ justifyContent: "center", display: "flex" }}>
            <div className="flex flex-row items-center">
              <h1 className="pr-2">Status:</h1>
              <PaperStatusChip status={reviewReport[0]?.papers?.status as string} />
            </div>
          </Grid>
        </Grid>
        <Divider sx={{ py: 1 }} />
        <div className="flex flex-col p-4">
          <div className="flex flex-row items-center">
            <h1 className="font-black text-xl pr-2">Review Results</h1>
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </div>
          {userDetails.user?.userType === "LECTURER" ? (
            <ReviewForm reviewReportId={reviewReport[0]?.id} />
          ) : (
            <AccessDenied />
          )}
        </div>
      </Paper>
    </div>
  );
}
