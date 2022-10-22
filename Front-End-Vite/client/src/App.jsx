import './App.css'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RecoverPasswordPage from './pages/PasswordLostPage.jsx'
import AnalysisPage from './pages/AnalysisPage.jsx'
import RecordPage from './pages/RecordPage'
import HelpPage from './pages/HelpPage'
import ConfirmNewPasswordPage from './pages/ConfirmNewPasswordPage'
import StartLivePage from './pages/StartLivePage'
import UploadVideoPage from './pages/UploadVideoPage'
import VideoPage from './pages/VideoPage'
import {Route, Routes} from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material"

function App() {

  const HawkeyeTheme = createTheme({
    palette:{
      mode: 'dark',
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
          <Route path="/" element={<HomePage/>} />
          <Route path="/SignUp" element={<SignUpPage/>} />
          <Route path="/LogIn" element={<LogInPage/>} />
          <Route path="/RecoverPassword" element={<RecoverPasswordPage/>} />
          <Route path="/ConfirmNewPassword" element={<ConfirmNewPasswordPage/>}/>
          <Route path="/Analysis/:id" element={<AnalysisPage/>}/>
          <Route path="/Record/:id" element={<RecordPage/>}/>
          <Route path="/StartLive" element={<StartLivePage/>}/>
          <Route path="/UploadVideo" element={<UploadVideoPage/>}/>
          <Route path="/Analysis/:id/:idVideo" element={<VideoPage/>}/>
          <Route path="/Help/:id" element={<HelpPage/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App
