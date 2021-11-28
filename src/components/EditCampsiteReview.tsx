import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

type Props = {
    sessionToken: string
    updateCampsite: UpdateReview
    fetchCampReviews: () => void
    updateOff: () => void
}

interface UpdateReview {
    siteName: string
    cost: string
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
            <Modal style={{ padding: "25px 25px 25px 25px", backgroundColor: "#01730A", borderRadius: "10px", textAlign: 'center' }} isOpen={true}>
                <ModalHeader style={{backgroundColor: 'lightgray', justifyContent: 'center'}}>Edit Review</ModalHeader>
                <ModalBody style={{backgroundColor: 'lightgray'}}>
                    <Form style={{backgroundColor: 'lightgray'}} onSubmit={this.updateCampsiteReview}>
                        <FormGroup >
                            <Label htmlFor='campsiteName'>
                                <Input style={{textAlign: 'center', width: "275px"}} placeholder='Campsite Name' name='campsiteName' type='text' value={this.state.siteName} onChange={(e) => this.setState({ siteName: String(e.target.value) })}>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label style={{paddingRight: "7px", fontSize: "15px"}} htmlFor='cost'>Cost</Label>
                                <Input style={{borderRadius: "5px", fontSize: "20px"}} placeholder='Cost/ Night' name='cost' type='select' value={this.state.cost} onChange={(e) => this.setState({ cost: String(e.target.value) })}>
                                    <option>$</option>
                                    <option>$$</option>
                                    <option>$$$</option>
                                    <option>$$$$</option>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label style={{paddingLeft: "1px",paddingRight: "7px", fontSize: "15px"}} htmlFor='rating'>Rating</Label>
                                <Input style={{borderRadius: "5px", paddingLeft: "10px", fontSize: "20px"}} placeholder='Rating 1-5' name='rating' type='select' value={this.state.rating} onChange={(e) => this.setState({ rating: Number(e.target.value) })}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='Review'>
                                <Input style={{textAlign: 'center', width: '350px', height: '150px'}} placeholder='Review' name='Review' type='textarea' value={this.state.review} onChange={(e) => this.setState({ review: String(e.target.value) })}>
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