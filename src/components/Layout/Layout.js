import React from 'react';
import Aux from '../../hoc/Aux';
import  './Layout.css';
import ToolBar from '../../components/Navigation/Toolbar/ToolBar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => (
    <Aux >
<ToolBar/>
<SideDrawer />
<main className='Content'>
{props.children}
</main>
</Aux>

);

export default Layout;