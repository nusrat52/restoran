import React from "react";
import Navbar from "../general/navbar";
import Form from "./form"
  

const Index = () => (
  <div>
    <Navbar />

 
         <div className="create container">
          <h1 className="create__header">Sifariş əlavə et</h1>
      <Form sta="stt" />
      
        </div>
    </div>
);

export default Index;
