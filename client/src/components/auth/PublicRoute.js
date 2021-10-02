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

function PublicRoute({component: Component, ...rest}) {
    return (
        <Route { ...rest} render={props => (
            isAuthenticated()?<Redirect to="/" />:<Component { ...props} />
        )} />
    )
}

export default PublicRoute
