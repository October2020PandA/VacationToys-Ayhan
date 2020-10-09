import React from 'react';
import {Router} from "@reach/router"
import Main from "./pages/Main"
import ReservationDetail from "./components/ReservationDetail"
import ReservationList from "./components/ReservationList"


function App() {
  return (
    <div>
      <Router>
        <Main path="/reservations" default/>
        <ReservationDetail path="/reservation/:id"/>
        <ReservationList path="reservations"/>
      </Router>
    </div>
  );
}

export default App;
