import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

type Props = {
    sessionToken: string
    updateCampsite: UpdateReview
    fetchCampReviews: () => void
    updateOff: () => void
}

interface UpdateReview  {
    siteName: string
    cost: number
    rating: number
    review: string
    id: string
}

export default class EditCampsiteReview extends Component<Props, UpdateReview> {
    constructor(props: Props) {
        super(props)
        this.state = {
            siteName: this.props.updateCampsite.siteName,
            cost: this.props.updateCampsite.cost,
            rating: this.props.updateCampsite.rating,
            review: this.props.updateCampsite.review,
            id: this.props.updateCampsite.id
        }
    }

    updateCampsiteReview = (e: any) => {
        e.preventDefault();
        fetch(`http://localhost:3000/campsite/update/${this.props.updateCampsite.id}`, {
            method: "PUT",
            body: JSON.stringify({
                campsite: {
                    siteName: this.state.siteName,
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
                this.props.fetchCampReviews()
                this.props.updateOff()
            })
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Edit Review</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.updateCampsiteReview}>
                        <FormGroup>
                            <Label htmlFor='campsiteName'>
                                <Input placeholder='Campsite Name' name='campsiteName' type='text' value={this.state.siteName} onChange={(e) => this.setState({ siteName: String(e.target.value) })}>
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
                    <Button onClick={this.updateCampsiteReview} type='submit'>Submit</Button>
                    <Button onClick={this.props.updateOff}>Cancel</Button>
                </ModalBody>
            </Modal>
        )
    }
}