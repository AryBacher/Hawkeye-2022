import React from 'react'
import '../stylesheets/BtnDropDownStylesheets/BtnDropDown.css';
import {useState, useEffect, useRef} from 'react';

function BtnDropDown({questionText, answerText}) {

  // Boton colapsable

  const [toggle, setToggle] = useState(false)
  const [heightEl, setHeightEl] = useState();

  const refHeight = useRef()

  useEffect(() => {
      console.log(refHeight);
      setHeightEl(`${refHeight.current.scrollHeight}px`);
  })

  const changeToggleState = () => {
      setToggle(!toggle)
  }

  console.log(toggle);


  return (
    <div className='drop-down-container'>
      <div className='question' onClick={changeToggleState}>
        <h3>{questionText}</h3>
        <svg className={toggle? 'active-arrow' : ''} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.17936 5.11057L14.5553 12.0007L8.17936 18.8908C8.06521 19.0139 8.00131 19.1792 8.00131 19.3513C8.00131 19.5234 8.06521 19.6886 8.17936 19.8117C8.2348 19.8713 8.30098 19.9187 8.37401 19.951C8.44704 19.9833 8.52546 20 8.60468 20C8.6839 20 8.76232 19.9833 8.83536 19.951C8.90839 19.9187 8.97456 19.8713 9.03 19.8117L15.8142 12.4818C15.9333 12.3531 16 12.1805 16 12.0007C16 11.8209 15.9333 11.6483 15.8142 11.5196L9.03131 4.18968C8.97583 4.12965 8.90949 4.08194 8.83622 4.04936C8.76294 4.01678 8.68422 4 8.60468 4C8.52515 4 8.44642 4.01678 8.37314 4.04936C8.29987 4.08194 8.23353 4.12965 8.17805 4.18968C8.0639 4.31278 8 4.47804 8 4.65012C8 4.82221 8.0639 4.98746 8.17805 5.11057H8.17936Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="1"/>
        </svg>
      </div>
      <div className={toggle? 'answer visible' : 'answer invisible'} style={{height: toggle? heightEl : '0px' }} ref={refHeight}>
        <p>{answerText}</p>
      </div>
    </div>
  )
}

export default BtnDropDown

/*

            <div className='btn-drop-down'>
              <div className='question'>
                <h3>¿Cómo colocar la cámara dentro de la cancha?</h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.17936 5.11057L14.5553 12.0007L8.17936 18.8908C8.06521 19.0139 8.00131 19.1792 8.00131 19.3513C8.00131 19.5234 8.06521 19.6886 8.17936 19.8117C8.2348 19.8713 8.30098 19.9187 8.37401 19.951C8.44704 19.9833 8.52546 20 8.60468 20C8.6839 20 8.76232 19.9833 8.83536 19.951C8.90839 19.9187 8.97456 19.8713 9.03 19.8117L15.8142 12.4818C15.9333 12.3531 16 12.1805 16 12.0007C16 11.8209 15.9333 11.6483 15.8142 11.5196L9.03131 4.18968C8.97583 4.12965 8.90949 4.08194 8.83622 4.04936C8.76294 4.01678 8.68422 4 8.60468 4C8.52515 4 8.44642 4.01678 8.37314 4.04936C8.29987 4.08194 8.23353 4.12965 8.17805 4.18968C8.0639 4.31278 8 4.47804 8 4.65012C8 4.82221 8.0639 4.98746 8.17805 5.11057H8.17936Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="1"/>
                </svg>
              </div>
              <div className='answer'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia, iusto rerum sunt reprehenderit nobis voluptatibus nesciunt laboriosam aliquam dolores quasi quo tempora id magni officia esse in, explicabo obcaecati.
              </div>
            </div>

*/