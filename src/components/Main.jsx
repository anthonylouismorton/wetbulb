import React from "react";
import Quicksearch from "./Quicksearch";
import Dashboard from "./Dashboard";
import WbgtHome from "./WbgtHome";
import { Routes, Route } from 'react-router-dom';


export default function Main(props) {
  return (
      <Routes>
        <Route
          path='/'
          element={<WbgtHome/>}
        />
        <Route
          path='/Home'
          element={<WbgtHome/>}
        />
        <Route
          path='/QuickSearch'
          element={<Quicksearch/>}
        />
        <Route
          path='/Dashboard'
          element={<Dashboard user={props.user}/>}
        />
      </Routes>
  )
}