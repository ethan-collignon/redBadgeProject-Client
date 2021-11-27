import React, { Component } from 'react';
import CampingCreate from '../components/CampingCreate';
import DisplayCampingReviews from '../components/DisplayCampingReviews';
import EditCampsiteReview from '../components/EditCampsiteReview';
import { Container } from 'reactstrap';


type CampingState = {
    campsite: []
    updatedReviews: {
        siteName: string
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

interface CampingInfo  {
    siteName: string
    cost: number
    rating: number
    review: string
    id: string
}

export default class Camping extends Component<Props, CampingState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            campsite: [],
            updateActive: false,
            updatedReviews: {
                siteName: '',
                cost: 0,
                rating: 0,
                review: '',
                id: '',

            }
            // this.deleteReviews = this.deleteReviews.bind(this)
        }
    }

    updateSiteReview = (campingInfo: CampingInfo) => {
        this.setState({ updatedReviews: campingInfo })
    }

    componentDidMount = () => {
        this.fetchCampReviews();
    }

    fetchCampReviews = () => {
        fetch(`http://localhost:3000/campsite/${this.props.userId}`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then(res => res.json())
            .then(data => {
                this.setState({ campsite: data })
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
                    <Container>
                    <div className="campingCreate">
                        <CampingCreate
                            sessionToken={this.props.sessionToken}
                            fetchCampReview={this.fetchCampReviews}/>
                            </div>
                            <div>
                        <DisplayCampingReviews
                            id={this.state.updatedReviews.id}
                            sessionToken={this.props.sessionToken}
                            campsite={this.state.campsite}
                            fetchCampReview={this.fetchCampReviews}
                            updateSiteReview={this.updateSiteReview}
                            updateOn={this.updateOn} />
                        {this.state.updateActive ?
                            <EditCampsiteReview
                                fetchCampReviews={this.fetchCampReviews}
                                sessionToken={this.props.sessionToken}
                                updateCampsite={this.state.updatedReviews}
                                updateOff={this.updateOff} /> : null}
                                </div>
                    </Container>
                </>
            </div>
        )
    }
}