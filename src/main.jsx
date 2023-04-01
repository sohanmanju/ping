import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GlobalStyles from "./GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<App />
		<GlobalStyles />
	</>,
);
