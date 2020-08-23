import React from 'react';
import './Backdrop.css';

const BackDrop =(props)=>(
    (props.show) ? <div className='Backdrop' onClick={props.clicked}></div> : null

  
);
export default BackDrop;