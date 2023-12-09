import Image from "next/image";
import heavyPaper from "./../../../public/assets/images/heavyPaper.png";
import { Button } from "@mui/material";
import Link from "next/link";

interface LecturerProps {
  paper: string;
}

export default function LecturerReviewing(props: LecturerProps) {
  const { paper } = props;

  return (
    <div className="p-10 flex flex-row justify-center items-center">
      <Image src={heavyPaper} alt="Heavy Paper" />
      <div className="flex flex-col">
        <h1 className="font-extrabold text-3xl pb-5">
          Oops! You have not reviewed this paper...
        </h1>
        <Link href={`/paper/reviewing/${paper}`}>
          <Button variant="contained" style={{ backgroundColor: "#3C50E0" }}>
            Review Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
