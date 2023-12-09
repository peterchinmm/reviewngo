import { Breadcrumbs, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import support from "./../../../public/assets/images/support.png";

export default function Enquiry() {
  return (
    <div className="flex flex-col p-7">
      <div className="flex flex-row justify-between pb-10">
        <h1 className="font-black text-3xl">Enquiry</h1>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Dashboard</Link>
          <Typography color="text-primary">Enquiry</Typography>
        </Breadcrumbs>
      </div>
      <Paper sx={{ p: 5 }}>
        <div className="flex flex-row justify-center items-center">
          <Image src={support} alt="support pic" />
          <div className="flex flex-col px-10">
            <h1 className="font-black text-3xl">Facing any problems?</h1>
            <h1 className="font-black text-3xl py-2">Let Us Know!</h1>
            <p className="font-extrabold text-lg py-2">Subject</p>
            <TextField variant="outlined" />
            <p className="font-extrabold text-lg py-2">Description</p>
            <TextField variant="outlined" multiline rows={4} />
						<Button fullWidth variant="contained" style={{ backgroundColor: "#3C50E0", marginTop: '1rem' }}>
							Submit
						</Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
