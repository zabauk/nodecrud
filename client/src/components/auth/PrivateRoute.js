import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies=new Cookies();

const isAuthenticated=()=>{
    try {
        const token=cookies.get('token');
        if(token){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
    
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
       <Route { ...rest } render={props=>(
           isAuthenticated()?<Component {...props} />:<Redirect to="/login" />

       )} />
    )
}

export default PrivateRoute
