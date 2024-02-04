import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import store from "./store"
import { Provider } from "react-redux"

/**
 * Provider is used to 'provide' the store to its children.
 * It also sets the scope of dispatch
 */

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider> 
)
