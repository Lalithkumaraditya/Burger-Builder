import React from 'react';
import Logo from '../../assets/Drink.png';
import SpecialOffer from '../../assets/super-sale-and-special-offer-banner-design-png_227619.jpg';

import './DrinkLogo.css'
const DrinkLogo = (props)=>(
    <div className='green'>Congrats You got free Moktail
<div className='DrinkLogo'>

<img src={Logo} alt="DrinkLogo"/> 
<img src={SpecialOffer} alt="SpecialOffer" />
</div>
</div>
);

export default DrinkLogo;