import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Bills from './pages/Bills';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Bills} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
