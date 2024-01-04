import React, { useEffect, useState } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressBar() {
    const percentage = 66;

  return (
    <div style={{textAlign:"center"}}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
  );
}
export default ProgressBar;