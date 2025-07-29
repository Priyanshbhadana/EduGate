import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { setScannerResult, closeScanner } from "../slices/scannerSlice";

const QRScanner = () => {
  const qrCodeRegionId = "html5qr-code-full-region";
  const html5QrCodeRef = useRef(null);
  const dispatch = useDispatch();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const config = { fps: 10, qrbox: 250 };

  useEffect(() => {
    // Remove the region div if it exists, then recreate it
    let region = document.getElementById(qrCodeRegionId);
    if (region) {
      region.parentNode.removeChild(region);
    }
    const parent = document.getElementById("qr-parent-region");
    if (parent) {
      const newDiv = document.createElement("div");
      newDiv.id = qrCodeRegionId;
      newDiv.style.width = "100%";
      newDiv.style.maxWidth = "400px";
      newDiv.style.margin = "auto";
      newDiv.style.borderRadius = "12px";
      newDiv.style.overflow = "hidden";
      parent.appendChild(newDiv);
    }

    const initScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        html5QrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: isMobile ? { exact: "environment" } : "user" },
          config,
          (decodedText) => {
            dispatch(setScannerResult(decodedText));
            dispatch(closeScanner());
            if (html5QrCodeRef.current) {
              const stopResult = html5QrCode.stop();
              if (stopResult && typeof stopResult.then === 'function') {
                stopResult.then(() => html5QrCode.clear()).catch(() => {});
              }
            }
          }
        );
      } catch (err) {
        console.error("Scanner start error:", err);
      }
    };

    initScanner();

    return () => {
      const scanner = html5QrCodeRef.current;
      if (scanner) {
        let stopResult;
        try {
          stopResult = scanner.stop();
        } catch {}
        const stopAndClear = () => {
          // Extra: stop all video tracks if any remain
          const region = document.getElementById(qrCodeRegionId);
          if (region) {
            const video = region.querySelector("video");
            if (video && video.srcObject) {
              video.srcObject.getTracks().forEach(track => track.stop());
            }
          }
          // Now safe to call clear
          try {
            scanner.clear();
          } catch {}
        };
        if (stopResult && typeof stopResult.then === "function") {
          stopResult.then(stopAndClear).catch(stopAndClear);
        } else {
          stopAndClear();
        }
      }
      // Remove the region div from DOM
      const region = document.getElementById(qrCodeRegionId);
      if (region && region.parentNode) {
        region.parentNode.removeChild(region);
      }
    };
  }, []);

  return (
    <div>
      <div id="qr-parent-region">
        {/* The scanner region will be created here */}
      </div>
      <p className="text-sm text-center mt-2 text-gray-400 dark:text-gray-300">
        📸 Hold your ID steady with QR facing the camera <br />
        💡 Use bright light & avoid reflections <br />
        📱 For better performance, try scanning on mobile
      </p>
    </div>
  );
};

export default QRScanner;
