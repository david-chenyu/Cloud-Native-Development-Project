import React from "react";
import { useNavigate } from 'react-router-dom';
import homeImage from '../image/home.png'
import '../App.css'

function Mycar() {
  const navigate = useNavigate();
  const handleChange = (e) => {
    this.setState({ selectedValue: e.target.value })
  }
  const handleChange2 = (e) => {
    this.setState({ selectedValue: e.target.value })
  }
  return (
    <>
      <div className="content" style={{ flexDirection: "column" }}>
        <div className="profile-div" style={{ flexDirection: "column" }}>
          <h1>我的車輛</h1>
          <div className="auto-accept" style={{ paddingLeft: "10vw" }}>
            <label htmlFor="autoaccept" className="checkbox-label">
              <input type="checkbox" id="autoaccept" name="topping" value="autoaccept" style={{fontSize: "calc(12px + 1vh)" }} />
              <span style={{ fontSize: "calc(12px + 2vh)", color:"black" }}>自動接收訂單</span>
            </label>
          </div>
          <p style={{ fontSize: "calc(12px + 2vh)" }}>車型</p>
          <select onChange={(e) => handleChange(e)} style={{fontSize: "calc(12px + 1vh)" ,backgroundColor: "#D9D9D9" }}>
            <option value="ALTIS Safety+">ALTIS Safety+</option>
            <option value="PRIUS C">PRIUS C</option>
            <option value="ALTIS">ALTIS</option>
            <option value="bZ4X">bZ4X</option>
          </select>
          <p style={{ fontSize: "calc(12px + 2vh)" }}>最大乘客人數</p>
          <select onChange={(e) => handleChange2(e)} style={{fontSize: "calc(12px + 1vh)" ,backgroundColor: "#D9D9D9" }}>
            <option value="1">1人</option>
            <option value="2">2人</option>
            <option value="3">3人</option>
            <option value="4+">4+人</option>
          </select>
          <div className="auto-accept" style={{ paddingLeft: "10vw" ,marginTop: "5vw"}}>
            <label htmlFor="autoaccept" className="checkbox-label">
              <input type="checkbox" id="lagguage" name="topping2" value="lagguage" style={{ fontSize: "calc(12px + 1vh)" }} />
              <span style={{ fontSize: "calc(12px + 2vh)", color:"black" }}>可放行李</span>
            </label>
          </div>
          <div className="auto-accept" style={{ paddingLeft: "10vw",marginTop: "5vw" }}>
            <label htmlFor="autoaccept" className="checkbox-label">
              <input type="checkbox" id="accessible" name="topping3" value="accessible" style={{ fontSize: "calc(12px + 1vh)" }} />
              <span style={{ fontSize: "calc(12px + 2vh)", color:"black" }}>無障礙車型</span>
            </label>
          </div>
        </div>
      </div>

      <div className="menu-gesture">
        <button onClick={() => navigate('/menudriver')} style={{ background: 'none', border: 'none', padding: 0 }}>
          <img className="ges-icon" src={homeImage} alt="Home" />
        </button>
      </div>
    </>
  );
}

export default Mycar;
