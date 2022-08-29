import {Route, Routes} from 'react-router-dom';

import SignUpPage from './pages/SignUpPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


function App() {

  return (
    <>

      <Routes>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path="/LogIn" element={<LogInPage/>} />
        <Route path="/Home" element={<HomePage/>} />
      </Routes>

      

    </>
  );
}

export default App;
