import React, { Component } from "react";
import { isEmpty } from "validator";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import checkIfUserIsAuth from "../utils/checkIsUserIsAuth";
import setAxiosAuthToken from "../utils/setAxiosAuthToken";
import "./Login.css";

export class Login extends Component {
  state = {
    email: "",
    emailError: "",
    emailOnFocus: false,
    password: "",
    passwordError: "",
    passwordOnFocus: false,
    canSubmit: true,
  };

  componentDidMount() {
    console.log(this.props);
    let isAuth = checkIfUserIsAuth();
    if (isAuth){
      this.props.history.push("/movie");
    }
  }
  
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (event.target.name === "email") {
          if (isEmpty(this.state.email)) {
            this.setState({
              emailError: "Email cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              emailError: "",
            });
          }
        }
        if (event.target.name === "password") {
          if (isEmpty(this.state.password)) {
            this.setState({
              passwordError: "Password cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.canSubmit === true) {
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0
        ) {
          this.setState({
            canSubmit: false,
          });
        } else {
          this.setState({
            canSubmit: true,
          });
        }
      }
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   //these are always the first two args. this func is run after component did mount and runs after state change
  //   if (prevState.isButtonDisabled === true) {
  //     //if the button was already disabled
  //     if (this.state.emailOnFocus && this.state.passwordOnFocus) {
  //       //and we had focus on these two fields
  //       if (
  //         //and there are no errors and there is something within these fields then
  //         this.state.emailError.length === 0 &&
  //         this.state.passwordError.length === 0 &&
  //         this.state.email &&
  //         this.state.password
  //       ) {
  //         this.setState({
  //           //enable the button
  //           isButtonDisabled: false,
  //         });
  //       }
  //     }
  //   }
  // }
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await Axios.post("/user/login", {
        email: this.state.email,
        password: this.state.password,
      });
      let jwtToken = result.data.payload;

      console.log(jwtToken);
      //setting jwt token to out Axios instance
      setAxiosAuthToken(jwtToken);

      let decodedToken = jwtDecode(jwtToken);
      console.log(decodedToken);

      this.props.handleUserLogin(decodedToken)
      window.localStorage.setItem("jwtToken", jwtToken);
      toast.success("Login success!");
      this.props.history.push("/movie");
    } catch (e) {
      if (e.response.status === 429) {
        toast.error(e.response.data);
      } else {
        toast.error(e.response.data.payload);
      }
    }
  };

  render() {
    const { email, emailError, password, passwordError, canSubmit } =
      this.state;
    return (
      <div className="container" style={{backgroundColor:'rgb(58 58 58)'}}>
        <div className="form-text">Login</div>
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleOnChange}
                  onFocus={this.handleInputOnFocus}
                  autoFocus
                />
                <div className="errorMessage">{emailError && emailError}</div>
              </div>
            </div>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onFocus={this.handleInputOnFocus}
                  onChange={this.handleOnChange}
                />
                <div className="errorMessage">
                  {passwordError && passwordError}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={canSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;