import Image from "next/image"
import heavyPaper from "./../../../public/assets/images/heavyPaper.png"

export default function StudentReviewing() {
  return (
		<div className="p-10 flex flex-row justify-center items-center">
      <Image src={heavyPaper} alt='Heavy Paper'/>
      <div className="flex flex-col">
        <h1 className="font-extrabold text-3xl">Oops! Your paper is still under reviewing...</h1>
        <p className="text-lg pt-3">Have a little patience, your examiners are working hard</p>
      </div>
    </div>
	)
}