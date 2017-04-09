import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import LocationDetail from './routes/LocationDetail';

import Footer from './components/Footer';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/location/:location" component={LocationDetail} />
    </Switch>
    <Footer />
  </div>
);

export default App;
