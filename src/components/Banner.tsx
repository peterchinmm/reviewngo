import chef from "./../assets/images/jiaqin/cuate.png";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="pt-20 bg-[#C2D7F3] h-auto w-full flex justify-end">
      <Image src={chef} alt="chef" className="p-20" />
    </div>
  );
}
