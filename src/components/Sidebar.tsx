'use client'

import Logo from "./../../public/assets/images/logo.png";
import Image from "next/image";
import GridViewIcon from "@mui/icons-material/GridView";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Link from "next/link";
import { useContext } from 'react';
import { Button } from "@mui/material";

export default function Sidebar() {

  return (
    <div className="bg-[#1C2434] h-screen w-60 fixed inset-y-0 left-0 p-5 text-white">
      <Link href="/">
        <div className="flex items-center justify-center flex-row hover:cursor-pointer">
          <Image src={Logo} alt="logo" height={70} width={70} />
          <h1 className="text-lg px-2">Review N Go</h1>
        </div>
      </Link>
      <div className="text-[#DEE4EE] pt-10">
        <p className="text-[#8A99AF] text-sm pb-1">MENU</p>
        <ul>
          <li>
            <Link href="/">
              <div className="flex flex-row text-lg py-3 items-center pl-2 hover:cursor-pointer rounded-md hover:bg-[#333A48]">
                <GridViewIcon />
                <p className="px-2">Dashboard</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <div className="flex flex-row text-lg py-3 items-center pl-2 hover:cursor-pointer rounded-md hover:bg-[#333A48]">
                <PermIdentityIcon />
                <p className="px-2">Profile</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/paper">
              <div className="flex flex-row text-lg py-3 items-center pl-2 hover:cursor-pointer rounded-md hover:bg-[#333A48]">
                <DescriptionOutlinedIcon />
                <p className="px-2">Paper</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/forum">
              <div className="flex flex-row text-lg py-3 items-center pl-2 hover:cursor-pointer rounded-md hover:bg-[#333A48]">
                <ForumOutlinedIcon />
                <p className="px-2">Forum</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="text-[#DEE4EE] pt-5">
        <p className="text-[#8A99AF] text-sm pb-1">SUPPORT</p>
        <ul>
          <li>
            <Link href="/enquiry">
              <div className="flex flex-row text-lg py-3 items-center pl-2 hover:cursor-pointer rounded-md hover:bg-[#333A48]">
                <MailOutlineIcon />
                <p className="px-2">Enquiry</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="flex justify-center pt-10 flex-col items-center">
        <h1>Current User: {userType.toUpperCase()}</h1>
        <Button onClick={switchUserType}>Switch User</Button>
      </div> */}
    </div>
  );
}
