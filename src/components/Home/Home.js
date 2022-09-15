import React, { Component } from 'react'
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import jwtDecode from "jwt-decode";
import setAxiosAuthToken from "../utils/setAxiosAuthToken";
import "./Home.css";

export class Home extends Component {
  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await Axios.post("/user/login", {
        email: 'guestuser@gmail.com',
        password: 'Apple251#',
      });
      let jwtToken = result.data.payload;


      //setting jwt token to out Axios instance
      setAxiosAuthToken(jwtToken);

      let decodedToken = jwtDecode(jwtToken);


      this.props.handleUserLogin(decodedToken)
      window.localStorage.setItem("jwtToken", jwtToken);
      toast.success("Login success!");
      this.props.history.push("/movie");
    } catch (e) {
      console.log(e);
      // if (e.response.status === 429) {
      //   toast.error(e.response.data);
      // } else {
      //   toast.error(e.response.data.payload);
      // }
    }
  };
  render() {
    return (
      <div style={{textAlign: "center", marginTop: "15%", fontSize:"45px", color:'crimson'}}>
        <p>Welcome to the Movies with Friends</p>
        <button className='home_button' onClick={this.handleOnSubmit}>Enter as a guest</button>
      </div>
    )
  }
}

export default Home
