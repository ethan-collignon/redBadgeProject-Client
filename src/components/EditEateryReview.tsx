import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";

type Props = {
    sessionToken: string | null
    updateEatery: UpdateReview
    fetchEateryReviews: () => void
    updateOff: () => void
}

interface UpdateReview {
    eateryName: string
    cost: string
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

    updateEateryReview = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <Modal style={{ padding: "25px 25px 25px 25px", backgroundColor: "#028261", borderRadius: "10px", textAlign: 'center' }} isOpen={true}>
                <ModalHeader style={{ backgroundColor: 'lightgray', justifyContent: 'center' }}>Edit Review</ModalHeader>
                <ModalBody style={{ backgroundColor: 'lightgray' }}>
                    <Form style={{ backgroundColor: 'lightgray' }} >
                        <FormGroup>
                            <Label htmlFor='eateryName'>
                                <Input style={{ textAlign: 'center', width: "275px" }} placeholder='Eatery Name' name='EateryName' type='text' value={this.state.eateryName} onChange={(e) => this.setState({ eateryName: String(e.target.value) })}>
                                </Input>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label style={{ paddingRight: "7px", fontSize: "15px" }} htmlFor='cost'>Cost</Label>
                            <Input style={{ borderRadius: "5px", fontSize: "20px" }} placeholder='Cost/ Night' name='cost' type='select' value={this.state.cost} onChange={(e) => this.setState({ cost: String(e.target.value) })}>
                                <option>N/A</option>
                                <option>$</option>
                                <option>$$</option>
                                <option>$$$</option>
                                <option>$$$$</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label style={{ paddingLeft: "1px", paddingRight: "7px", fontSize: "15px" }} htmlFor='rating'>Rating</Label>
                            <Input style={{ borderRadius: "5px", paddingLeft: "10px", fontSize: "20px" }} placeholder='Rating 1-5' name='rating' type='select' value={this.state.rating} onChange={(e) => this.setState({ rating: Number(e.target.value) })}>
                                <option>0</option>
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
                    <Button onClick={this.updateEateryReview} type='submit'>Submit</Button>
                    <Button onClick={this.props.updateOff}>Cancel</Button>
                </ModalBody>
            </Modal>
        )
    }
}
