import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from './components/Login'

function App() {
  return (
    <Router>
      <div className="h-screen">
        <Switch>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
