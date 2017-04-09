import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import LocationDetail from './routes/LocationDetail';
import DeveloperDetail from './routes/DeveloperDetail';

import NotFound from './components/NotFound';
import Footer from './components/Footer';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/location/:location" component={LocationDetail} />
      <Route path="/developer/:developer" component={DeveloperDetail} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

export default App;
