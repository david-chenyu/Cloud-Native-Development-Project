import React from "react";
import { useNavigate } from 'react-router-dom';
import homeImage from '../image/home.png'
import messageImage from '../image/message.png'
import cellphoneImage from '../image/cellphone.png'


function OrderComplete() {
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.replace('tel:+886-988-464-283');
  };
  return (
    <>
        <div className="content" style={{ "flex-direction": "column" }}>
          <div className="profile-div" style={{ "flex-direction": "column" }}>
            <p>訂單已成立</p>
            <p>請於 12:22 至指定搭車地點等候。</p>
          </div>
          <div className="profile-button" style={{ paddingTop: "calc(20px + 15vh)" }}>
          <button onClick={() => navigate('/grading')} className="orderItem" style={{justifyContent:"center"}}>
                <span style={{padding:"0"}}>★給點評價</span>
            </button>
            <button onClick={handleClick} className="orderItem" >
                <img src={cellphoneImage} alt="Cellphone"/>
                <span >致電司機</span>
            </button>
          </div>
        </div>
        
        <div className="menu-gesture">
          <button onClick={() => navigate('/menu')} style={{ background: 'none', border: 'none', padding: 0 }}>
              <img className="ges-icon" src={homeImage} alt="Home" />
          </button>
        </div>
    </>
  );
}

export default OrderComplete;

