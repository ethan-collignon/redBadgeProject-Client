import React from 'react';
import {Table, Button} from 'reactstrap';

type Props ={
    users: []
    deleteUsers: (id: string) => void  
}

type UserState = {
    firstName: string
    lastName: string
    email: string
    role: string
    id: string
}

const DisplayUsers = (props: Props) => {
    return (
       <div>
           <Table striped>
               <thead>
                   <tr>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th>Email</th>
                       <th>Role</th>
                   </tr>
               </thead>

               <tbody>
                   {props.users.map((user: UserState, key) => {
                       return(
                           <tr key={key}>
                               <td>{user.firstName}</td>
                               <td>{user.lastName}</td>
                               <td>{user.email}</td>
                               <td>{user.role}</td>
                               <td><Button onClick={() => props.deleteUsers(user.id)}>Delete</Button></td>
                           </tr>
                       )
                   })}
               </tbody>
           </Table>
       </div>
    )
}

export default DisplayUsers