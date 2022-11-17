
import { combineReducers } from 'redux';


import auth from './auth';

export const reducers = combineReducers({ auth });

export const getAccessToken = (state) => state.auth.token;