import React from 'react'
import '../stylesheets/RecordPageStylesheets/RecordPage.css';
import EndUseNavbar from '../components/EndUseNavbar';

function RecordPage() {
  return (
    <>
      <div className="wrapper-r">
        <EndUseNavbar
          grabarId = 'grabar'
          análisisId = ''
          ayudaId = ''
        />
      </div>
    </>
  )
}

export default RecordPage;
