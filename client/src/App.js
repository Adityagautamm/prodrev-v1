import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Switch>
                    <Route path="/auth" exact component={Auth} />\
                    <Route path="/" exact component={Home} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
//<Route path="/" exact component={() => <Redirect to="/posts" />} />
//                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />