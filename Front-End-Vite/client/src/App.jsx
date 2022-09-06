import './App.css'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RecoverPasswordPage from './pages/PasswordLostPage.jsx'
import AnalysisPage from './pages/AnalysisPage.jsx'
import RecordPage from './pages/RecordPage'
import HelpPage from './pages/HelpPage'
import AccountPage from './pages/AccountPage.jsx'
import {Route, Routes} from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material"

function App() {

  const HawkeyeTheme = createTheme({
    palette:{
      primary:{
        main: '#4ECB71'
      },
      secondary:{
        main: '#151F27'
      }
    },
    typography:{
      fontFamily: 'Poppins',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
  });

  return (
    <>
      <ThemeProvider theme={HawkeyeTheme}>
        <Routes>
          <Route path="*" element={<NotFoundPage/>} />
          <Route path="/" element={<SignUpPage/>} />
          <Route path="/LogIn" element={<LogInPage/>} />
          <Route path="/RecoverPassword" element={<RecoverPasswordPage/>} />
          <Route path="/Home" element={<HomePage/>} />
          <Route path="/Analysis" element={<AnalysisPage/>}/>
          <Route path="/Record" element={<RecordPage/>}/>
          <Route path="/Help" element={<HelpPage/>} />
          <Route path="/MyAccount" element={<AccountPage/>}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App
