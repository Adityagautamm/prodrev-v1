
import * as api from '../../api/index.js';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";


const POSTS_URL = 'http://localhost:5000';

const initialState = {
    token: 'token',
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const signup = createAsyncThunk('/user/signin', async (formData) => {
    // const response = await axios.get(POSTS_URL)
    const { form } = formData
    console.log('formData:' + JSON.stringify(formData))
    console.log('form:' + JSON.stringify(form))
    const response = await api.signUp(form)

    return response.data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                console.log('inside builder');
                // state.posts.push(action.payload)
                state.token = JSON.stringify(action.payload.token);
                console.log('token at Auth component: ' + state.token)
            })
    }
});

export const getToken = (state) => state.auth.token;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;
export const { increment, decrement } = authSlice.actions;

export default authSlice.reducer;