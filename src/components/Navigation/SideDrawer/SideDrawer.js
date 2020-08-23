import React from 'react';
import Logo from '../../Logo/Logo';
import Navigations from '../../Navigation/NavigationItems/NavigationItems';
import './SideDrawer.css'
const SideDrawer=(props)=>{
return(
    <div className='SideDrawer'>
    <Logo />
    <nav>
    <Navigations/>
    </nav>
    </div>
);
}
export default SideDrawer;