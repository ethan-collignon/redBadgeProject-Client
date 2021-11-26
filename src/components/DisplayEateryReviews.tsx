import React, { Component } from "react";
import { Table, Button } from "reactstrap";

type Props = {
    sessionToken: string
    eatery: Eatery[]
    fetchEateryReview: () => void
    updateEateryReview: (eatery: Eatery) => void
    id: string
    updateOn: () => void
}

type Eatery = {
    eateryName: string
    review: string
    cost: number
    rating: number
    id: string
}

export default class DisplayEateryReviews extends Component<Props, Eatery> {
    deleteReviews = (id: string) => {
        fetch(`http://localhost:3000/eatery/delete/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(() => this.props.fetchEateryReview())
    }

    reviewMapper = () => {
        return this.props.eatery.map((eatery, user) => {
            return (
                <tr key={user}>
                    <td>
                        <Button onClick={() => { this.props.updateEateryReview(eatery); this.props.updateOn() }}>Edit</Button>
                        <Button onClick={() => this.deleteReviews(eatery.id)}>Delete</Button>
                    </td>
                    <th>{eatery.id}</th>
                    <td>{eatery.eateryName}</td>
                    <td>{eatery.cost}</td>
                    <td>{eatery.rating}</td>
                    <td>{eatery.review}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <>
                <h3>Title</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>#</th>
                            <th>Eatery Name</th>
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