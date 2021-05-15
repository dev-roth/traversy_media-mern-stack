import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import { getItems, deleteItem } from "../actions/itemActions";

class ShoppingList extends Component {

	componentDidMount() {
		this.props.getItems();
	}

	onDeleteClick = (id) => {
		this.props.deleteItem(id);
	};

	render() {
		const { items } = this.props.item;
		return (
			<Container>
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ _id, name }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
									<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={this.onDeleteClick.bind(this, _id)}
									>
										&times; {/* "X" */}
									</Button>
									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

// PropTypes provides some level of static typing
ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
};

// maps the central Redux state (resp. parts of it) to the React Components Props ("read access")
const mapStateToProps = (state) => ({
	item: state.item,
});

// Connects the React component to a Redux store.
// It provides its connected component with the pieces of the data it needs from the store (store == state => component props)
// and the functions the component can use to dispatch actions to the store (component props == actions => store).
// connect() actually returns a wrapper function that in most cases is called right away with the component being connected to the store.
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
