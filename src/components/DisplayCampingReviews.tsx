import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

type Props = {
    sessionToken: string
    campsite: Campsite[]
    fetchCampReview: () => void
    updateSiteReview: (campsite: Campsite) => void
    id: string
}

type Campsite = {
    siteName: string
    review: string
    cost: number
    rating: number
    id: string
}

export default class DisplayCampingReview extends Component<Props, Campsite> {
    //I dont think I need a constructor here
    deleteReviews = (id: string) => {
        console.log(id);
        
        fetch(`http://localhost:3000/campsite/delete/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(() => this.props.fetchCampReview())
    }

    reviewMapper = () => {
        return this.props.campsite.map((campsite, user) => {
            return (
                <tr key={user}>
                    <td>
                        <Button onClick={() => this.props.updateSiteReview(campsite)}>Edit</Button>
                        <Button onClick={() => this.deleteReviews(campsite.id)}>Delete</Button>
                    </td>
                    <th>{campsite.id}</th>
                    <td>{campsite.siteName}</td>
                    <td>{campsite.cost}</td>
                    <td>{campsite.rating}</td>
                    <td>{campsite.review}</td>
                </tr>
            )
        })
    }
    //Look at reactstrap modals
    //Render component as a button that pops up the modal
    //Insert component tag(that renders as a button) as the edit button


    render() {
    return(
        <>
        <h3>Title</h3>
        <Table>
            <thead>
                <tr>
                    <th>Edit</th>
                    <th>#</th>
                    <th>Campsite Name</th>
                    <th>Cost/Night</th>
                    <th>Rating</th>
                    <th>Review Entry</th>
                </tr>
            </thead>
            <tbody>
                {this.reviewMapper()}
            </tbody>
        </Table>
        </>
    )
    }
}

