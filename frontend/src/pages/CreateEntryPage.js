import React, { useEffect, useState } from "react";
import { FaBackward, FaUserPlus, FaUserCheck, FaQrcode, FaKeyboard, FaInfoCircle, FaClock, FaHistory } from "react-icons/fa";
import QRScanner from "../components/QRScanner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { useSelector, useDispatch } from "react-redux";
import { openScanner, closeScanner, setScannerResult } from "../slices/scannerSlice";
import registerService from "../service/register";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEntryPage = () => {
  const dispatch = useDispatch();
  const [rollNo, setRollNo] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const scannerResult = useSelector((state) => state.scanner.scannerResult);
  const isScannerOpen = useSelector((state) => state.scanner.isScannerOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scannerResult) setRollNo(scannerResult);
  }, [scannerResult]);

  const successToast = (msg) => toast.success(msg, { position: "top-right" });
  const warnToast = (msg) => toast.warn(msg, { position: "top-right" });

  const handleCreateOutEntry = async () => {
    const res = await registerService.createOutEntry(rollNo);
    const data = await res.json();
    res.status === 200 ? successToast(data.message) : warnToast(data.message);
    setRollNo("");
    dispatch(setScannerResult(""));
  };

  const handleCreateInEntry = async () => {
    const res = await registerService.createInEntry(rollNo);
    const data = await res.json();
    res.status === 200 ? successToast(data.message) : warnToast(data.message);
    setRollNo("");
    dispatch(setScannerResult(""));
  };

  const handleOpenScanner = () => {
    if (!isScannerOpen) {
      setRollNo("");
      dispatch(setScannerResult(""));
      dispatch(openScanner());
    }
  };

  const handleInputMode = () => {
    dispatch(closeScanner());
    dispatch(setScannerResult(""));
    setRollNo("");
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white w-full font-sans transition-colors duration-300">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative flex items-end py-4 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img className="h-full w-full object-cover object-top" src="/assets/Main-Gate.jpeg" alt="IIITA Main Gate" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative text-center mt-[400px] text-white px-4">
            <h3 className="text-4xl font-extrabold drop-shadow-xl">Student Entry-Exit System</h3>
            <p className="text-sm mt-2 opacity-80">Smart & Secure Entry Monitoring</p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-8 lg:py-24 bg-white dark:bg-gray-900 text-black dark:text-white">
          <div className="w-full max-w-md space-y-6">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
                <FaBackward /> Back to all Students' List
              </Link>
              <ThemeToggleButton />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-400">Create New Entry</h2>

            <div className="flex flex-wrap justify-between gap-3">
              <button
                onClick={handleOpenScanner}
                disabled={isScannerOpen}
                className={`flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md shadow ${isScannerOpen ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <FaQrcode /> Scan ID-Card
              </button>
              <button
                onClick={handleInputMode}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-md shadow"
              >
                <FaKeyboard /> Input Roll No.
              </button>
            </div>

            {/* Scanner always rendered when scanner is open */}
            {isScannerOpen && (
              <div className="mt-4">
                <QRScanner />
              </div>
            )}

            {/* Show scan result */}
            {scannerResult && (
              <div className="text-center text-green-800 font-medium p-3 bg-green-100 rounded-lg shadow mt-2">
                ✅ ID Scanned: Ready for Entry
                <button
                  onClick={() => dispatch(setScannerResult(""))}
                  className="text-sm text-blue-500 underline ml-2"
                >
                  🔄 Scan Again
                </button>
              </div>
            )}

            {!isScannerOpen && !scannerResult && (
              <input
                className="w-full mt-2 rounded-md border border-gray-600 bg-black px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-900"
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter Roll No"
              />
            )}

            <div className="flex flex-wrap justify-between gap-2">
              <button
                onClick={handleCreateOutEntry}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md shadow"
              >
                <FaUserPlus /> Create Out Entry
              </button>
              <button
                onClick={handleCreateInEntry}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md shadow"
              >
                <FaUserCheck /> Create In Entry
              </button>
            </div>

            <div className="text-sm text-gray-400 text-center mt-4 flex items-center justify-center gap-2">
              <FaInfoCircle /> Ensure the roll number is correct before submission.
            </div>
            <div className="text-center text-xs text-gray-500 mt-2 flex justify-center items-center gap-2">
              <FaClock /> Live Time: {currentTime}
            </div>

            <div className="text-center mt-4">
              <button className="text-sm text-indigo-300 hover:underline flex items-center gap-1 mx-auto">
                <FaHistory /> View Last 10 Entries (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEntryPage;
