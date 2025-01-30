"use client";

import { useTAppStore } from "@/store/stateStore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/utility/Progress_spinner";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { Modal } from "@/components/ui/Modal";
import { toast } from "react-toastify";

// Define the user DTO interface
export interface IUserDto {
  name: string;
  id: Buffer; // Buffer for byte_array
  account: {
    id: Buffer; // Buffer for byte_array
    type: string;
  };
}

// Define the frontend user interface
export interface IUser {
  id: string; // Hex string
  name: string;
  account: {
    id: string; // Hex string
    type: string;
  };
}

function ProfilePage() {
  const { session } = useTAppStore();
  const [user, setUser] = useState<IUser | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter(); // Use the new next/navigation router

  // Redirect if there's no session
  useEffect(() => {
    if (!session) {
      router.push("/"); // Redirect to the home page
    }
  }, [session, router]);

  // Fetch user data
  useEffect(() => {
    if (!session) return;

    const fetchUserData = async () => {
      try {
        // Fetch user data from the backend
        const userDto: IUserDto = await session.query("get_specific_user", {
          user_id: session.account.id,
        });

        // Convert Buffer to hex string for id and account.id
        const userId = userDto?.id
          ? Buffer.from(userDto.id).toString("hex")
          : "N/A";
        const accountId = userDto?.account?.id
          ? Buffer.from(userDto.account.id).toString("hex")
          : "N/A";

        // Set the user state with the converted data
        setUser({
          name: userDto?.name || "Anonymous User",
          id: userId,
          account: {
            id: accountId,
            type: userDto?.account?.type || "N/A",
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session]);

  // Show a spinner while redirecting or loading
  if (!session) {
    return <Spinner message="Redirecting..." />;
  }

  // Handle saving the new name
  const handleSave = async () => {
    if (!session) return;
    try {
      // Call the backend to update the name
      await session.call({
        name: "update_user_name",
        args: [newName],
      });

      // Update the user state with the new name
      setUser((prevUser) => ({
        ...prevUser!,
        name: newName,
      }));

      toast.success("Name updated successfully");
      setOpenModal(false);
      setNewName(""); // Clear the input field
    } catch (error) {
      toast.error("Error updating name: " + error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105 hover:shadow-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Your profile
        </h1>

        {user ? (
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg transform transition-transform hover:scale-110">
              <Image
                src={profilePicture || "/profile.png"}
                alt="Profile Picture"
                fill
                className="object-cover"
                priority // Ensure the image is loaded quickly
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {user.name || "Anonymous User"}
              </h2>
              <p className="text-gray-600 text-lg mb-1">
                <span className="font-medium text-green-500">
                  Account Type:
                </span>{" "}
                {user.account.type || "No account provided"}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-medium text-green-500">User ID:</span>{" "}
                {user.id || "N/A"}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-medium text-green-500">Account ID:</span>{" "}
                {user.account.id || "N/A"}
              </p>

              {/* Additional Info Section */}
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Joined:</span> January 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-purple-600 text-lg">Loading user data...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
            onClick={() => {
              setOpenModal(true);
              setNewName(user?.name || ""); // Pre-populate the input with the current name
            }}
          >
            Edit Profile
          </button>
          <Modal modalOpen={openModal} setModalOpen={setOpenModal}>
            <h2 className="border-l-red-100 h-8">Edit your Name</h2>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              placeholder="Name"
              className="mt-8 p-2"
            />
            <div className="mt-10">
              <button
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 mr-5"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="mt-4 px-6 py-2 ml-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
                onClick={handleSave} // Call handleSave directly
              >
                Save
              </button>
            </div>
          </Modal>
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
            onClick={() => router.push("/home")} // Use router.push for navigation
          >
            back to Your Tasks
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center text-gray-500">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
