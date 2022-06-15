import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "./redux/actions";
import Home from "./pages/home"
import Edit from "./pages/edit"
import Create from "./pages/create"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


 

 

function App () {
  const dispatch=useDispatch()
useEffect(() => {
 dispatch(getOrders())
}, [])



  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}>
         </Route>
        <Route path="/create" element={<Create/>}>
        </Route>
        <Route path="/edit/:id" element={<Edit/>}>
       </Route>
    </Routes>
  </BrowserRouter>
 
  );
}

export default App;
