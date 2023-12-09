"use client"

import PaperStatusChip from "@/components/Status";
import {
  Breadcrumbs,
  Typography,
  Paper,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ReviewResult from "@/components/ReviewResult";
import { useEffect, useState } from "react";
import { Paper as PaperType } from "@/lib/types";

export default function PaperDetails({
  params,
}: {
  params: { paper: string };
}) {
  const paperId = params.paper as string
  const [paper, setPaper] = useState<PaperType>({} as PaperType);
  
  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/paper/${paperId}`,
      {
        cache: "no-store",
      }
    );

    setPaper(await res.json());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">{paper.title}</h1>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Dashboard</Link>
          <Link href="/paper">Paper List</Link>
          <Typography color="text-primary">{paper.title}</Typography>
        </Breadcrumbs>
      </div>
      <Paper sx={{ p: 5 }}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={3}>
            <div className="flex flex-col">
              <h1 className="font-black pb-2">Paper ID</h1>
              <p>{paper.id}</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="flex flex-col">
              <h1 className="font-black pb-2">Keywords</h1>
              <p>
                
              {paper.keywords?.map((keyword) => (
                <span>{`${keyword}, `}</span>
              ))}
              </p>
            </div>
          </Grid>
          <Grid item xs={6} sx={{ justifyContent: "center", display: "flex" }}>
            <div className="flex flex-row items-center">
              <h1 className="pr-2">Status:</h1>
              <PaperStatusChip status={paper.status} />
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
					<ReviewResult status={paper.status} paper={paperId}/>
        </div>
      </Paper>
    </div>
  );
}
