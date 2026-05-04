import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Feed from './pages/Feed';
import Register from './pages/Register';

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route 
         path='/feed'
         element={
           <ProtectedRoute>
             <Feed />
           </ProtectedRoute>
         } />
         
      </Routes>
    </Router>
  )
}

export default App;