import React from 'react';
import burgerLogo from '../../components/assets/burger-logo.png';
import './Logo.css'
const logo = (props)=>(
<div className='Logo'>
<img src={burgerLogo} alt="MyBurger"/>
</div>

);

export default logo;