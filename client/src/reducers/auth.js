import * as actionType from '../constants/actionTypes';

const authReducer = (state = { token: null, role: null, name: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            //  localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, token: action.data.token, role: action.data.role, name: action.data.name, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;