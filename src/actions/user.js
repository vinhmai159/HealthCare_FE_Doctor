export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        localStorage.removeItem('accessToken');
        dispatch(receiveLogout());
    };
}

export function loginUser(accessToken) {
    return (dispatch) => {

        dispatch(receiveLogin());
        
        if (accessToken !== null && accessToken !== undefined && accessToken !== '') {
            localStorage.setItem('authenticated', true)
            localStorage.setItem('accessToken', accessToken)
        } else {
            dispatch(loginError('Email or password invalid. Try again'));
        }
    }
}
