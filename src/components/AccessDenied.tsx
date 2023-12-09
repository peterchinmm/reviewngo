import Image from "next/image"
import noEntry from "./../../public/assets/images/noEntry.png"
import Link from "next/link"
import { Button } from "@mui/material"

export default function AccessDenied() {
	return(
		<div className="p-10 flex flex-row justify-center items-center">
      <Image src={noEntry} alt='Heavy Paper' width={500} height={500}/>
      <div className="flex flex-col">
        <h1 className="font-extrabold text-3xl">STOP! You shouldn't be here!</h1>
        <p className="text-lg pt-3 pb-5">You have no permission to access this section.</p>
				<Link href="/paper">
          <Button variant="contained" style={{ backgroundColor: "#3C50E0" }}>
            Go back
          </Button>
        </Link>
      </div>
    </div>
	)  
}