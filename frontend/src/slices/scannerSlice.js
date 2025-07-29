// scannerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isScannerOpen: false,
  scannerResult: ""
};

const scannerSlice = createSlice({
  name: "scanner",
  initialState,
  reducers: {
    openScanner: (state) => {
      state.isScannerOpen = true;
    },
    closeScanner: (state) => {
      state.isScannerOpen = false;
      state.scannerResult = ""; // Reset scanner result when closing
    },
    setScannerResult: (state, action) => {
      state.scannerResult = action.payload;
    }
  }
});

export const { openScanner, closeScanner, setScannerResult } = scannerSlice.actions;
export default scannerSlice.reducer;
