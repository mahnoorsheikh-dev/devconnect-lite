import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import Developers from './pages/Developers';
import DeveloperProfile from './pages/DeveloperProfile';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Login />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.DEVELOPERS} element={<Developers />} />
        <Route path={ROUTES.DEVELOPER_DETAIL} element={<DeveloperProfile />} />
        <Route path={ROUTES.PROJECTS} element={<Projects />} />
        <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetail />} />
        <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route
          path={ROUTES.FEED}
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.POST_DETAIL} element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;