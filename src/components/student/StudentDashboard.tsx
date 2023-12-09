import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function createData(id: string, title: string, message: string) {
  return { id, title, message };
}

const rows = [
  createData(
    "1",
    "Title 1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis..."
  ),
  createData(
    "2",
    "Title 1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis..."
  ),
  createData(
    "3",
    "Title 1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis..."
  ),
  createData(
    "4",
    "Title 1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis..."
  ),
];

export default function StudentDashboard() {
  return (
    <div className="flex flex-col w-full p-7">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "full",
              justifyContent: "space-evenly",
            }}
          >
            <div className="flex flex-col justify-start py-10">
              <h1 className="font-black text-4xl">3</h1>
              <h1>Papers submitted</h1>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col justify-start py-10">
              <h1 className="font-black text-4xl">2</h1>
              <h1>Papers reviewing</h1>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col justify-start py-10">
              <h1 className="font-black text-4xl">1</h1>
              <h1>Papers accepted</h1>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col justify-start py-10">
              <h1 className="font-black text-4xl">0</h1>
              <h1>Papers need resubmission</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper
            sx={{
              p: 5,
            }}
          >
            <h1 className="font-black text-2xl">Latest Announcement</h1>
            <p className="pt-10 pl-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              lacinia turpis tortor, consequat efficitur mi congue a. Curabitur
              cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus
              ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et
              suscipit gravida nunc. Sed sed est quis dui.
            </p>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper
            sx={{
              p: 5,
            }}
          >
            <h1 className="font-black text-2xl pb-10">Forums</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="left">Message</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.message}</TableCell>
                      <TableCell>
                        <IconButton>
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
