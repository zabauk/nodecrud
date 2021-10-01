import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';

function Users() {

    const [users, setUsers]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/users')
        .then((response)=>{
            setUsers(response.data);
        }).catch((error)=>{
            console.log(error.message);
        })
    }, [])
    return (
        <Fragment>
            <div>
                <h1>Users List</h1>
                {users.map((user, index)=>{
                    return <p>{user.name}</p>
                })}
            </div>
        </Fragment>
    )
}

export default Users
