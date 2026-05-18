import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import ProtectedRoute from './components/ProtectedRoute';


function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={ <Feed /> } />
        <Route path='/posts/:id' element={ <PostDetails /> } />
         
      </Routes>
    </Router>
  )
}

export default App;