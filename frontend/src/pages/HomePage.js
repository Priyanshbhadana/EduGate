import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import homeService from "../service/home";
import { setEntries } from "../slices/registerSlice";
import ProfileImage from "../components/ProfileImage";
import { FiPlusCircle } from "react-icons/fi";
import {
  FaDoorOpen,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
  FaDownload,
} from "react-icons/fa";
import ThemeToggleButton from "../components/ThemeToggleButton";

const HomePage = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.register.entries);
  const [dateValue, setDateValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const clickHandlerExitEntries = async () => {
    const res = await homeService.getOutStudents();
    dispatch(setEntries(res));
  };

  const clickHandlerAllEntries = async () => {
    const res = await homeService.getStudents();
    dispatch(setEntries(res));
  };

  const clickHandlerEntriesByDate = async () => {
    const res = await homeService.getEntriesByDate(dateValue);
    dispatch(setEntries(res));
  };

  const handleDownloadCSV = () => {
    const csvRows = [
      ["Name", "Roll No", "Department", "Hostel", "Contact", "Exit Date", "Entry Date"],
      ...entries.map((e) => [
        e.name,
        e.rollNo,
        e.department,
        e.hostel,
        e.contact,
        e.outDateAndTime ? new Date(e.outDateAndTime).toLocaleString() : "--",
        e.inDateAndTime ? new Date(e.inDateAndTime).toLocaleString() : "--",
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "entries.csv");
    document.body.appendChild(link);
    link.click();
  };

useEffect(() => {
  homeService.getStudents().then((res) => {
    console.log("📥 Students fetched:", res);  // ADD THIS
    if (Array.isArray(res)) {
      dispatch(setEntries(res));
    } else {
      console.error("❌ Failed to fetch students, got:", res);
      dispatch(setEntries([]));
    }
  }).catch(err => {
    console.error("❌ Error fetching students:", err);
  });
}, [dispatch]);

 

const filteredEntries = Array.isArray(entries) ? entries.filter((person) =>
  person.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  person.rollNo?.toLowerCase().includes(searchTerm.toLowerCase())
) : [];


  return (
    // <div className="min-h-screen w-full font-sans bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    //   <div className="absolute top-4 right-4 z-50">
    //     <ThemeToggleButton />
    //   </div>
<div className="min-h-screen w-full font-sans bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
  <div className="w-[95%] mx-auto px-4 py-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl md:text-2xl font-semibold text-blue-500">
        <span className="text-pink-500 font-bold">eRegister</span> System
      </h2>
      <ThemeToggleButton />
    </div>
      <div className="w-[95%] mx-auto px-4 py-6">
        <header className="flex flex-col md:flex-row items-center justify-between rounded-xl p-5 shadow-md bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <img
              src="/assets/iiita-logo.png"
              alt="IIITA Logo"
              height={80}
              width={80}
              className="rounded-full"
            />
            <h1 className="text-2xl md:text-3xl font-bold">
              Indian Institute of Information Technology, Allahabad
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-500">
              <span className="text-pink-500 font-bold">eRegister</span> System
            </h2>
            <p className="text-sm opacity-80">Student Entry-Exit Management</p>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={clickHandlerExitEntries} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md shadow">
              <FaDoorOpen /> Exit Entries
            </button>
            <button onClick={clickHandlerAllEntries} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md shadow">
              <FaUsers /> Show All Entries
            </button>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none"
              />
              <button onClick={clickHandlerEntriesByDate} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md shadow">
                <FaCalendarAlt /> Search By Date
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search Name or Roll No."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none"
              />
              <FaSearch />
            </div>
            <button onClick={handleDownloadCSV} className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow">
              <FaDownload /> Export CSV
            </button>
          </div>

          <Link to="/create-entry">
            <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-5 py-3 rounded-lg shadow text-sm font-semibold">
              <FiPlusCircle className="text-lg" /> Create Entry
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto mt-8 rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3">Avatar</th>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3 text-left">Roll No.</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Hostel</th>
                <th className="px-4 py-3 text-left">Contact No.</th>
                <th className="px-4 py-3 text-left">Exit Date & Time</th>
                <th className="px-4 py-3 text-left">Entry Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries?.map((person) => (
                <tr
                  key={person._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3">
                    <ProfileImage name={person.name} />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{person.name}</td>
                  <td className="px-4 py-3 text-sm">{person.rollNo}</td>
                  <td className="px-4 py-3 text-sm">{person.department}</td>
                  <td className="px-4 py-3 text-sm">{person.hostel}</td>
                  <td className="px-4 py-3 text-sm">{person.contact}</td>
                  <td className="px-4 py-3 text-sm">
                    {person.outDateAndTime
                      ? new Date(person.outDateAndTime).toLocaleString()
                      : "--"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {person.inDateAndTime
                      ? new Date(person.inDateAndTime).toLocaleString()
                      : "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
     </div>
  );
};

export default HomePage;

// import React, { useState } from "react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Calendar } from "../components/ui/calendar";
// import { CalendarIcon, DownloadIcon, PlusIcon } from "lucide-react";
// import { format } from "date-fns";

// export default function HomePage() {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [entries, setEntries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleDownloadCSV = () => {
//     const csvRows = [
//       [
//         "Name",
//         "Roll No",
//         "Department",
//         "Hostel",
//         "Contact",
//         "Exit Date",
//         "Entry Date",
//       ],
//       ...entries.map((e) => [
//         e.name,
//         e.rollNo,
//         e.department,
//         e.hostel,
//         e.contact,
//         e.exitDate,
//         e.entryDate,
//       ]),
//     ];

//     const csvContent = csvRows.map((row) => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "entry_exit_data.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 p-5">
//       {/* Header Section */}
//       <header className="flex flex-col items-center justify-center text-center gap-2 p-5 shadow-md bg-gray-100 dark:bg-gray-800 rounded-xl">
//         <img
//           src="/assets/iiita-logo.png"
//           alt="IIITA Logo"
//           height={90}
//           width={90}
//           className="rounded-full"
//         />
//         <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
//           Indian Institute of Information Technology, Allahabad
//         </h1>
//         <h2 className="text-xl md:text-2xl font-semibold text-blue-500">
//           <span className="text-pink-500 font-bold">eRegister</span> System
//         </h2>
//         <p className="text-sm opacity-80 dark:text-gray-300">
//           Student Entry-Exit Management
//         </p>
//       </header>

//       {/* Action Buttons */}
//       <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
//         <Button className="bg-purple-700 hover:bg-purple-800 text-white">
//           <CalendarIcon className="mr-2 h-4 w-4" /> Exit Entries
//         </Button>
//         <Button className="bg-green-600 hover:bg-green-700 text-white">
//           Show All Entries
//         </Button>
//         <Input
//           type="date"
//           className="w-auto"
//           value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
//           onChange={(e) => setSelectedDate(new Date(e.target.value))}
//         />
//         <Button className="bg-purple-500 hover:bg-purple-600 text-white">
//           <CalendarIcon className="mr-2 h-4 w-4" /> Search By Date
//         </Button>
//         <Input
//           type="text"
//           placeholder="Search Name or Roll No."
//           className="w-[200px]"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Button onClick={handleDownloadCSV} className="bg-blue-600 hover:bg-blue-700 text-white">
//           <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
//         </Button>
//         <Button className="bg-pink-600 hover:bg-pink-700 text-white">
//           <PlusIcon className="mr-2 h-4 w-4" /> Create Entry
//         </Button>
//       </div>

//       {/* Entry Table Placeholder */}
//       <div className="mt-6">
//         {/* Add your table code here */}
//         <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Roll No</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Department</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Hostel</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Contact</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Exit Date</th>
//                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Entry Date</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//               {entries.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-4 text-gray-500">
//                     No entries available.
//                   </td>
//                 </tr>
//               ) : (
//                 entries.map((entry, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.name}</td>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.rollNo}</td>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.department}</td>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.hostel}</td>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.contact}</td>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.exitDate}</td>
//                     <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{entry.entryDate}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
