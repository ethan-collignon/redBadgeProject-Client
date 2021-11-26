import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

type EateryInfo = {
    eateryName: string
    cost: number
    rating: number
    review: string
}

type Props = {
    sessionToken: string
    fetchEateryReview: () => void
    // campsite: any
}

export default class EateryCreate extends Component<Props, EateryInfo> {
    constructor(props: Props) {
        super(props)
        this.state = {
            eateryName: '',
            cost: 0,
            rating: 0,
            review: ''
        }
    }

    createEateryReview = (e: any) => {
        e.preventDefault();
        fetch("http://localhost:3000/eatery/create", {
            method: "POST",
            body: JSON.stringify({ eatery: { eateryName: this.state.eateryName, cost: this.state.cost, rating: this.state.rating, review: this.state.review }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                eateryName: '',
                cost: 0,
                rating: 0,
                review: ''
            });
            this.props.fetchEateryReview();
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <Form>
                <FormGroup>
                    <Label htmlFor='eateryName'>
                        <Input placeholder='Eatery Name' name='eateryName' type='text' value={this.state.eateryName} onChange={(e) => this.setState({eateryName: String (e.target.value)})}>
                        </Input>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='cost'>
                        <Input placeholder='Cost/ Night' name='cost' type='number' value={this.state.cost} onChange={(e) => this.setState({cost: Number(e.target.value)})}>
                        </Input>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='rating'>
                        <Input placeholder='Rating 1-5' name='rating' type='number' value={this.state.rating} onChange={(e) => this.setState({rating: Number(e.target.value)})}>
                        </Input>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='Review'>
                        <Input placeholder='Review' name='Review' type='textarea' value={this.state.review} onChange={(e) => this.setState({review: String(e.target.value)})}>
                        </Input>
                    </Label>
                </FormGroup>
            </Form>
            <Button onClick={(e) => {this.createEateryReview(e)}} type='submit'>Submit</Button>
            </div>
        )
    }
 }