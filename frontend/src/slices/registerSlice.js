import { createSlice } from "@reduxjs/toolkit";

const initialState={
    entries: [],
}

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers:{
        setEntries: (state, action) => {
            state.entries = action.payload
        }
    }
})

export const {setEntries} = registerSlice.actions
export default registerSlice.reducer