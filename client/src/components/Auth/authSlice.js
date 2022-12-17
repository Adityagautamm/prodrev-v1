
import { signUp, signIn } from "../../api/index.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const POSTS_URL = 'http://localhost:5000';

const initialState = {
    token: 'token',
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const signup = createAsyncThunk('/user/signup', async (formData) => {
    try {
        // const response = await axios.get(POSTS_URL)
        const { form } = formData
        const { history } = formData

        console.log('formData:' + JSON.stringify(formData))
        console.log('form:' + JSON.stringify(form))
        const response = await signUp(form)
        // sending history object to use once all set and done to move to next page
        response.data.history = history;

        return response.data
    }
    catch (error) {
        console.log('error:' + error);
    }

})

export const signin = createAsyncThunk('/user/signin', async (formData) => {
    try {
        const { form } = formData
        const { history } = formData
        console.log('form:' + JSON.stringify(form))
        const response = await signIn(form)
        // sending history object to use once all set and done to move to next page
        response.data.history = history;
        console.log('response data:' + JSON.stringify(response.data))
        return response.data
    }
    catch (error) {
        console.log('error:' + error);
    }

})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        replaceAccessToken: (state, action) => {
            console('action' + action)
            state.token = action.payload.token;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                console.log('inside builder, signin action:' + JSON.stringify(action));
                // state.posts.push(action.payload)
                state.token = JSON.stringify(action.payload.accessToken);
                console.log('token at Auth component: ' + state.accessToken)


            })

            .addCase(signin.fulfilled, (state, action) => {
                console.log('inside builder signin, old state:' + JSON.stringify(state));
                // state.posts.push(action.payload)
                state.token = JSON.stringify(action.payload.accessToken);
                // console.log('token at Auth component: ' + state.accessToken)
                //JSON.stringify(action.payload.history).push('/')
                console.log('inside builder signin,  new state:' + JSON.stringify(state.token));
            })
    }
});

export const getToken = (state) => state.auth.token;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;
export const { increment, replaceAccessToken } = authSlice.actions;

export default authSlice.reducer;