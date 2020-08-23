import React from 'react';
import Layout from './components/Layout/Layout'
import Aux from './hoc/Aux';
import {Route,Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders'
function App() {
  return (
    <Aux>
    <Layout>
    <Switch>
 <Route path="/checkout" component={Checkout} />
 <Route path="/orders" component={Orders} />
 <Route path="/" exact component={BurgerBuilder} />

 </Switch>
    </Layout>
    </Aux>
  );
}

export default App;
