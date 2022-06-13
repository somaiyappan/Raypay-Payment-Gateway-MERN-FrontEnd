import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        Name: "",
        PhoneNo: "",
        Email: "",
        Plan:"",
    },
    reducers: {
        setUser: (state, action) => {
            state.Name = action.payload?.Name;
            state.PhoneNo = action.payload?.PhoneNo;
            state.Email = action.payload?.Email;
           
            state.Plan = action.payload?.Plan;
        }
    }
});

export const { setUser } = userSlice.actions;
export const updateState = (state) => state?.user;

export default userSlice.reducer;
