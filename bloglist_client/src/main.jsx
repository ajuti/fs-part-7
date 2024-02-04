import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

/**
 * Provider is used to 'provide' the store to its children.
 * It also sets the scope of dispatch
 */

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)
