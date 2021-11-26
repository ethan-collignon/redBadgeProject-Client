import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";

type Props = {
    sessionToken: string
    updateEatery: UpdateReview
    fetchEateryReviews: () => void
    updateOff: () => void
}

type UpdateReview = {
    eateryName: string
    cost: number
    rating: number
    review: string
    id: string
}

export default class EditEateryReview extends Component<Props, UpdateReview> {
    constructor(props: Props) {
        super(props)
        this.state = {
            eateryName: this.props.updateEatery.eateryName,
            cost: this.props.updateEatery.cost,
            rating: this.props.updateEatery.rating,
            review: this.props.updateEatery.review,
            id: this.props.updateEatery.id
        }
    }

    updateEateryReview = (e: any) => {
        e.preventDefault();
        fetch(`http://localhost:3000/eatery/update/${this.props.updateEatery.id}`, {
            method: "PUT",
            body: JSON.stringify({
                eatery: {
                    eateryName: this.state.eateryName,
                    cost: this.state.cost,
                    rating: this.state.rating,
                    review: this.state.review,
                    id: this.state.id
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(res => res.json())
            .then(data => {
                this.props.fetchEateryReviews()
                this.props.updateOff()
            })

    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Edit Review</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.updateEateryReview}>
                        <FormGroup>
                            <Label htmlFor='eateryName'>
                                <Input placeholder='Eatery Name' name='EateryName' type='text' value={this.state.eateryName} onChange={(e) => this.setState({ eateryName: String(e.target.value) })}>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='cost'>
                                <Input placeholder='Cost/ Night' name='cost' type='number' value={this.state.cost} onChange={(e) => this.setState({ cost: Number(e.target.value) })}>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='rating'>
                                <Input placeholder='Rating 1-5' name='rating' type='number' value={this.state.rating} onChange={(e) => this.setState({ rating: Number(e.target.value) })}>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='Review'>
                                <Input placeholder='Review' name='Review' type='textarea' value={this.state.review} onChange={(e) => this.setState({ review: String(e.target.value) })}>
                                </Input>
                            </Label>
                        </FormGroup>
                    </Form>
                    <Button onClick={this.updateEateryReview} type='submit'>Submit</Button>
                    <Button onClick={this.props.updateOff}>Cancel</Button>
                </ModalBody>
            </Modal>
        )
    }
}
