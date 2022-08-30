import {Route, Routes} from 'react-router-dom';

import SignUpPage from './pages/SignUpPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import RecoverPasswordPage from './pages/PasswordLostPage.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';
import RecordPage from './pages/RecordPage';
import HelpPage from './pages/HelpPage';
import AboutUsPage from './pages/AboutUsPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path="/RecoverPassword" element={<RecoverPasswordPage/>} />
        <Route path="/LogIn" element={<LogInPage/>} />
        <Route path="/Home" element={<HomePage/>} />
        <Route path="/Analysis" element={<AnalysisPage/>}/>
        <Route path="/Record" element={<RecordPage/>}/>
        <Route path="/Help" element={<HelpPage/>} />
        <Route path="/AboutUs" element={<AboutUsPage/>}/>
        <Route path="/MyAccount" element={<AccountPage/>}/>
        <Route path="/Settings" element={<SettingsPage/>} />
      </Routes>
    </>
  );
}

export default App;
