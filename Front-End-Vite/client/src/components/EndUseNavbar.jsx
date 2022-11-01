import React, { useEffect } from 'react';
import  LogoSmall from './LogoSmall';
import Avatar from '@mui/material/Avatar';
import {useState, useEffec, useRef} from 'react';
import '../stylesheets/EndUseNavbarStylesheets/EndUseNavbar.css';
import { useParams } from "react-router-dom"
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function EndUseNavbar({grabarId, análisisId, ayudaId, userName}) {

  const { id } = useParams()
  const axiosPrivate = useAxiosPrivate();

  const [dropdown, setDropdown] = useState(false);

  const changeDropdown = ()=>{
    setDropdown(!dropdown);
    console.log(dropdown)
  };

  const logOut = async () => {
    const response = await axiosPrivate.get(
      "/LogOut",
      );
    console.log(response)
  };
  // Hacer que cuando clickee afuera se setee a false, sin embargo al referenciar al body también cuenta justamente lo que usamos para setearlo a true por lo que siempre es false. (quizás usar otro hook como useRef)
  // useEffect(()=>{
  //   const closeDropdown = e =>{
  //     setDropdown(false);
  //   }
  //   document.addEventListener('click', closeDropdown);
  // });

  //Referencia al log out pop-up

  const logOutBtn = useRef(null);
  const profileBtn = useRef(null);

  useEffect(()=>{

    const clickOutside = (e)=>{
      if(logOutBtn.current && !logOutBtn.current.contains(e.target) && !profileBtn.current.contains(e.target)){
        setDropdown(false);
      }
    }

    window.document.addEventListener('mousedown', clickOutside);
    return ()=>{window.document.removeEventListener('mousedown', clickOutside)}

  },[logOutBtn])

  return (
    <>
      <nav className='enduse-nav'>
        <div className='nav-content'>
          <LogoSmall/>
          <ul>
            <li id={grabarId}>
              <a href={`/Record/${id}`}>Grabar</a>
            </li>
            <li id={análisisId}>
              <a href={`/Analysis/${id}`}>Análisis</a>
            </li>
            <li id={ayudaId}>
              <a href={`/Help/${id}`}>Ayuda</a>
            </li>
          </ul>

          <div className='profile-container' onClick={changeDropdown} ref={profileBtn}>
            <Avatar alt="Username" sx={{ width: 36, height: 36 ,color: '#FCFCFC', backgroundColor: '#BF360C', marginLeft : '15px', fontSize: '16px' }}>{userName[0]}</Avatar>
            <p id='profile-name'>{userName}</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.92796 9.07107L11.6455 15.7886C11.8407 15.9838 12.1573 15.9838 12.3526 15.7886L19.0701 9.07107" stroke="#FCFCFC" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </nav>

      <a href="/LogIn" ref={logOutBtn} onClick={logOut}>
        <div className={dropdown? 'menu': 'menu notdropdown'}>
          <svg className="icon-logout" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 13V15C11 15.5304 10.8244 16.0391 10.5118 16.4142C10.1993 16.7893 9.77536 17 9.33333 17H2.66667C2.22464 17 1.80072 16.7893 1.48816 16.4142C1.17559 16.0391 1 15.5304 1 15V3C1 2.46957 1.17559 1.96086 1.48816 1.58579C1.80072 1.21071 2.22464 1 2.66667 1H9C9.92042 1 11 1.8955 11 3V5M13.6667 13L17 9L13.6667 5M5.66667 9H16.3333" stroke="#FF1A43" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>
            Cerrar Sesión
          </p>
        </div>
      </a>
    </>
  )
}

export default EndUseNavbar;