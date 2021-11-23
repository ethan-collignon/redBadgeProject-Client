import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


type CampingInfo = {
    siteName: string
    cost: number
    rating: number
    review: string
}

type Props = {
    sessionToken: string
     fetchCampReview: () => void
    // campsite: any
}

export default class CampingCreate extends Component<Props, CampingInfo> {
    constructor(props: Props) {
        super(props)
        this.state = {
            siteName: '',
            cost: 0,
            rating: 0,
            review: ''
        }
    }

    createReview = (e: any) => {
        e.preventDefault();
        console.log("functionHit");
        console.log("state: ", this.state);
        console.log("props:", this.props)
        
        fetch("http://localhost:3000/campsite/create", {
            method: "POST",
            body: JSON.stringify({ campsite: { siteName: this.state.siteName, cost: this.state.cost, rating: this.state.rating, review: this.state.review } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    siteName: '',
                    cost: 0,
                    rating: 0,
                    review: ''
                });
                 this.props.fetchCampReview();
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
            <Form>
                <FormGroup>
                    <Label htmlFor='campsiteName'>
                        <Input placeholder='Campsite Name' name='campsiteName' type='text' value={this.state.siteName} onChange={(e) => this.setState({siteName: String (e.target.value)})}>
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
            <Button onClick={(e) => {this.createReview(e)}} type='submit'>Submit</Button>
            </div>
        )
    }
}

