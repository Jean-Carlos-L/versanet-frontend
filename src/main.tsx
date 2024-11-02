import { createRoot } from "react-dom/client";
import store from "./common/redux/store.slice.ts";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
