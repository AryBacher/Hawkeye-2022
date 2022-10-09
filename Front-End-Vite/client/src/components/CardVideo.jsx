import React from "react";
import BtnStar from "./BtnStar";

function CardVideo() {
  return (
    <>
      <div className="card-video-container">
        <div className="thumbnail">
          <div className="btn-play">
            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7921 10.6545L3.0661 18.0385C1.9861 18.6645 0.600098 17.9065 0.600098 16.6445V1.87646C0.600098 0.616462 1.9841 -0.143539 3.0661 0.484461L15.7921 7.86846C16.0378 8.00871 16.242 8.21143 16.384 8.45608C16.5261 8.70072 16.6009 8.97857 16.6009 9.26146C16.6009 9.54435 16.5261 9.8222 16.384 10.0668C16.242 10.3115 16.0378 10.5142 15.7921 10.6545Z" fill="#4ECB71"/>
            </svg>
          </div>  
        </div>
        <h4 className="title"></h4>  
        <div className="video-card-bottom">
          <div className="point-indicator"></div>
          <p className="type-video"></p>
          <BtnStar/>
        </div>  
      </div> 
    </>
  );
}
export default CardVideo;
