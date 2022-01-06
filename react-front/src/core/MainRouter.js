import React from 'react';
import {Route , Routes} from "react-router-dom";
import Home from './Home';
import Signup from '../user/Signup';

const MainRouter = () => (
    <div>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={<Signup/>} />
        </Routes>
    </div>
);

export default MainRouter;