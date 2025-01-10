import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
