import Router from "preact-router";

import Home from './pages/Home'
import Other from "./pages/Other";

export const MainRouter = ({ path = "/" }) => {
  return (
    <Router url={path}>
      <Home path="/" />
      <Other path="/other" />
    </Router>
  )
}
