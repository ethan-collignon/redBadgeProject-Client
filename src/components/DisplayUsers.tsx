import React from 'react';
import { Table, Button } from 'reactstrap';

type Props = {
    users: []
    deleteUsers: (id: string) => void
}

interface UserState  {
    firstName: string
    lastName: string
    email: string
    role: string
    id: string
}

const DisplayUsers = (props: Props) => {
    return (
        <div>
            <Table dark hover responsive/*striped hover variant="dark"*/style={{width: '100%', height: '100%', borderRadius: "10px"}}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Delete?</th>
                    </tr>
                </thead>

                <tbody>
                    {props.users.map((user: UserState, key) => {
                        return (
                            <tr key={key}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><Button style={{backgroundColor: '#9C1018'}} className="btn-md btn-dark btn-block" onClick={() => props.deleteUsers(user.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg></Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default DisplayUsers