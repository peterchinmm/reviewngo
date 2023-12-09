'use client'

import StudentDashboard from '@/components/student/StudentDashboard';
import LecturerDashboard from '@/components/lecturer/LecturerDashboard';
import useSession from '@/lib/useSession';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useSession();
  const router = useRouter();

  const Redirect = () => {
    if(user?.profileCompleted !== undefined) {
      if (!(user?.profileCompleted)) {
        router.push(`/completeProfile`)
      }
    }
  }

  useEffect(() => {
    Redirect();
  }, [user]);

  return (
    user?.userType === 'STUDENT' ? <StudentDashboard/> : <LecturerDashboard />
  );
}
