import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { signin } from '../actions/authActions'
import FormComponent from '../components/FormComponent'
import Message from '../components/Message'
import Loader from '../components/Loader'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) navigate('/')
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign In</h2>
        {error && <Message variant='error'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <FormComponent
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
          />
          <FormComponent
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
          />
          <button type='submit' style={styles.btn}>
            Sign In
          </button>
        </form>
        <p style={styles.link}>
          New user? <Link to='/signup'>Register</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#202123',
  },
  card: {
    background: '#343541',
    padding: '2rem',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    color: '#ececec',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    padding: '0.7rem',
    background: '#10a37f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  link: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#aaa',
  },
}

export default LoginScreen
