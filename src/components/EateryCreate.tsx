import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

interface EateryInfo  {
    eateryName: string
    cost: string
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
            cost: '',
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
                cost: '',
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
                <Form style={{ padding: "25px 25px 25px 25px", backgroundColor: "green", borderRadius: "5px" }}>
                <FormGroup>
                    <Label htmlFor='eateryName'>
                        <Input placeholder='Eatery Name' name='eateryName' type='text' value={this.state.eateryName} onChange={(e) => this.setState({eateryName: String (e.target.value)})}>
                        </Input>
                    </Label>
                </FormGroup>
                <FormGroup>
                        <Label htmlFor='cost'>Cost</Label>
                        <Input style={{borderRadius: "5px"}} placeholder='Cost/ Night' name='cost' type='select' value={this.state.cost} onChange={(e) => this.setState({ cost: String(e.target.value) })}>
                            <option>$</option>
                            <option>$$</option>
                            <option>$$$</option>
                            <option>$$$$</option>
                        </Input>
                        {/* <br /> */}
                        <Label htmlFor='rating'>Rating</Label>
                        <Input style={{borderRadius: "5px"}} placeholder='Rating 1-5' name='rating' type='select' value={this.state.rating} onChange={(e) => this.setState({ rating: Number(e.target.value) })}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='Review'>
                            <Input placeholder='Review' name='Review' type='textarea' value={this.state.review} onChange={(e) => this.setState({ review: String(e.target.value) })}>
                            </Input>
                        </Label>
                    </FormGroup>
            </Form>
            <Button onClick={(e) => {this.createEateryReview(e)}} type='submit'>Submit</Button>
            </div>
        )
    }
 }