import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  
  } from "react-router-dom";

  import Login from './Login';
  import SignUp from './SignUp';

  

  
  export default function Navigation() {
    return (
        <BrowserRouter>
            

            <Routes>
               
                <Route path="/" element={<Login/>}/>
                <Route path="/ragister" element={<SignUp/>}/>
                

            </Routes>
        </BrowserRouter>
    )
  }
  