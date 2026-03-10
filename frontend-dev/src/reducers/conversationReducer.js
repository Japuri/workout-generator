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

export const conversationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true }

    case CONVERSATION_CREATE_SUCCESS:
      return { loading: false, success: true, conversation: action.payload }

    case CONVERSATION_CREATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const conversationsListReducer = (state = { conversations: [] }, action) => {
  switch (action.type) {
    case CONVERSATIONS_LIST_REQUEST:
      return { loading: true, conversations: [] }

    case CONVERSATIONS_LIST_SUCCESS:
      return { loading: false, conversations: action.payload }

    case CONVERSATIONS_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const conversationDetailReducer = (state = { conversation: {} }, action) => {
  switch (action.type) {
    case CONVERSATION_DETAIL_REQUEST:
      return { loading: true, conversation: {} }

    case CONVERSATION_DETAIL_SUCCESS:
    case CONVERSATION_CREATE_SUCCESS:
      return { loading: false, conversation: action.payload }

    case CONVERSATION_DETAIL_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
