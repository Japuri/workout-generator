import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from '../constants/authConstants'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = { userInfo: userInfoFromStorage }

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case SIGNIN_REQUEST:
      return { loading: true, userInfo: null }

    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }

    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
      return { loading: false, error: action.payload }

    case SIGNOUT:
      return { userInfo: null }

    default:
      return state
  }
}
