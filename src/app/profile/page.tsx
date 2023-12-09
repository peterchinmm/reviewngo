'use client'

import StudentProfile from '@/components/student/StudentProfile';
import LecturerProfile from '@/components/lecturer/LecturerProfile';
import { useContext } from "react";
import { UserDetailsContext } from "@/context/UserDetailsContext";

export default function Home() {
  const { userDetails } = useContext(UserDetailsContext);

  return (
    <>
    { userDetails.user?.userType === 'STUDENT' ? <StudentProfile user={userDetails}/> : null }
    { userDetails.user?.userType === 'LECTURER' ? <LecturerProfile user={userDetails}/> : null }
    </>
  );
}
