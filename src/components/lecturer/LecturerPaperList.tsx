import PaperStatusChip from "@/components/Status";
import {
  Breadcrumbs,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useEffect, useState } from "react";
import { Paper as PaperType, ReviewReport } from "@/lib/types";
import moment from "moment";

interface LecturerPaperProps {
  lecturerId: string;
}

export default function LecturerPaperList({ lecturerId }: LecturerPaperProps) {
  const [reviewReport, setReviewReport] = useState<ReviewReport[]>(
    [] as ReviewReport[]
  );

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/reviewReport?lecturerId=${lecturerId}`,
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
    <div className="flex flex-col w-full p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">Paper List</h1>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Dashboard</Link>
          <Typography color="text.primary">Paper List</Typography>
        </Breadcrumbs>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Submitted By</TableCell>
              <TableCell>Submitted On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewReport?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.papers?.title}
                </TableCell>
                <TableCell>{`${row.papers?.submittedBy?.firstName} ${row.papers?.submittedBy?.lastName}`}</TableCell>
                <TableCell>
                  {moment(row.papers?.submittedOn).format("DD MMM YYYY hh:mma")}
                </TableCell>
                <TableCell>
                  <PaperStatusChip status={row.papers?.status as string} />
                </TableCell>
                <TableCell>
                  <Link href={`/paper/${row.papers?.id}`}>
                    <IconButton>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Link>
                  <Link
                    href={`https://res.cloudinary.com/dqpnljzae/image/upload/v1699894859/${row.papers?.file}.pdf`}
                    target="_blank"
                  >
                    <IconButton>
                      <FileDownloadOutlinedIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
