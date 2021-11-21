import React, { Component } from 'react';
import {Table} from 'reactstrap'

type Retrieve = {

}

type Props = {
sessionToken: String
}

export default class GetCampingReviews extends Component<{}, Retrieve> {
    constructor(props: Props) {
        super(props)
        this.state = {
            campsites [],
        }
    }

    fetchCampReview = (e: any) => {
        e.preventDefault();
        fetch("http://localhost:3000/campsite/:id", {
            method: "GET",
            body: JSON.stringify({Campsite: [] }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.sessionToken}`
            })
        }).then(res => res.json())
        .then(data => {
            this.setState(data)
        })
        .catch(err => console.log(err));
    }

    displayCampReview = (props: props) => {
        return (
            props.campsiteReviews.map(props) => {
                return(
                <tr key={user}>
                    <td>
                        /*had delete/edit buttons here in blue badge*/
                    </td>
                    <th>
                        <td>{this.state.siteName}</td>
                        <td>{this.state.cost}</td>
                        <td>{this.state.rating}</td>
                        <td>{this.state.review}</td>
                    </th>
                </tr>
                )
            } 
        )
    }

    return(
        <>
        <h3>Review History</h3>
        <hr/>
        <Table >
            <thead>
                <tr>
                    <th>Edit</th>
                    <th className={"w-3"}>Campsite Name</th>
                    <th className={"w-3"}>Rating</th>
                    <th className={"w-10"}>Cost</th>
                    <th className={"w-15"}>Review</th>    
                </tr>
            </thead>
            <tbody>
                {displayCampReviews()}
            </tbody>
        </Table>
        </>
    )
}