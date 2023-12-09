import Image from "next/image";
import logo from "public/assets/images/logo.png";
import paperHolding from "public/assets/images/paperHolding.png";
import student from "public/assets/images/student.svg";
import lecturer from "public/assets/images/lecturer.svg";
import admin from "public/assets/images/admin.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold py-5">Sign In</h1>
      <div className="bg-white h-3/4 w-3/4 shadow-lg grid grid-cols-2 divide-x-2">
        <div className="flex justify-center items-center flex-col p-2">
          <div className="flex justify-center items-center">
            <Image src={logo} alt="logo" height={80} width={80} />
            <h1 className="text-2xl px-3">Review N Go</h1>
          </div>
          <div className="w-1/2">
            <p className="text-center text-[#64748B] text-base py-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
          </div>
          <Image src={paperHolding} alt="paper holding guy" />
        </div>
        <div className="grid grid-rows-4">
          <div className="row-span-3 flex justify-center p-10 flex-col">
            <h1 className="pb-10 font-medium text-3xl">Are you a...</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex justify-center items-center flex-col">
                <Link href="/login/student">
                  <div className="bg-[#EFF4FB] shadow-md p-5 cursor-pointer">
                    <Image src={student} alt="student" />
                  </div>
                </Link>
                <h2 className="font-medium pt-3">Student</h2>
              </div>
              <div className="flex justify-center items-center flex-col">
                <Link href="/login/lecturer">
                  <div className="bg-[#EFF4FB] shadow-md p-5 cursor-pointer">
                    <Image src={lecturer} alt="lecturer" />
                  </div>
                </Link>
                <h2 className="font-medium pt-3">Lecturer</h2>
              </div>
              <div className="flex justify-center items-center flex-col">
                <Link href="/login/admin">
                  <div className="bg-[#EFF4FB] shadow-md p-5 cursor-pointer">
                    <Image src={admin} alt="admin" />
                  </div>
                </Link>
                <h2 className="font-medium pt-3">Admin</h2>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-row">
            <h1>Don't have an account?</h1>
            <Link href="/signUp">
              <h1 className="text-sky-500 pl-2 cursor-pointer">Sign Up</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
