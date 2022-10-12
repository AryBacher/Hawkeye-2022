import React from 'react'
import {useState, useEffect} from 'react';
import "../stylesheets/BtnBackToTopStylesheets/BtnBackToTop.css";

function BtnBackToTop() {

	const [BtnDisplay, setBtnDisplay] = useState(false);

	useEffect(()=>{

		window.addEventListener('scroll', ()=>{
			if(window.scrollY > 100/120){
				setBtnDisplay(true);
			}
			else{
				setBtnDisplay(false);
			}
		})
	});

	const BackToTop = ()=>{
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
  return (
    <>
			<div className={BtnDisplay? 'btn-btt-true':'btn-btt-false'} id='btn-btt-container' onClick={BackToTop}>
				<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7 21C7 21.5523 7.44772 22 8 22C8.55228 22 9 21.5523 9 21H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 21L9 1H7L7 21H9Z" fill="#fcfcfc"/>
				</svg>
			</div>
		</>
  )
}

export default BtnBackToTop