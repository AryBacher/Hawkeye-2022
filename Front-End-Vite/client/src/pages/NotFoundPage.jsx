import React from 'react';
import '../stylesheets/NotFoundPageStylesheets/NotFoundPage.css';
import { motion } from 'framer-motion';

function NotFoundPage() {
  return (
    <>
      <div className='wrapperNotFoundPage'>
        <h2>Whoops...</h2>
        <motion.svg width="234" height="235" viewBox="0 0 234 235" fill="none" xmlns="http://www.w3.org/2000/svg"
          animate = {{
            x: '44vw',
            ease: 'easeIn',
            rotate: 360
          }}
          transition = {{
            type: 'spring',
            stiffness: 16,
            damping: 4.5,
          }}
        >
          <path d="M141.925 207.763C142.898 193.487 148.09 186.349 159.446 174.993C170.153 164.285 177.291 150.982 177.291 135.408C177.291 104.585 150.361 79.6011 116.941 79.6011C83.522 79.6011 56.5918 104.585 56.5918 135.408C56.5918 150.982 63.7299 164.285 74.4371 174.993C85.7933 186.349 90.9846 193.487 91.958 207.763" stroke="#151F27" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M116.941 211.332C168.908 211.332 211.035 169.205 211.035 117.239C211.035 65.2722 168.908 23.145 116.941 23.145C64.975 23.145 22.8479 65.2722 22.8479 117.239C22.8479 169.205 64.975 211.332 116.941 211.332Z" fill="#BDFF01"/>
          <path d="M141.925 203.763C142.898 189.487 148.09 182.349 159.446 170.993C170.153 160.285 177.291 146.982 177.291 131.408C177.291 100.585 150.361 75.6011 116.941 75.6011C83.522 75.6011 56.5918 100.585 56.5918 131.408C56.5918 146.982 63.7299 160.285 74.4371 170.993C85.7933 182.349 90.9846 189.487 91.958 203.763" stroke="#FCFCFC" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M116.941 211.332C168.908 211.332 211.035 169.205 211.035 117.239C211.035 65.2722 168.908 23.145 116.941 23.145C64.975 23.145 22.8479 65.2722 22.8479 117.239C22.8479 169.205 64.975 211.332 116.941 211.332Z" stroke="#151F27" stroke-width="3.65018" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </motion.svg>
        <h1>4    4</h1>
        <p>Esta página no existe, deberíamos <a href="/">volver</a>.</p>
      </div>
    </>
  )
}

export default NotFoundPage;