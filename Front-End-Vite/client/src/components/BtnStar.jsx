import React from 'react';
import {useState} from 'react';
import '../stylesheets/BtnStarStylesheets/BtnStar.css';

function BtnStar() {

  const [outstanding, setOutstanding] = useState(false);

  const changeOutstanding = ()=>{
    setOutstanding(!outstanding);
  }

  return (
    <>
      <svg className={outstanding ? 'outstanding' : 'not-outstanding'} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={changeOutstanding}>
        <path d="M12 1.36253L14.7124 7.88387L14.8297 8.16585L15.1341 8.19026L22.1744 8.75468L16.8104 13.3495L16.5785 13.5482L16.6493 13.8453L18.2881 20.7154L12.2606 17.0338L12 16.8747L11.7394 17.0338L5.71186 20.7154L7.35065 13.8453L7.42151 13.5482L7.18957 13.3495L1.82558 8.75468L8.86592 8.19026L9.17034 8.16585L9.28762 7.88387L12 1.36253Z"/>
      </svg>
    </>
  )
}

export default BtnStar

/*

- outstanding

<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.36253L14.7124 7.88387L14.8297 8.16585L15.1341 8.19026L22.1744 8.75468L16.8104 13.3495L16.5785 13.5482L16.6493 13.8453L18.2881 20.7154L12.2606 17.0338L12 16.8747L11.7394 17.0338L5.71186 20.7154L7.35065 13.8453L7.42151 13.5482L7.18957 13.3495L1.82558 8.75468L8.86592 8.19026L9.17034 8.16585L9.28762 7.88387L12 1.36253Z" fill="#4ECB71" stroke="#4ECB71"/>
</svg>

- not-outstanding

<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.36253L14.7124 7.88387L14.8297 8.16585L15.1341 8.19026L22.1744 8.75468L16.8104 13.3495L16.5785 13.5482L16.6493 13.8453L18.2881 20.7154L12.2606 17.0338L12 16.8747L11.7394 17.0338L5.71186 20.7154L7.35065 13.8453L7.42151 13.5482L7.18957 13.3495L1.82558 8.75468L8.86592 8.19026L9.17034 8.16585L9.28762 7.88387L12 1.36253Z" stroke="#FCFCFC"/>
</svg>


*/