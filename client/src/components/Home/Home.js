import React from 'react';
import Form from '../AddNewPost/Form';
import { TextField, Button, Typography, Paper, Grid, Container } from '@material-ui/core';

const Home = () => {
    return (

        <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <h1>This is Home, posts will be added here</h1>            </Grid>
                <Grid item xs={12} sm={4}>
                    <Form />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home
