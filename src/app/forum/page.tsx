"use client"

import ForumStatusChip from "@/components/ForumStatus";
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
import AddIcon from "@mui/icons-material/Add";
import { useState, useContext, useEffect } from "react";
import { Forum } from "@/lib/types";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import moment from "moment";

function createData(
  id: string,
  title: string,
  openBy: string,
  submittedOn: string,
  status: number
) {
  return { id, title, openBy, submittedOn, status };
}

const rows = [
  createData("forum-1", "Title 1", "Student 1", "Jan 13, 2023", 1),
  createData("forum-2", "Title 1", "Student 1", "Jan 13, 2023", 2),
  createData("forum-3", "Title 1", "Student 1", "Jan 13, 2023", 1),
  createData("forum-4", "Title 1", "Student 1", "Jan 13, 2023", 2),
];

export default function Forum() {
  const [forums, setForums] = useState<Forum[]>([] as Forum[])
  const { userDetails } = useContext(UserDetailsContext);

  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/forum", {
      cache: "no-store"
    });

    setForums(await res.json())
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col w-full p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">Forum List</h1>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Dashboard</Link>
          <Typography color="text.primary">Forum List</Typography>
        </Breadcrumbs>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Opened By</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forums.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{display: 'flex', flexDirection: 'column'}}>
                  <h1 className="font-bold">{row.title}</h1>
                  <p>Lorem Ipsum</p>
                </TableCell>
                <TableCell>
                {row.userId === userDetails.user?.id
                  ? "You"
                  : row.createdBy.student
                  ? `${row.createdBy.student?.firstName} ${row.createdBy.student?.lastName}`
                  : `${row.createdBy.lecturer?.firstName} ${row.createdBy.lecturer?.lastName}`}
                </TableCell>
                <TableCell>{moment(row.dateCreated).format("DD MMM YYYY hh:mma")}</TableCell>
                <TableCell>
                  <ForumStatusChip status={row.status} />
                </TableCell>
                <TableCell>
                  <Link href={`/forum/${row.id}`}>
                    <IconButton>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full flex justify-end">
        <Link href="/forum/newForum">
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
