"use client"

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import useStore from "@/store";
import { apiLogoutUser } from "@/lib/api-requests";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { useContext } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Header() {
  const store = useStore();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { userDetails } = useContext(UserDetailsContext);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutUser();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  }

  let userData: any = {};
  if (userDetails.student) userData = userDetails.student;
  if (userDetails.lecturer) userData = userDetails.lecturer;
  if (userDetails.admin) userData = userDetails.admin;


  return (
    <div className="h-16 bg-white fixed inset-x-0 top-0 ml-60 p-2 pr-10">
      <div className="flex flex-row justify-end items-center h-full">
        <p className="pl-10 pr-3 text-base">{`${userData.firstName} ${userData.lastName}`}</p>
        <div
          className="flex flex-row items-center hover:cursor-pointer"
          onClick={handleClick}
        >
          <Avatar 
          {...stringAvatar(`${userData.firstName} ${userData.lastName}`)} 
          src={userData?.img ? `https://res.cloudinary.com/dqpnljzae/image/upload/v1699894859/${userData?.img}.jpg` : ""}
          />
          <KeyboardArrowDownIcon />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Link href="/profile">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      { store.requestLoading && <Loading />}
    </div>
  );
}
