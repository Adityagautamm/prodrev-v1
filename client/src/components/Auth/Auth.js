import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import { signin, signup } from '../../actions/auth'


import { useSelector, useDispatch } from "react-redux";
import { getToken, getAuthStatus, getAuthError, signup, signin } from "./authSlice";
import { useEffect } from "react";
import Icon from './icon';

import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();


    const authStatus = useSelector(getAuthStatus);
    const error = useSelector(getAuthError);
    const token = useSelector(getToken);
    // useEffect(() => {
    //     if (postStatus === 'idle') {
    //         dispatch(fetchPosts())
    //     }
    // }, [postStatus, dispatch])

    //use below code to make suree all the data is present before one can send the post
    //    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        try {

            e.preventDefault();
            console.log('at handle submit auth component' + JSON.stringify(form))
            if (isSignup) {

                dispatch(signup({ form, history })).unwrap()

                // setting up from value back to emty
                setForm(initialState);


                //navigating to homepage
                history.push('/');

            } else {
                console.log('at sign in of Auth component')

                //passing the token


                dispatch(signin({ form })).unwrap();


                // setting up from value back to emty
                setForm(initialState);

                //navigating to homepage
                history.push('/');
            }

        } catch (error) {
            console.log('auth handle submit error: ' + error)
        }
    };

    const googleSuccess = async (res) => {
        // const result = res?.profileObj;
        // const token = res?.tokenId;

        // try {
        //     dispatch({ type: AUTH, data: { result, token } });

        //     history.push('/');
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;