import React, {Component} from 'react';
// import {Button} from 'reactstrap';
import DisplayUsers from '../components/DisplayUsers'

type Props = {
    sessionToken: string
    role: string
}

type AdminState = {
    users: []
    // userOn: boolean
}

export default class Admin extends Component<Props, AdminState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            users: []
            // userOn: false
        }
    }

    fetchAllUsers = () => {
        fetch(`http://localhost:3000/user/getUsers`,{
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                users: data
            })
            console.log(this.state.users);
        })
        .catch(err => console.log(err))
    }

    deleteUsers = (id: string) => {
        fetch(`http://localhost:3000/user/delete/:UserId`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then(res => res.json())
        .then(data => {
            this.fetchAllUsers();
        }).catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <>
                    <DisplayUsers users={this.state.users} deleteUsers={this.deleteUsers}/>
                </>
            </div>
        )
    }
}