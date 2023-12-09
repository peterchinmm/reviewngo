import PaperStatusChip from "@/components/Status";
import {
  Breadcrumbs,
  Button,
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
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Paper as PaperType } from "@/lib/types";
import moment from "moment";

interface StudentPaperProps {
  studentId: string;
}

export default function StudentPaperList({ studentId }: StudentPaperProps) {
  const [papers, setPapers] = useState<PaperType[]>([] as PaperType[]);

  const getData = async () => {
    const res = await fetch(
      `http://localhost:3000/api/paper?studentId=${studentId}`,
      {
        cache: "no-store",
      }
    );

    setPapers(await res.json());
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
              <TableCell>Submitted On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {papers.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>
                  {moment(row.submittedOn).format("DD MMM YYYY hh:mma")}
                </TableCell>
                <TableCell>
                  <PaperStatusChip status={row.status} />
                </TableCell>
                <TableCell>
                  <Link href={`/paper/${row.id}`}>
                    <IconButton>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Link>
                  <Link
                    href={`https://res.cloudinary.com/dqpnljzae/image/upload/v1699894859/${row.file}.pdf`}
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
      <div className="w-full flex justify-end">
        <Link href="/paper/newPaper">
          <Button
            variant="contained"
            style={{ backgroundColor: "#3C50E0", marginTop: "2rem" }}
          >
            <AddIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
