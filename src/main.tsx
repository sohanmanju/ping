import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import GlobalStyles from "./global-styles";

ReactDOM.createRoot(document.getElementById("app") as Element).render(
	<>
		<App />
		<GlobalStyles />
	</>,
);