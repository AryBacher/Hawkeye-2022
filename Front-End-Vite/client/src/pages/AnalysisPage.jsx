import React from 'react';
import EndUseNavbar from '../components/EndUseNavbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useState,useRef, useEffect} from 'react';
import CardVideo from '../components/CardVideo';
import "../stylesheets/AnalysisPageStylesheets/AnalysisPage.css";

function AnalysisPage() {

  // Botón colapsable de mostrar filtros de búsqueda.

  const [toggle, setToggle] = useState(false)
  const [heightEl, setHeightEl] = useState();

  const refHeight = useRef()

  useEffect(() => {
      console.log(refHeight);
      setHeightEl(`${refHeight.current.scrollHeight}px`);
      
  }, [])

  const toggleState = () => {
      setToggle(!toggle)
  }

  console.log(toggle);



  // Formulario de botones de radio.

  const[typeAnalysis, setTypeAnalysis] = useState('cualquiera');
  const[duration, setDuration] = useState('cualquiera');
  const[orderBy, setOrderBy] = useState('destacados');


  return (
    <>
      <div className="wrapper-ap">
        <EndUseNavbar
          grabarId = ''
          análisisId = 'análisis'
          ayudaId = ''
        />
        <div className='profile-bg'>
        </div>
        <div className='content-ap'>
          <section className='profile-data'>
            <div className='profile-picture-main'>
              <svg width="80" height="80" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.3483 50.347C61.8943 50.347 71.2542 40.9871 71.2542 29.4411C71.2542 17.8951 61.8943 8.53516 50.3483 8.53516C38.8023 8.53516 29.4424 17.8951 29.4424 29.4411C29.4424 40.9871 38.8023 50.347 50.3483 50.347Z" stroke="#151F27" stroke-width="6.96864"/>
                <path d="M71.2541 58.709H72.7259C75.7826 58.7098 78.7339 59.8269 81.0252 61.8502C83.3165 63.8736 84.79 66.664 85.1691 69.6971L86.8039 82.7592C86.951 83.9359 86.8461 85.1304 86.4962 86.2635C86.1463 87.3965 85.5594 88.4422 84.7745 89.3311C83.9896 90.22 83.0246 90.9318 81.9435 91.4193C80.8625 91.9068 79.6901 92.1587 78.5043 92.1585H22.1921C21.0062 92.1587 19.8339 91.9068 18.7528 91.4193C17.6718 90.9318 16.7068 90.22 15.9219 89.3311C15.1369 88.4422 14.5501 87.3965 14.2002 86.2635C13.8503 85.1304 13.7454 83.9359 13.8924 82.7592L15.5231 69.6971C15.9023 66.6625 17.3771 63.871 19.6701 61.8475C21.9631 59.8239 24.9164 58.7078 27.9747 58.709H29.4422" stroke="#151F27" stroke-width="6.96864" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>  
            </div>
            <div className='user-names'>
              <h3 id='username-main'>Nico</h3>
              <p id='mail-main'>nicolas@gmail.com</p>
            </div>
            <div className='amount-videos'>
              <div className='general point-indicator'></div>
              <p>Cantidad de análisis <span>(8)</span></p>
            </div>
            <div className='amount-trainings'>
              <div className='training point-indicator'></div>
              <p>Cantidad de entrenamientos <span>(4)</span></p>
            </div>
            <div className='amount-matches'>
              <div className='match point-indicator'></div>
              <p>Cantidad de partidos <span>(4)</span></p>
            </div>
          </section>
          <section className='search-filters'>
            <div id="search-bar-container">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1727 16.2964L17.1728 16.2963C17.2113 16.2578 17.2418 16.2121 17.2627 16.1619C17.2835 16.1116 17.2942 16.0577 17.2942 16.0033C17.2942 15.9489 17.2835 15.895 17.2627 15.8447C17.2418 15.7945 17.2113 15.7488 17.1728 15.7103L12.1256 10.6631C12.8822 9.60993 13.2894 8.34837 13.2894 7.02666C13.2894 5.35415 12.6361 3.78495 11.4562 2.603C10.2759 1.42057 8.70241 0.769531 7.03227 0.769531C5.36199 0.769531 3.78868 1.42267 2.60855 2.60275C1.42619 3.78306 0.775146 5.3545 0.775146 7.02666C0.775146 8.69698 1.42831 10.2703 2.60846 11.4505C3.78875 12.6328 5.36016 13.2838 7.03227 13.2838C8.35407 13.2838 9.61375 12.8765 10.6666 12.1217L15.7139 17.1672C15.7524 17.2057 15.7981 17.2362 15.8484 17.257C15.8986 17.2779 15.9525 17.2886 16.0069 17.2886C16.0613 17.2886 16.1152 17.2779 16.1655 17.257C16.2156 17.2363 16.2612 17.2058 16.2996 17.1675C16.2997 17.1674 16.2998 17.1673 16.2999 17.1672L17.1727 16.2964ZM10.0275 10.0214C9.22517 10.8218 8.16326 11.262 7.03227 11.262C5.90136 11.262 4.83952 10.8219 4.03724 10.0216C3.23699 9.21932 2.79695 8.15753 2.79695 7.02666C2.79695 5.89555 3.23716 4.83186 4.03718 4.03178C4.83947 3.23143 5.90133 2.79134 7.03227 2.79134C8.16369 2.79134 9.22723 3.22975 10.027 4.03146C10.8275 4.83376 11.2676 5.89566 11.2676 7.02666C11.2676 8.15772 10.8274 9.22137 10.0275 10.0214Z" fill="#283A49" stroke="#283A49" stroke-width="0.5"/>
              </svg>
              <input id='search-bar' type="search" placeholder='Buscar análisis...' onKeyUp={e =>{e.target.value; console.log(e.target.value)}} />
            </div>
            <div className='filters'>
              <div className='btn-filters' onClick={toggleState}>
                <svg className="settings-filter" width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2.83789H4.55571M17.0007 2.83789H8.11142M1 9.06038H11.6671M17.0007 9.06038H15.2228M1 15.2829H2.77785M17.0007 15.2829H6.33356" stroke="#4ECB71" stroke-width="1.75" stroke-linecap="round"/>
                  <path d="M6.33352 4.61626C7.3154 4.61626 8.11137 3.82028 8.11137 2.8384C8.11137 1.85652 7.3154 1.06055 6.33352 1.06055C5.35164 1.06055 4.55566 1.85652 4.55566 2.8384C4.55566 3.82028 5.35164 4.61626 6.33352 4.61626Z" stroke="#4ECB71" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M13.4448 10.8389C14.4267 10.8389 15.2227 10.0429 15.2227 9.06106C15.2227 8.07918 14.4267 7.2832 13.4448 7.2832C12.463 7.2832 11.667 8.07918 11.667 9.06106C11.667 10.0429 12.463 10.8389 13.4448 10.8389Z" stroke="#4ECB71" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M4.55569 17.0596C5.53757 17.0596 6.33354 16.2636 6.33354 15.2818C6.33354 14.2999 5.53757 13.5039 4.55569 13.5039C3.5738 13.5039 2.77783 14.2999 2.77783 15.2818C2.77783 16.2636 3.5738 17.0596 4.55569 17.0596Z" stroke="#4ECB71" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <h3>FILTROS DE BÚSQUEDA</h3>
                <svg className = {toggle ? 'arrow-filter inactive-arrow': 'arrow-filter'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.0283 8.17936L11.9994 14.5553L5.97051 8.17936C5.8628 8.06521 5.7182 8.00131 5.56762 8.00131C5.41705 8.00131 5.27245 8.06521 5.16473 8.17936C5.11258 8.2348 5.07114 8.30098 5.04286 8.37401C5.01457 8.44704 5 8.52546 5 8.60468C5 8.6839 5.01457 8.76232 5.04286 8.83536C5.07114 8.90839 5.11258 8.97456 5.16473 9.03L11.5784 15.8142C11.691 15.9333 11.8421 16 11.9994 16C12.1567 16 12.3077 15.9333 12.4204 15.8142L18.834 9.03131C18.8866 8.97583 18.9283 8.90949 18.9568 8.83622C18.9853 8.76294 19 8.68422 19 8.60468C19 8.52515 18.9853 8.44642 18.9568 8.37314C18.9283 8.29987 18.8866 8.23353 18.834 8.17805C18.7263 8.0639 18.5817 8 18.4311 8C18.2806 8 18.136 8.0639 18.0283 8.17805V8.17936Z" fill="#4ECB71" stroke="#4ECB71" stroke-width="0.75"/>
                </svg>
              </div>
              <div className={toggle ? 'filters-container filters-visible' : "filters-container filters-invisible"} style={{height: toggle ? `${heightEl}` : "0px"}} ref={refHeight} >
                <form onSubmit={
                  (e)=>{
                    e.preventDefault(); 
                    console.log(typeAnalysis);
                    console.log(duration);
                    console.log(orderBy);
                  }}
                >
                  <div className='filters-box'>
                    <FormControl className='form-control'>
                      <FormLabel sx={{ fontWeight: 500, fontSize: '1em', paddingBottom: '15px'}}>
                        Tipo de análisis
                      </FormLabel>
                      <RadioGroup
                        name="analysis-type"
                        value={typeAnalysis}
                        onChange={(e)=>{setTypeAnalysis(e.target.value)}}
                      >
                        <FormControlLabel value="cualquiera" control={<Radio />} label="Cualquiera" />
                        <FormControlLabel value="partidos" control={<Radio />} label="Partidos" />
                        <FormControlLabel value="entrenamientos" control={<Radio />} label="Entrenamientos" />
                        <FormControlLabel value="destacados" control={<Radio />} label="Destacados" />
                      </RadioGroup>
                    </FormControl>
                    <FormControl className='form-control'>
                      <FormLabel sx={{ fontWeight: 500, fontSize: '1em', paddingBottom: '15px'}}>
                        Duración de análisis
                      </FormLabel>
                      <RadioGroup
                        name="analysis-duration"
                        value={duration}
                        onChange={(e)=>{setDuration(e.target.value)}}
                      >
                        <FormControlLabel value="cualquiera" control={<Radio />} label="Cualquiera"/>
                        <FormControlLabel value="-10min" control={<Radio />} label="Menos de 10 minutos" />
                        <FormControlLabel value="10min-30min" control={<Radio />} label="Entre 10 y 30 minutos" />
                        <FormControlLabel value="+30min" control={<Radio />} label="Más de 30 minutos" />
                      </RadioGroup>
                    </FormControl>
                    <FormControl className='form-control'>
                      <FormLabel sx={{ fontWeight: 500, fontSize: '1em', paddingBottom: '15px'}}>
                        Ordenar por
                      </FormLabel>
                      <RadioGroup
                        name="analysis-duration"
                        value={orderBy}
                        onChange={(e)=>{setOrderBy(e.target.value)}}
                      >
                        <FormControlLabel value="destacados" control={<Radio />} label="Destacados" />
                        <FormControlLabel value="recientes" control={<Radio />} label="Más recientes" />
                        <FormControlLabel value="antiguos" control={<Radio />} label="Más antiguos" />
                      </RadioGroup>
                    </FormControl>
                  </div>
                    
                  <Button sx={{
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    fontSize: '1em',
                    height: '50px',
                    padding: 0,
                    borderRadius: '10px'
                  }} 
                  type='submit' 
                  variant='contained'>
                      Aplicar filtros
                  </Button>
                </form>
              </div>
            </div>
          </section>
          <div className='divider'></div>
          <section className='videos'>
            <CardVideo
              title = "Partido vs Ary Bacher"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator match"
              otherInfo = "Partido del 12/08/22"
              state = {true}
            />
            <CardVideo
              title = "Entrenamiento previo a partido"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator training"
              otherInfo = "Entrenamiento del 11/08/22"
              state = {true}
            />
            <CardVideo
              title = "Partido vs Alan Yeger"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator match"
              otherInfo = "Partido del 10/08/22"
              state = {true}
            />
            <CardVideo
              title = "Entrenamiento antes de enfrentar a Alan Yeger"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator training"
              otherInfo = "Entrenamiento del 08/08/22"
              state = {true}
            />

            <CardVideo
              title = "Ary Bacher ganaasdasd final Copa Davis"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator match"
              otherInfo = "Partido del 12/08/22"
              state = {true}
            />
            <CardVideo
              title = "Ary Bacher ganaasdasd final Copa Davis"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator training"
              otherInfo = "Entrenamiento del 12/08/22"
              state = {true}
            />
            <CardVideo
              title = "Ary Bacher ganaasdasd final Copa Davis"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator match"
              otherInfo = "Partido del 12/08/22"
              state = {true}
            />
            <CardVideo
              title = "Ary Bacher ganaasdasd final Copa Davis"
              thumbnail = "img-thumbnail"
              videoType = "point-indicator training"
              otherInfo = "Entrenamiento del 12/08/22"
              state = {true}
            />
          </section>
        </div>
      </div>
    </>
  )
}

export default AnalysisPage;

// className = {toggle ? 'arrow-filter': 'arrow-filter inactive-arrow'}

//  className={toggle ? 'filters-container filters-visible' : "filters-container filters-invisible"} style={{height: toggle ? `${heightEl}` : "0px"}}

/*

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.0283 8.17936L11.9994 14.5553L5.97051 8.17936C5.8628 8.06521 5.7182 8.00131 5.56762 8.00131C5.41705 8.00131 5.27245 8.06521 5.16473 8.17936C5.11258 8.2348 5.07114 8.30098 5.04286 8.37401C5.01457 8.44704 5 8.52546 5 8.60468C5 8.6839 5.01457 8.76232 5.04286 8.83536C5.07114 8.90839 5.11258 8.97456 5.16473 9.03L11.5784 15.8142C11.691 15.9333 11.8421 16 11.9994 16C12.1567 16 12.3077 15.9333 12.4204 15.8142L18.834 9.03131C18.8866 8.97583 18.9283 8.90949 18.9568 8.83622C18.9853 8.76294 19 8.68422 19 8.60468C19 8.52515 18.9853 8.44642 18.9568 8.37314C18.9283 8.29987 18.8866 8.23353 18.834 8.17805C18.7263 8.0639 18.5817 8 18.4311 8C18.2806 8 18.136 8.0639 18.0283 8.17805V8.17936Z" fill="#4ECB71" stroke="#4ECB71" stroke-width="0.75"/>
</svg>


*/