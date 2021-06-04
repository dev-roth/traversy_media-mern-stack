import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Container } from "reactstrap";
import ItemModal from "./components/ItemModal";
import { loadUser } from "actions/authActions";

class App extends Component {

	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			// Provider makes the Redux store available to any nested components that need to acccess it.
			<Provider store={store}>
				<div className="App">
					<AppNavbar />
					<Container>
						<ItemModal />
						<ShoppingList />
					</Container>
				</div>
			</Provider>
		);
	}
}

export default App;
