import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/BtnContinue.scss';

function BtnContinue(props) {
  return (
    <button><Link to={props.routeName} >{props.textBtn}</Link></button>
  )
}

export default BtnContinue;