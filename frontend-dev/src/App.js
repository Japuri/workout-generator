import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/RegisterScreen'

function App() {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>
        <Route path='/login' element={!userInfo ? <LoginScreen /> : <Navigate to='/' />} />
        <Route path='/signup' element={!userInfo ? <SignupScreen /> : <Navigate to='/' />} />
        <Route path='/' element={userInfo ? <HomeScreen /> : <Navigate to='/login' />} />
        <Route path='/conversation/:id' element={userInfo ? <HomeScreen /> : <Navigate to='/login' />} />
      </Routes>
    </Router>
  )
}

export default App
