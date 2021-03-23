// PrivateRoute is a Route that is only accessible when logged in

import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

export const PrivateRoute = ({ to, children, ...props }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return <Route {...props} >
    {isAuthenticated ? children : <Redirect to={to || '/login'} />}
  </Route>
}