import React, {Component} from 'react';
import CampingCreate from '../components/CampingCreate';

type Camping = {

}

type Props = {
 sessionToken: string
}

export default class CampingReview extends Component<Props, Camping> {
    constructor(props: Props){
        super(props)
        this.state = {
            CampingCreate
        }
    }

    componentDidMount = () => {
        this.fetchCampsiteReviews();
    }
}
