import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkIfUserIsAuth from "../utils/checkIsUserIsAuth";

// Higher Order Component
const PrivateRoute = ({ component: Component, handleUserLogout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        checkIfUserIsAuth() ? (
          <Component {...routerProps} handleUserLogout={handleUserLogout} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default PrivateRoute;

//This is a version of a "higher order component" -the whole private route file above.








// const PrivateRoute = (props) => {
//   console.log(props);
//   return <Route exact path={props.path} component={props.component} />;
// };



// const PrivateRoute = (props) => {
//   console.log(props);
//   return (
//     <Route
//       exact
//       path={props.path}
//       render={() => <Movie />}
//       render={() => (props.user ? props.component : <Redirect to="/login" />)}
//     />
//   );
// };