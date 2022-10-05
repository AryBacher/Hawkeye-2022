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

  //Por ahora 12 paginas (contando el mail de confirmación de cambio de contraseña), una barbaridad.
  //
  //Not Found Page terminada (faltan media-queries).
  //Home Page terminada (faltan media-queries).
  //Sign Up Page terminada.
  //Log In Page terminada (faltan media-queries).
  //RecoverPassword Page terminada.
  //ConfirmNewPassword Page terminada

  //Faltán 6 páginas:
  //
  //Analysis Page falta todo. (Terminado en dos semanas).
  //Record Page falta todo. (Terminado en 2 horas). Hacer hoy.
  //StartLive Page falta todo. (Terminado en una semana). 
  //UploadVideo Page falta todo. (Terminado en una semana).
  //Help Page falta todo. (Terminado en una semana).
  //
  //Mail de confirmación falta todo. (Terminado en 30 minutos o menos aunque es opcional). 

  //Cosas que preguntar: Tema de tiempo, cómo explicar el proyecto y además el cómo hacer la animación de intersection observer. 

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
          <Route path="/Analysis" element={<AnalysisPage/>}/>
          <Route path="/Record" element={<RecordPage/>}/>
          <Route path="/StartLive" element={<StartLivePage/>}/>
          <Route path="/UploadVideo" element={<UploadVideoPage/>}/>
          <Route path="/Help" element={<HelpPage/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App
