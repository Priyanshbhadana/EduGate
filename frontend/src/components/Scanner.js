import React, { useEffect } from 'react';
import Quagga from 'quagga';
import { useDispatch } from 'react-redux';
import { setScannerResult, closeScanner } from '../slices/scannerSlice';

const BarcodeScanner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#barcode-scanner'),
        constraints: {
          width: 600,
          height: 450,
        },
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader'], // ✅ Common barcode types
      },
      locate: true, // ✅ Helps detect barcodes even if slightly blurry
      numOfWorkers: 2,
      frequency: 10
    }, (err) => {
      if (err) {
        console.error("Scanner error:", err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      if (data?.codeResult?.code) {
        console.log('✅ Barcode detected:', data.codeResult.code);
        alert(`Scanned: ${data.codeResult.code}`);
        dispatch(setScannerResult(data.codeResult.code));
        dispatch(closeScanner());
        Quagga.stop();
      }
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div id="barcode-scanner" className="h-[200px] w-[270px] m-4 p-2 border-2 border-green-500">
      {/* Video stream will appear here */}
    </div>
  );
};

export default BarcodeScanner;
