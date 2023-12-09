'use client'

import { useContext } from 'react';
import StudentPaperList from '@/components/student/StudentPaperList';
import LecturerPaperList from '@/components/lecturer/LecturerPaperList';
import { UserDetailsContext } from "@/context/UserDetailsContext";

export default function PaperList() {
  const { userDetails } = useContext(UserDetailsContext);

  return (
    <>
    { userDetails.user?.userType === 'STUDENT' ? <StudentPaperList studentId={userDetails.student?.id as string}/> : null }
		{ userDetails.user?.userType === 'LECTURER' ? <LecturerPaperList lecturerId={userDetails.lecturer?.id as string}/> : null }
    </>
  );
}