import React, { Component } from "react";
import axios from "axios";
import Axios from "../utils/Axios";

export class MovieDetail extends Component {
  state = {
    Actors: "",
    Awards: "",
    Country: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Title: "",
    imdbID: "",
    isLoading: true,
    telInput: "",
    textareaIput: "",
    friendsArray: [],
    selectedFriendFirstName: "",
    selectedFriendLastName: "",
    selectedFriendID: "",
    selectedFriendMobileNumber: "",
    friendMessage: "",
    originalMessage: "",
  };

  async componentDidMount() {
    console.log('hello');
    this.fetchMovie();
    this.fetchAllFriends();
  }

  fetchAllFriends = async () => {
    try {
      let allFriends = await Axios.get("/api/friend/get-all-friends");

      this.setState({
        friendsArray: allFriends.data.friends,
      });
    } catch (e) {
      console.log(e);
    }
  };

  fetchMovie = async () => {
    try {
      let result = await axios.get(
        `https://omdbapi.com/?apikey=6332b1e1&t=${this.props.match.params.movieTitle}`
      );

      this.setState(
        {
          Actors: result.data.Actors,
          Awards: result.data.Awards,
          Country: result.data.Country,
          Plot: result.data.Plot,
          Poster: result.data.Poster,
          Rated: result.data.Rated,
          Ratings: result.data.Ratings,
          Title: result.data.Title,
          imdbID: result.data.imdbID,
          isLoading: false,
        },
        () => {
          this.setState({
            friendMessage: `I think this movie is dope. ${this.state.Title}, ${this.state.Actors} are in it. This is the plot ${this.state.Plot}`,
            originalMessage: `I think this movie is dope. ${this.state.Title}, ${this.state.Actors} are in it. This is the plot ${this.state.Plot}`,
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  showMovieDetail = () => {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <img src={this.state.Poster} alt={this.state.Title} />
        </div>
        <div>
          <div>Actors: {this.state.Actors}</div>
          <div>Awards: {this.state.Awards}</div>
          <div>Country: {this.state.Country}</div>
          <div>Plot: {this.state.Plot}</div>
          <div>Poster: {this.state.Poster}</div>
          <div>Rated: {this.state.Rated}</div>
          <div>
            Ratings:{" "}
            {this.state.Ratings.map((item) => {
              return (
                <span key={item.Source}>
                  {item.Source} {item.Value}
                </span>
              );
            })}
          </div>
          <div>Title: {this.state.Title}</div>
          <div>imdbID: {this.state.imdbID}</div>
        </div>
      </div>
    );
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let message = this.state.friendMessage;

      let result = await Axios.post("/api/twilio/send-sms", {
        to: this.state.selectedFriendMobileNumber,
        message: message,
      });

      console.log(result);
    } catch (e) {
      console.log(e.response);
    }
  };

  handleSelectChange = (event) => {
    // console.log(JSON.parse(event.target.value));
    // console.log(event.target.value);

    let selectedUser = JSON.parse(event.target.value);

    this.setState({
      selectedFriendFirstName: selectedUser.firstName,
      selectedFriendLastName: selectedUser.lastName,
      selectedFriendID: selectedUser._id,
      selectedFriendMobileNumber: selectedUser.mobileNumber,
      friendMessage: `Hey ${selectedUser.firstName}, ${this.state.originalMessage}`,
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          <div>
            {this.showMovieDetail()}

            <div style={{ width: 250, margin: "0 auto", textAlign: "center" }}>
              <select onChange={this.handleSelectChange}>
                <option>Select a friend</option>
                {this.state.friendsArray.map((friend) => {
                  return (
                    <option key={friend._id} value={JSON.stringify(friend)}>
                      {friend.firstName} {friend.lastName}
                    </option>
                  );
                })}
              </select>
              <textarea
                col="50"
                rows="20"
                defaultValue={this.state.friendMessage}
              />
              <br />
              <button onClick={this.handleFormSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetail














// import React, { Component } from 'react';
// import Axios from '../utils/Axios';
// import axios from 'axios';
// export class MovieDetail extends Component {
//   state = {
//     Actors: '',
//     Awards: '',
//     Country: '',
//     Plot: '',
//     Poster: '',
//     Rated: '',
//     Ratings: [],
//     Title: '',
//     imdbID: '',
//     isLoading: true,
//     number: '',
//     message: '',
//     buttonToggle: false,
//   };
//   async componentDidMount() {
//     console.log(this);
//     try {
//       let result = await axios.get(
//         `https://omdbapi.com/?apikey=6332b1e1&t=${this.props.match.params.movieTitle}`
//       );
//       this.setState({
//         Actors: result.data.Actors,
//         Awards: result.data.Awards,
//         Country: result.data.Country,
//         Plot: result.data.Plot,
//         Poster: result.data.Poster,
//         Rated: result.data.Rated,
//         Ratings: result.data.Ratings,
//         Title: result.data.Title,
//         imdbID: result.data.imdbID,
//         isLoading: false,
//       });
//       console.log(result);
//     } catch (e) {
//       console.log(e);
//     }
//   }


  
//   showMovieDetail = () => {
//     return (
//       <div style={{ display: 'flex' }}>
//         <div>
//           <img src={this.state.Poster} alt={this.state.Title} />
//         </div>
//         <div>
//           <div>Actors: {this.state.Actors}</div>
//           <div>Awards: {this.state.Awards}</div>
//           <div>Country: {this.state.Country}</div>
//           <div>Plot: {this.state.Plot}</div>
//           <div>Poster: {this.state.Poster}</div>
//           <div>Rated: {this.state.Rated}</div>
//           <div>
//             Ratings:{' '}
//             {this.state.Ratings.map((item) => {
//               return (
//                 <span key={item.Source}>
//                   {item.Source} {item.Value}
//                 </span>
//               );
//             })}
//           </div>
//           <div>Title: {this.state.Title}</div>
//           <div>imdbID: {this.state.imdbID}</div>
//         </div>
//       </div>
//     );
//   };
//   handleOnChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };
//   buttonToggle = () => {
//     this.setState({
//       buttonToggle: !this.state.buttonToggle,
//     });
//   };

//   onSubmit = async (event) => {
//     const ratings = this.state.Ratings.map((item) => {
//       return item.Source + item.Value;
//     });

//     let parsedPhoneNumber = this.state.number.split("-").join("");
//     console.log(parsedPhoneNumber);
//     try {
//       await Axios.post('/api/twilio/send-sms', {
//         message: `${this.state.message}
        
//           ${this.state.Title}

//           It is rated ${this.state.Rated}
          
//           This features ${this.state.Actors} 
          
//           The movie plot is as follows; 
          
//           ${this.state.Plot}.
          
//           Some of the awards this movie has received and nominated for are:
          
//           ${this.state.Awards}

//           If your concerned about the movie rating, it is rated ${ratings}
          
//           Click on the URL below to see the movie's poster!
//           ${this.state.Poster}`,
//         number:parsedPhoneNumber,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   render() {
//     return (
//       <div>
//         {this.state.isLoading ? (
//           <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             ...Loading
//           </div>
//         ) : (
//           this.showMovieDetail()
//         )}
//         <div
//           style={{
//             width: 500,
//             margin: '0 auto',
//             textAlign: 'center',
//             marginTop: '50px',
//           }}
//         >
//           {' '}
//           {this.state.buttonToggle ? (
//             <div>
//               <textarea
//                 type="text"
//                 placeholder="Input a message"
//                 name="message"
//                 onChange={this.handleOnChange}
//               />
//               <input
//                 type="tel"
//                 id="telInput"
//                 name="number"
//                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
//                 required
//                 placeholder="enter a friend #"
//                 onChange={this.handleOnChange}
//               />
//               <small>Format: 123-456-7890</small>
//             </div>
//           ) : (
//             ''
//           )}
//           {this.state.buttonToggle ? (
//             <button
//               onClick={() => {
//                 this.onSubmit();
//                 this.buttonToggle();
//               }}
//             >
//               submit
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 this.buttonToggle();
//               }}
//             >
//               send sms text
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
// export default MovieDetail;
