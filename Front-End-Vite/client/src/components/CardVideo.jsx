import React from "react";
import BtnStar from "./BtnStar";
import "../stylesheets/CardVideoStylesheets/CardVideo.css";

function CardVideo({ video, title, thumbnail, videoType, typeText, state, date }) {

  return (
    <>
      <div className="card-video-container">
        <div
          id="thumbnail-box"
          className="img-thumbnail"
          style={{ backgroundImage: thumbnail }}
        >
          <svg
            width="64"
            height="65"
            viewBox="0 0 64 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="0.0605469" width="64" height="64" rx="32" fill="#FCFCFC" />
            <path
              d="M40.7921 33.6545L28.0661 41.0385C26.9861 41.6645 25.6001 40.9065 25.6001 39.6445V24.8765C25.6001 23.6165 26.9841 22.8565 28.0661 23.4845L40.7921 30.8685C41.0378 31.0087 41.242 31.2114 41.384 31.4561C41.5261 31.7007 41.6009 31.9786 41.6009 32.2615C41.6009 32.5443 41.5261 32.8222 41.384 33.0668C41.242 33.3115 41.0378 33.5142 40.7921 33.6545V33.6545Z"
              fill="#4ECB71"
            />
          </svg>
        </div>
        <h4 className="title">{video.titulo}</h4>
        <div className="video-card-bottom">
          <div className="left-btm">
            <div className={video.tipo}></div>
            <p className="video-type-date">
              {typeText} {video.FechaPartido}
            </p>
          </div>
          <BtnStar state={state} />
        </div>
      </div>
    </>
  );
}
export default CardVideo;

/*
<svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2111_3396)">
<rect x="4" y="0.0605469" width="64" height="64" rx="32" fill="#FCFCFC"/>
<path d="M44.7921 33.6545L32.0661 41.0385C30.9861 41.6645 29.6001 40.9065 29.6001 39.6445V24.8765C29.6001 23.6165 30.9841 22.8565 32.0661 23.4845L44.7921 30.8685C45.0378 31.0087 45.242 31.2114 45.384 31.4561C45.5261 31.7007 45.6009 31.9786 45.6009 32.2615C45.6009 32.5443 45.5261 32.8222 45.384 33.0668C45.242 33.3115 45.0378 33.5142 44.7921 33.6545Z" fill="#4ECB71"/>
</g>
<defs>
<filter id="filter0_d_2111_3396" x="0" y="0.0605469" width="72" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2111_3396"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2111_3396" result="shape"/>
</filter>
</defs>
</svg>*/