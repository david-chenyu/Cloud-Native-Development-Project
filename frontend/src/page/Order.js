import React from "react";
import { useNavigate } from 'react-router-dom';
import nextImage from '../image/next.png'
import buttonImage from '../image/back.png';
import apiImage from '../image/api.png';
function Order(){
  const navigate = useNavigate();
  const handleChange = (e) => {
    this.setState({ selectedValue: e.target.value })
  }
    return (
      <>
      <div className="content" style={{ "flex-direction": "column" }}>
          <div className="profile-div" style={{ "flex-direction": "column" }}>
            <p style={{ fontSize: "calc(12px + 2vh)", paddingBottom: "1vw" }}>出發地</p>
            <button onClick={() => navigate('/reserve')} style={{ width: '85vw', marginLeft: "7.5vw",backgroundColor: "#D9D9D9"}}>
                <img src={apiImage} alt="api1" />
              <span>交通大學</span>
            </button>
            <p style={{ fontSize: "calc(12px + 2vh)" , paddingBottom: "1vw"}}>目的地</p>
            <button onClick={() => navigate('/reserve')} style={{ width: '85vw', marginLeft: "7.5vw",backgroundColor: "#D9D9D9"}}>
                <img src={apiImage} alt="api1" />
                <span>新竹火車站</span>
            </button>
            
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "calc(12px + 2vh)",paddingLeft: "6vw", paddingTop: "2.5vw", paddingBottom: "2.5vw", margin: 0}}>乘客人數</p>
            <div className="auto-accept" style={{ paddingLeft: "30vw", marginTop: "5vh" }}>
              <label htmlFor="carpooling" className="checkbox-label">
                <input type="checkbox" id="carpooling" name="topping3" value="carpooling" style={{ fontSize: "calc(12px + 1vh)" }} />
                <span style={{ fontSize: "calc(12px + 2vh)", color: "black" }}>允許共乘</span>
              </label>
            </div>
            </div>
              <select onChange={(e) => handleChange(e)} style={{fontSize: "calc(12px + 1vh)" ,backgroundColor: "#D9D9D9" ,width: '85vw', marginLeft: "7.5vw"}}>
                <option value="1">1人</option>
                <option value="2">2人</option>
                <option value="3">3人</option>
                <option value="4+">4+人</option>
              </select>
          
          <div className="profile-div" style={{ "flex-direction": "column", paddingTop: "15vh" }}>
            <p>出發時間: 12 : 22</p>
            <p>抵達時間: 12 : 57</p>
            <p>預估車資: 80元</p>
          </div>
          
        </div>
        
        <div className="menu-gesture">
          <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', padding: 0}}>
              <img className="ges-icon" src={buttonImage} style={{ marginRight: '40vw' }} alt="Back" />
          </button>
          <button onClick={() => navigate('/ordercomplete')} style={{ background: 'none', border: 'none', padding: 0 }}>
              <img className="ges-icon" src={nextImage} alt="Next" />
          </button>
        </div>
    </>
        
    );
}

export default Order;

/* <div className="profile-buttons">
          <p style={{ fontSize: '30px', position: 'absolute', top: '125px', left: '50px' }}>出發地</p>

          <p style={{ fontSize: '30px', position: 'absolute', top: '225px', left: '50px' }}>目的地</p>

          <p style={{ fontSize: '30px', position: 'absolute', top: '325px', left: '50px' }}>出發時間</p>

          <p style={{ fontSize: '30px', position: 'absolute', top: '425px', left: '50px' }}>抵達時間</p>

          <p style={{ fontSize: '30px', position: 'absolute', top: '525px', left: '50px' }}>乘客人數</p>




        
      <div style={{ position: 'absolute', top: '744px', left: '0px', width: '390px', height: '100px' }}>
            <div style={{ backgroundColor: 'gray', width: '100%', height: '100%' }}>
                <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img style={{ width: '25px', height: '50px', position: 'absolute', top: '25px', left: '80px' }} src={buttonImage} alt="Back" />
                </button>
                <button onClick={() => navigate('/Ordernext')} style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img style={{ width: '25px', height: '50px', position: 'absolute', top: '25px', left: '290px' }} src={nextImage} alt="Next" />
                </button>
            </div>
      </div>


    </div> */