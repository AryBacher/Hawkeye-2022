import React from 'react';
import {Link} from 'react-router-dom';

function BtnContinue(props) {
  return (
    <button><Link to = {props.routeName} >{props.textBtn}</Link></button>
  )
}

export default BtnContinue;