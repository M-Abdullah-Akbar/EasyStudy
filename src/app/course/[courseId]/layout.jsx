import React from "react";
import DashboardHeader from "@/app/dashboard/_components/dashboardHeader";
import Image from "next/image";
function CourseViewLayout({ children }) {
  return (
    <div>
      <div className="flex justify-between items-center shadow-md ">
        <div className="flex gap-2 items-center justify-center h-16 p-5">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <h2 className="text-2xl font-bold">Easy Study</h2>
        </div>
        <DashboardHeader/>
      </div>
      <div className="mx-10 md:mx-36 lg:mx-60 mt-10">{children}</div>
    </div>
  );
}

export default CourseViewLayout;
