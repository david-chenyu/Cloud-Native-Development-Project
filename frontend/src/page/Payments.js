import React from "react";

import buttonImage from '../image/back.png';
function Payments() {

  return (
    <div>
      <p>這是付款資訊的頁面!</p>

      <div style={{ position: 'absolute', top: '744px', left: '0px', width: '390px', height: '100px' }}>
        <div style={{ backgroundColor: 'gray', width: '100%', height: '100%' }}>
          <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', padding: 0 }}>
            <img style={{ width: '25px', height: '50px', position: 'absolute', top: '20px', left: '180px' }} src={buttonImage} alt="Back" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
