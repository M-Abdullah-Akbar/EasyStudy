"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import { db } from "@/db";
import { useUser } from "@clerk/nextjs";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

function Upgrade() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    user && getUserDetails();
  }, [user]);
  const getUserDetails = async () => {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetails(result[0]);
  };

  const onPaymentManage = async () => {
    const result = await axios.post('/api/payment/manage-payment', {
      customerId: userDetails?.customerId
    });
    console.log(result.data);

    if (result.data) {
      window.open(result.data?.url);
    }
  }
  const onCheckoutClick = async () => {
    const result = await axios.post('/api/payment/checkout', {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
      email: user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data);
    window.open(result.data?.url);
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Plans
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">
              $0<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>5 AI-generated lessons</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Limited features</span>
              </li>
            </ul>
            <Button className="w-full cursor-pointer" variant="outline">
              Current Plan
            </Button>
          </div>
          <div className="p-6 rounded-xl border bg-blue-50 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Monthly</h3>
            <p className="text-3xl font-bold mb-4">
              $10<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Unlimited Course Generation</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Unlimited Flashcard, Quizes</span>
              </li>
            </ul>
            {userDetails?.isMember == false ?<Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={onCheckoutClick}>
              Get Started
            </Button>: <Button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={onPaymentManage}>
              Manage Payment
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
