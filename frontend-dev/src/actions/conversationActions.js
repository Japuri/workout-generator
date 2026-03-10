import axios from 'axios'
import {
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_CREATE_FAIL,
  CONVERSATIONS_LIST_REQUEST,
  CONVERSATIONS_LIST_SUCCESS,
  CONVERSATIONS_LIST_FAIL,
  CONVERSATION_DETAIL_REQUEST,
  CONVERSATION_DETAIL_SUCCESS,
  CONVERSATION_DETAIL_FAIL,
} from '../constants/conversationConstants'

const getAuthHeader = (getState) => {
  const { userInfo } = getState().auth
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.access}`,
    },
  }
}

export const createMessage = (message, conversationId = null) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONVERSATION_CREATE_REQUEST })

    const { data } = await axios.post(
      '/api/v1/conversation/',
      { message, conversation_id: conversationId },
      getAuthHeader(getState)
    )

    dispatch({ type: CONVERSATION_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONVERSATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const listConversations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONVERSATIONS_LIST_REQUEST })

    const { data } = await axios.get(
      '/api/v1/conversations/',
      getAuthHeader(getState)
    )

    dispatch({ type: CONVERSATIONS_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONVERSATIONS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const getConversationDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONVERSATION_DETAIL_REQUEST })

    const { data } = await axios.get(
      `/api/v1/conversations/${id}/`,
      getAuthHeader(getState)
    )

    dispatch({ type: CONVERSATION_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CONVERSATION_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
