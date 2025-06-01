"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Link, Link2, Shield, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { CourseCountContext } from "@/app/_context/courseCountContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];
  const {totalCourse, setTotalCourse} = useContext(CourseCountContext);
  const path = usePathname();
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  const getUserDetails = async () => {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetails(result[0]);
    setTotalCourse(result[0]?.totalCourses || 0);
  };

  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center justify-center h-16">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h2 className="text-2xl font-bold">Easy Study</h2>
      </div>
      <div className="mt-10">
        <a href={"/create"} className="w-full cursor-pointer">
          <Button className={"w-full cursor-pointer"}>+ Create New</Button>
        </a>
        <div className="mt-5 flex flex-col gap-2">
          {menuList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`flex gap-2 items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer ${
                  path == item.path && "bg-gray-200"
                }`}
              >
                <Icon size={20} />
                <a href={`${item.path}`} ><span>{item.name}</span></a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-10 border bg-slate-100 rounded-l p-3 w-[85%]">
        {userDetails?.isMember ? (
          <>
            <h2 className="text-lg">Premium Plan</h2>
            <h2 className="text-sm text-gray-500 mt-1">Unlimited Course Creation</h2>
          </>
        ) : (
          <>
            <h2 className="text-lg">Available Credits: {5-totalCourse}</h2>
            <Progress value={(totalCourse/5)*100} className="mt-2" />
            <h2 className="text-sm text-gray-500 mt-1">{totalCourse} out of 5 Credits used</h2>
            <a href="/dashboard/upgrade" className="text-blue-500 text-sm mt-2">
              Upgrade to Premium
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
