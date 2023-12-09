"use client"
import { Paper } from "@mui/material";
import { RegisterStudentInput, RegisterStudentSchema } from "@/lib/validations/student.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useSession from "@/lib/useSession";
import StudentCompleteProfile from "@/components/student/StudentCompleteProfile";
import LecturerCompleteProfile from "@/components/lecturer/LecturerCompleteProfile";

export default function CompleteProfile() {
	const user = useSession();
	
	return (
		<div className="flex justify-center items-center h-screen flex-col">
			<h1 className="text-3xl font-bold py-5">Before you continue...</h1>
			<Paper sx={{width:3/4, height:'auto', display: "flex", justifyContent: "center", alignItems: "center", py: 5, flexDirection: "column"}}>
				<h1 className="text-xl font-bold">Complete your profile</h1>
				<div>
					{ user?.userType === 'STUDENT' ? <StudentCompleteProfile userId={user.id}/> : null }
					{ user?.userType === 'LECTURER' ? <LecturerCompleteProfile userId={user.id}/> : null }
				</div>
			</Paper>
		</div>
	)
}