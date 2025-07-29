import React from "react";

const color = {
  "A": "bg-red-500",
  "B": "bg-blue-500",
  "C": "bg-green-500",
  "D": "bg-yellow-500",
  "E": "bg-indigo-500",
  "F": "bg-purple-500",
  "G": "bg-pink-500",
  "H": "bg-red-600",
  "I": "bg-blue-600",
  "J": "bg-green-600",
  "K": "bg-yellow-600",
  "L": "bg-indigo-600",
  "M": "bg-purple-600",
  "N": "bg-pink-600",
  "O": "bg-red-700",
  "P": "bg-blue-700",
  "Q": "bg-green-700",
  "R": "bg-yellow-700",
  "S": "bg-indigo-700",
  "T": "bg-purple-700",
  "U": "bg-pink-700",
  "V": "bg-red-800",
  "W": "bg-blue-800",
  "X": "bg-green-800",
  "Y": "bg-yellow-800",
  "Z": "bg-indigo-800",
};

const ProfileImage = ({ name }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <span className={`flex justify-center items-center p-2 ${color[firstNameInitial]} text-white text-30 font-bold rounded-full`}>
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};
export default ProfileImage;