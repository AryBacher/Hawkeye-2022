import {Route, Routes} from 'react-router-dom';

import WelcomePage from './pages/WelcomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';


function App() {

  return (
    <>

      <Routes>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/WelcomePage" element={<WelcomePage/>} />
        <Route path="/" element={<SignUpPage/>} />
        <Route path="/LogIn" element={<LogInPage/>} />
        <Route path="/Home" element={<HomePage/>} />
      </Routes>

      

    </>
  );
}

export default App;
