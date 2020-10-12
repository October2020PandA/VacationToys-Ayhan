import React from 'react';
import {Router} from "@reach/router"
import Main from "./pages/Main"
import ReservationDetail from "./components/ReservationDetail"
import ReservationList from "./components/ReservationList"


function App() {
  return (
    <div>
      <Router>
        <Main path="/reservation/new" default/>
        <ReservationDetail path="/reservation/update/:id"/>
        <ReservationList path="/reservations"/>
      </Router>
    </div>
  );
}

export default App;
