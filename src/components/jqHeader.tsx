import ootg from "./../assets/images/jiaqin/ootg.jpeg";
import Image from "next/image";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Header() {
  return (
    <div className="fixed w-full h-20 z-[100] bg-[#778CCC]">
      <div className="flex justify-around items-center w-full h-full px-2">
        <Image src={ootg} alt="ootg logo" />
        <div>
          <ul className="flex">
            <li className="ml-10 text-lg text-white">Home</li>
            <li className="ml-10 text-lg text-white">Menu</li>
            <li className="ml-10 text-lg text-white">Find a Cafe</li>
            <li className="ml-10 text-lg text-white">FAQs</li>
          </ul>
        </div>
        <div className="flex">
          <StarBorderIcon className="ml-5 text-white" />
          <SearchIcon className="ml-5 text-white" />
          <LocalMallOutlinedIcon className="ml-5 text-white" />
          <PersonOutlineOutlinedIcon className="ml-5 text-white" />
        </div>
      </div>
    </div>
  );
}
