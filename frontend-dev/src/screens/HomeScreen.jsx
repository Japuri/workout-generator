import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { listConversations, createMessage, getConversationDetail } from '../actions/conversationActions'
import { CONVERSATION_CREATE_RESET } from '../constants/conversationConstants'
import { CONVERSATION_DETAIL_SUCCESS } from '../constants/conversationConstants'
import { signout } from '../actions/authActions'
import ConversationItem from '../components/ConversationItem'
import EmptyState from '../components/EmptyState'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { userInfo } = useSelector((state) => state.auth)
  const { conversations } = useSelector((state) => state.conversationsList)
  const { loading: createLoading, error: createError, conversation: created } = useSelector((state) => state.conversationCreate)
  const { loading: detailLoading, conversation: activeConversation } = useSelector((state) => state.conversationDetail)

  useEffect(() => {
    dispatch(listConversations())
  }, [dispatch, created])

  useEffect(() => {
    if (id) dispatch(getConversationDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    if (created && !id) {
      navigate(`/conversation/${created.id}`)
    }
  }, [created, navigate, id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    dispatch(createMessage(input, id || null))
    setInput('')
  }

  const messages = activeConversation?.messages || []

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <button style={styles.newChatBtn} onClick={() => {
          dispatch({ type: CONVERSATION_CREATE_RESET })
          dispatch({ type: 'CONVERSATION_DETAIL_REQUEST' })
          navigate('/')
        }}>
          + New Chat
        </button>
        <div style={styles.convList}>
          {conversations && conversations.map((conv) => (
            <ConversationItem key={conv.id} conversation={conv} />
          ))}
        </div>
        <div style={styles.sidebarFooter}>
          <span style={{ color: '#ececec', fontSize: '0.85rem' }}>{userInfo?.username}</span>
          <button style={styles.logoutBtn} onClick={() => dispatch(signout())}>
            Logout
          </button>
        </div>
      </div>

      {/* Main chat */}
      <div style={styles.main}>
        <div style={styles.messages}>
          {!id ? (
            <EmptyState />
          ) : detailLoading ? (
            <Loader />
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.bubble,
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#10a37f' : '#444654',
                }}
              >
                <strong style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.3rem', opacity: 0.7 }}>
                  {msg.role === 'user' ? 'You' : 'AI'}
                </strong>
                {msg.content}
              </div>
            ))
          )}
          {createLoading && <Loader />}
          {createError && <Message variant='error'>{createError}</Message>}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form style={styles.inputArea} onSubmit={sendMessage}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Send a message...'
          />
          <button type='submit' style={styles.sendBtn} disabled={createLoading}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  layout: {
    display: 'flex',
    height: '100vh',
    background: '#202123',
    color: '#ececec',
    fontFamily: 'sans-serif',
  },
  sidebar: {
    width: '260px',
    background: '#202123',
    borderRight: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.75rem',
  },
  newChatBtn: {
    background: 'transparent',
    border: '1px solid #555',
    color: '#ececec',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '1rem',
    textAlign: 'left',
    fontSize: '0.9rem',
  },
  convList: {
    flex: 1,
    overflowY: 'auto',
  },
  sidebarFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #333',
    paddingTop: '0.75rem',
    marginTop: '0.5rem',
  },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  bubble: {
    maxWidth: '70%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    color: '#fff',
    lineHeight: 1.5,
    wordBreak: 'break-word',
  },
  inputArea: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    borderTop: '1px solid #333',
    background: '#202123',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #555',
    background: '#343541',
    color: '#ececec',
    fontSize: '0.95rem',
    outline: 'none',
  },
  sendBtn: {
    padding: '0.75rem 1.5rem',
    background: '#10a37f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
}

export default HomeScreen
