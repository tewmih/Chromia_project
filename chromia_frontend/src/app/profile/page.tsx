"use client";

import { useTAppStore } from "@/store/stateStore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// interface accountProp{
//   id:ArrayBuffer,
//   type:string
// }
// interface userProp {
//   id: ArrayBuffer;
//   name: string;
//   account: accountProp;
//   // [key: string]: any; // Add index signature
// }
function ProfilePage() {
  const { session, newTaskCheck } = useTAppStore();
  const [user, setUser] = useState<{
    name: string;
    id: ArrayBuffer;
    account: ArrayBuffer;
  } | null>(null);

  

  useEffect(() => {
    if (!session) return;
  
    const fetchUserData = async () => {
      try {
        const user = await session.query("get_specific_user", {
          account_id: session.account.id,
        });
        alert(`User ${user?.toString()}`)
  
        // Check if user.id and user.account.id exist and are valid
        const userId = user?.id ? Buffer.from(user.id).toString("hex") : "N/A";
        const accountId = user?.account?.id ? Buffer.from(user.account.id).toString("hex") : "N/A";
  
        setUser({
          name: user?.name || "Anonymous User",
          id: userId,
          account: accountId,
          profilePicture: undefined, // or any default value if needed
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [session]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <h1 className="text-3xl font-bold mb-4">You are not logged in!</h1>
        <Link
          href="/"
          className="px-6 py-2 bg-white text-purple-600 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
          Profile Page
        </h1>

        {user ? (
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
              <Image
                src={user.profilePicture || "/default-profile.png"}
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-purple-800">
                {user.name || "Anonymous User"}
              </h2>
              <p className="text-gray-600 mt-2">
                Account: {user.account || "No account provided"}
              </p>
              <p className="text-gray-600">User ID: {user.id || "N/A"}</p>

              {/* New Task Notification */}
              {newTaskCheck && (
                <div className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg inline-block">
                  <p>New Task Available!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-purple-600 text-lg">Loading user data...</p>
          </div>
        )}

        {/* Additional Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
            onClick={() => console.log("Edit Profile Clicked")}
          >
            Edit Profile
          </button>
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            onClick={() => console.log("View Tasks Clicked")}
          >
            View Tasks
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
