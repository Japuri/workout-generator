import axios from 'axios'
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from '../constants/authConstants'

export const signup = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST })

    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      '/api/v1/auth/signup/',
      { username, email, password },
      config
    )

    dispatch({ type: SIGNUP_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNIN_REQUEST })

    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    const { data } = await axios.post(
      '/api/v1/auth/signin/',
      { email, password },
      config
    )

    dispatch({ type: SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: SIGNOUT })
}
