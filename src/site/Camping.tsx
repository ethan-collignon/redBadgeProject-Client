import React, {Component} from 'react';
import CampingCreate from '../components/CampingCreate';
import DisplayCampingReviews from '../components/DisplayCampingReviews';
// import UpdateReviews from './updatereviews'

type CampingState = {
    campsite: [] 
    updatedReviews: {} 
}

type Props = {
 sessionToken: string
 userId: number
}

type CampingInfo = {
    siteName: string
    cost: number
    rating: number
    review: string
    id: string
}

export default class Camping extends Component<Props, CampingState> {
    constructor(props: Props){
        super(props)
        this.state = {
            campsite: [],
            updatedReviews: {
                siteName: '',
                cost: 0,
                rating: 0,
                review: '',
                id: ''
            }
            // this.deleteReviews = this.deleteReviews.bind(this)
        }
    }

    updateSiteReview = (campingInfo: CampingInfo) => {
        this.setState({updatedReviews: campingInfo})
    }

    componentDidMount = () => {
        this.fetchCampReviews();
    }

    fetchCampReviews = () => {
        // e.preventDefault();
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

    render(){
        return(
            <div>
                <>
                <CampingCreate sessionToken={this.props.sessionToken}/>
                <DisplayCampingReviews 
                id={this.props.sessionToken} 
                sessionToken={this.props.sessionToken}
                campsite={this.state.campsite}
                fetchCampReview={this.fetchCampReviews}
                updateSiteReview={this.updateSiteReview}/>
                {/* updatedReviews={this.updateSiteReview}
                deleteReviews={this.deleteReviews}
                fetchReviews={this.fetchCampReview} */}
                </>
            </div>
        )
    }
}

