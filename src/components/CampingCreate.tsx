import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../helpers/environment'


interface CampingInfo {
    siteName: string
    cost: string
    rating: number
    review: string
}

type Props = {
    sessionToken: string | null
    fetchCampReview: () => void
}

export default class CampingCreate extends Component<Props, CampingInfo> {
    constructor(props: Props) {
        super(props)
        this.state = {
            siteName: '',
            cost: '',
            rating: 0,
            review: ''
        }
    }

    createReview = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/campsite/create`, {
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
                    cost: '',
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
                <Form style={{ padding: "25px 25px 25px 25px", backgroundColor: "#01730A", borderRadius: "10px", boxShadow: '10px 10px 10px black' }}>
                    <FormGroup>
                        <Label htmlFor='campsiteName'>
                            <Input style={{textAlign: 'center', backgroundColor: 'lightgray', width: "275px", boxShadow: "2px 2px 3px black"}} placeholder='Campsite Name' name='campsiteName' type='text' value={this.state.siteName} onChange={(e) => this.setState({ siteName: String(e.target.value) })}>
                            </Input>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{paddingRight: "7px", fontSize: "24px"}} htmlFor='cost'>Cost</Label>
                        <Input style={{borderRadius: "5px", backgroundColor: 'lightgray', fontSize: "20px"}} placeholder='Cost/ Night' name='cost' type='select' value={this.state.cost} onChange={(e) => this.setState({ cost: String(e.target.value) })}>
                            <option>N/A</option>
                            <option>$</option>
                            <option>$$</option>
                            <option>$$$</option>
                            <option>$$$$</option>
                        </Input>
                        <Label style={{paddingLeft: "75px",paddingRight: "7px", fontSize: "24px"}} htmlFor='rating'>Rating</Label>
                        <Input style={{borderRadius: "5px", backgroundColor: 'lightgray', paddingLeft: "10px", fontSize: "20px"}} placeholder='Rating 1-5' name='rating' type='select' value={this.state.rating} onChange={(e) => this.setState({ rating: Number(e.target.value) })}>
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
                            <Input style={{textAlign: 'center', backgroundColor: 'lightgray', width: '300px', height: '200px', boxShadow: "2px 2px 3px black"}} placeholder='Review' name='Review' type='textarea' value={this.state.review} onChange={(e) => this.setState({ review: String(e.target.value) })}>
                            </Input>
                        </Label>
                    </FormGroup>
                    <Button className="btn-lg btn-dark btn-block" onClick={(e) => { this.createReview(e) }} type='submit'>Submit</Button>
                </Form>

            </div>
        )
    }
}

