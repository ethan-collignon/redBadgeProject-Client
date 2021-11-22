// import React, { Component } from 'react';
// import { Table } from 'reactstrap'
// import CampingReview from '../site/CampingReviews';

// type Retrieve = {
//     campsite: []
// }

// type Props = {
//     sessionToken: string
// }

// type Review = {
//     siteName: string
//     cost: number
//     rating: number
//     review: string

// }

// export default class GetCampingReviews extends Component<Props, Retrieve> {
//     constructor(props: Props) {
//         super(props)
//         this.state = {
//             campsite: [],

//         }
//     }
//     fetchCampReview = () => {
//         // e.preventDefault();
//         fetch("http://localhost:3000/campsite/:id", {
//             method: "GET",
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `${this.props.sessionToken}`
//             })
//         }).then(res => res.json())
//             .then(data => {
//                 this.setState({ campsite: data })
//             })
//             .catch(err => console.log(err));
//     }

//     displayCampReview = () => {
//         this.state.campsite.map((site: Review) => {
//             return (
//                 <tr>
//                     <td>
//                     </td>
//                     <th>
//                         <td>{site.siteName}</td>
//                         <td>{site.cost}</td>
//                         <td>{site.rating}</td>
//                         <td>{site.review}</td>
//                     </th>
//                 </tr>
//             )
//         }

//       )
//     }

//     render() {
//         return (
//             <>
//                 <h3>Review History</h3>
//                 <hr />
//                 <Table >
//                     <thead>
//                         <tr>
//                             <th>Edit</th>
//                             <th className={"w-3"}>Campsite Name</th>
//                             <th className={"w-3"}>Rating</th>
//                             <th className={"w-10"}>Cost</th>
//                             <th className={"w-15"}>Review</th>
//                         </tr>
//                     </thead>
//                     {/* <tbody>
//                         {displayCampReviews()}
//                     </tbody> */}
//                 </Table>
//             <CampingReview fetchReview={this.fetchCampReview} sessionToken={this.props.sessionToken}/>
//             </>
//         )
//     }
// }

export {}