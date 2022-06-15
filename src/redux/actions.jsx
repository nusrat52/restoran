import axios from "axios";
import * as actionTypes from "./actionTypes"
import {Agent} from "../api/agent"





export const getOrders = () => {
  return (dispatch) => {
    Agent.getOrders()
      .then((res) => {
          
          dispatch({
            type: actionTypes.GET_ORDERS,
            payload:res.sifarishler
         });
      });
  };
};

export const addOrder = (order) => {
 return {
    type: actionTypes.ADD_ORDERS,
    payload:order
 }
};

 
export const putOrder = (order) => {
  return {
     type: actionTypes.PUT__ORDER,
     payload:order
  }
 };