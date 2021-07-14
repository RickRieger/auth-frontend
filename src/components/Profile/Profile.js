import React, { Component } from "react";
import UpdateProfile from "./UpdateProfile";
import "./Profile.css";
export class Profile extends Component {
  state = {
    friendFirstName: "",
    friendLastName: "",
    friendMobileNumber: "",
    friendArray: [],
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  };
  // componentDidMount() {
  //   this.handleGetAllFriends();
  // }
  // handleGetAllFriends = async () => {
  //   try {
  //     let getAllFriends = await Axios.get("/api/friend/get-all-friends");
  //     console.log(getAllFriends);
  //     this.setState({
  //       friendArray: getAllFriends.data.friends,
  //     });
  //   } catch (e) {
  //     toast.error(e.response.data.payload);
  //   }
  // };
  // handleOnFriendChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // handleUserInputOnChange = (event) => {
  //   this.setState(
  //     {
  //       [event.target.name]: event.target.value,
  //     },
  //   )
  // };

  render() {
    return (
      <div>
        <UpdateProfile
        handleUserLogout = {this.props.handleUserLogout} 
        history = {this.props.history} />
      </div>
    );
  }
}
export default Profile;