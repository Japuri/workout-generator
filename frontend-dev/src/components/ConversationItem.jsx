import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ConversationItem({ conversation }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isActive = id === String(conversation.id)

  return (
    <div
      onClick={() => navigate(`/conversation/${conversation.id}`)}
      style={{
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        background: isActive ? '#343541' : 'transparent',
        color: '#ececec',
        marginBottom: '0.25rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {conversation.title || 'New Conversation'}
    </div>
  )
}

export default ConversationItem
