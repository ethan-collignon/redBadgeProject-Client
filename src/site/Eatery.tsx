import React, { Component } from 'react';
import EateryCreate from '../components/EateryCreate';
import DisplayEateryReviews from '../components/DisplayEateryReviews';
import EditEateryReview from '../components/EditEateryReview';
import { Container } from 'reactstrap';

type EateryState = {
    eatery: []
    updatedEateryReviews: {
        eateryName: string
        cost: string
        rating: number
        review: string
        id: string
    }
    updateActive: boolean
}

type Props = {
    sessionToken: string | null
    userId: number
    updateLocalStorage: (newToken: string) => void
    clearToken: () => void
}

interface EateryInfo {
    eateryName: string
    cost: string
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
                cost: '',
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
            <div style={{ paddingTop: '30px' }}>
                <>
                    <h3>Eatery Review</h3>
                    <Container style={{ paddingTop: '15px', display: 'flex' ,justifyContent: 'center', paddingLeft: '0px'}}>
                        <div style={{ paddingRight: '40px' }}>
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
                                    </div>
                                    <div>
                            <EateryCreate
                                sessionToken={this.props.sessionToken}
                                fetchEateryReview={this.fetchEateryReviews} />
                        </div>
                    </Container>
                </>
            </div>
        )
    }
}