// "use client";

// import React, { useEffect, useState } from "react";
// import { useTAppStore } from "@/store/stateStore";
// import Image from "next/image";
// import Link from "next/link";

// function ProfilePage() {
//   const { session } = useTAppStore();
//   const [name, setName] = useState("");
//   const [userId, setUserId] = useState("");
//   const [account, setAccount] = useState("");

//   if (!session) {
//     return (
//       <div className="flex flex-col items-center justify-center w-full h-full text-red-600">
//         <h1 className="text-2xl font-bold">You are not logged in!</h1>
//         <Link href="/" className="text-blue-500 underline mt-4">
//           Go to Home
//         </Link>
//       </div>
//     );
//   }

//   useEffect(() => {
//     async function fetchData() {
//       if (!session) return;
//       const user = await session.query("get_specific_user", {
//         user_id: session.account.id,
//       });
//       setName(user.name);
//       setAccount(user.account);
//       setUserId(user.id);
//     }
//     fetchData();
//   }, [session]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full text-green-950">
//       <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
//       <div className="flex flex-col items-center space-y-4 bg-gray-100 p-6 rounded-lg shadow-lg">
//         {/* Profile Picture */}
//         <Image
//           src={session.account?."/file.svg" || "/default-profile.png"}
//           alt="User Profile Picture"
//           width={120}
//           height={120}
//           className="rounded-full border-2 border-green-950 shadow-lg"
//         />

//         {/* User Info */}
//         <div className="text-center">
//           <h2 className="text-xl font-semibold">{name || "Anonymous User"}</h2>
//           <p className="text-gray-600">{account || "No account provided"}</p>
//           <p className="text-gray-600">User ID: {userId || "N/A"}</p>
//         </div>

//         {/* Additional Actions */}
//         {/* <button
//           className="bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-transform transform hover:scale-105"
//           onClick={() => console.log("Edit Profile Clicked")}
//         >
//           Edit Profile
//         </button> */}
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;


"use client";

import { useTAppStore } from "@/store/stateStore";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const { session, newTaskCheck } = useTAppStore();
  const [user, setUser] = useState(null); // Initialize as null for better conditional rendering

  useEffect(() => {
    if (!session) return;

    const get_user = async () => {
      try {
        const user = await session.query("get_specific_user", {
          user_id: session.account.id,
        });
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    get_user(); // Invoke the function
  }, [session]);

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
          <h3>User Name: {user.name || "N/A"}</h3>
          <h3>User ID: {user.id || "N/A"}</h3>
          <h3>Account: {user.account || "N/A"}</h3>
          {newTaskCheck && <p>New Task Available!</p>}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;
