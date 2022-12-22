import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    message: "",
    access_token: ""
};

export const sendLoginRequest = createAsyncThunk(
    "user/login",
    async (payload) => {
        const response = axios.post("https://erp-backend-2020.herokuapp.com/api/v1/users/login",
            payload,

            
            // {headers: {
            //     "Content-Type": "application/json",
            //     "api-access-key": "uhiu",
            //     "Access-Control-Allow-Origin": "*",
            //     locale: "en"
            // }}
            );
            return await response.json();
        
    }
)

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sendLoginRequest.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendLoginRequest.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.message = payload.message;
            state.access_token = payload.access_token;
        })
        .addCase(sendLoginRequest.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.message = payload.message;
            state.access_token = payload.access_token;
        })
    }
})

export const { isLoginPending, isLoginSuccess, isLoginFailed} = 
loginSlice.actions;

export default loginSlice.reducer