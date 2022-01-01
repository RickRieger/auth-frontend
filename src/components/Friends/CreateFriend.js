import React, { Component } from "react";
import { toast } from "react-toastify";
import Friends from "./Friends";
import Axios from "../utils/Axios";
export class CreateFriend extends Component {
  state = {
    friendFirstName: "",
    friendLastName: "",
    friendMobileNumber: "",
    friendArray: [],
  };
  componentDidMount() {
    this.handleGetAllFriends();
  }
  handleOnFriendChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleFriendSubmit = async (event) => {
    event.preventDefault();
    try {
      let createdFriend = await Axios.post("/friend/create-friend", {
        firstName: this.state.friendFirstName,
        lastName: this.state.friendLastName,
        mobileNumber: this.state.friendMobileNumber,
      });
      this.setState({
        friendFirstName: "",
        friendLastName: "",
        friendMobileNumber: "",
        friendArray: [...this.state.friendArray, createdFriend.data],
      });
      toast.success("Friend Created!");
    } catch (e) {
      console.log(e);
      // toast.error(e.response.data.payload);
    }
  };
  handleGetAllFriends = async () => {
    try {
      let getAllFriends = await Axios.get("/friend/get-all-friends");
      this.setState({
        friendArray: getAllFriends.data.friends,
      });
      console.log(this.state.friendArray, 'array--');
    } catch (e) {
      console.log(e,'error man');
      // toast.error(e.response.data.payload);
    }
  };

  handleUpdatedFriendData = (updatedFriend) => {
   console.log(updatedFriend);
    let updatedFriendArray = this.state.friendArray.map(friend =>{

      if (friend._id === updatedFriend._id){
        friend = updatedFriend;
      }
      return friend;
    });
    
    this.setState({
      friendArray:updatedFriendArray,
    })
  };

  handleDeleteByFriend = (user) => {
    let newArray = this.state.friendArray.filter(
      (friend) => friend._id !== user._id
    );
    this.setState({
      friendArray: newArray,
    });
  };
  
  render() {
    return (
      <>
        <div className="update-container">
          <h3>Create Friend</h3>
          <form onSubmit={this.handleFriendSubmit}>
            <div className="input-div">
              <input
                placeholder="first name"
                onChange={this.handleOnFriendChange}
                name="friendFirstName"
                value={this.state.friendFirstName}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="last name"
                onChange={this.handleOnFriendChange}
                name="friendLastName"
                value={this.state.friendLastName}
              />
            </div>
            <div className="input-div">
              <input
                placeholder="mobile number"
                onChange={this.handleOnFriendChange}
                name="friendMobileNumber"
                value={this.state.friendMobileNumber}
              />
            </div>
            <div className="button-div">
              <button>Create Friend</button>
            </div>
          </form>
        </div>
        <hr />
        <Friends friendArray={this.state.friendArray} 
          handleUpdatedFriendData={this.handleUpdatedFriendData}
          handleDeleteByFriend={this.handleDeleteByFriend}
        />
      </>
    );
  }
}
export default CreateFriend;