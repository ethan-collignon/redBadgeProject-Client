import React, { Component } from 'react';
import EateryCreate from '../components/EateryCreate';
import DisplayEateryReviews from '../components/DisplayEateryReviews';
import EditEateryReview from '../components/EditEateryReview';
import { Container } from 'reactstrap';

type EateryState = {
    eatery: []
    updatedEateryReviews: {
        eateryName: string
        cost: number
        rating: number
        review: string
        id: string
    }
    updateActive: boolean
}

type Props = {
    sessionToken: string
    userId: number
    updateLocalStorage: (newToken: string) => void
    clearToken: () => void
}

interface EateryInfo {
    eateryName: string
    cost: number
    rating: number
    review: string
    id: string
}

export default class Eatery extends Component<Props, EateryState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            eatery: [],
            updateActive: false,
            updatedEateryReviews: {
                eateryName: '',
                cost: 0,
                rating: 0,
                review: '',
                id: ''
            }
        }
    }

    updateEateryReview = (eateryInfo: EateryInfo) => {
        this.setState({ updatedEateryReviews: eateryInfo })
    }

    componentDidMount = () => {
        this.fetchEateryReviews();
    }

    fetchEateryReviews = () => {
        fetch(`http://localhost:3000/eatery/${this.props.userId}`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then(res => res.json())
            .then(data => {
                this.setState({ eatery: data })
            })
            .catch(err => console.log(err));
    }

    updateOn = () => {
        this.setState({ updateActive: true })
    }

    updateOff = () => {
        this.setState({ updateActive: false })
    }

    render() {
        return (
            <div>
                <>
                <h3>Title</h3>
                <Container style={{backgroundColor: "green", borderRadius: "2px", justifyItems: "row"}}>
                
                        <DisplayEateryReviews
                            id={this.state.updatedEateryReviews.id}
                            sessionToken={this.props.sessionToken}
                            eatery={this.state.eatery}
                            fetchEateryReview={this.fetchEateryReviews}
                            updateEateryReview={this.updateEateryReview}
                            updateOn={this.updateOn} />
                        {this.state.updateActive ?
                            <EditEateryReview
                                fetchEateryReviews={this.fetchEateryReviews}
                                sessionToken={this.props.sessionToken}
                                updateEatery={this.state.updatedEateryReviews}
                                updateOff={this.updateOff} /> : null}
                                <br />
                             <EateryCreate
                            sessionToken={this.props.sessionToken}
                            fetchEateryReview={this.fetchEateryReviews}/>
                    </Container>
                </>
            </div>
        )
    }
}