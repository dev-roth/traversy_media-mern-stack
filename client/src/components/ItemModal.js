import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
} from "reactstrap";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
	state = {
		modal: false,
		// matches with form input name
		itemName: "",
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	onChange = (e) => {
		this.setState({
			// using the target´s name make it easy to extend (only state must be changed for new form inputs)
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		// prevent default behavior of a form submit (page reload)
		e.preventDefault();

		const newItem = {
			name: this.state.itemName,
		};

		this.props.addItem(newItem);

		// toggle (here: close) modal
		this.toggleModal();
	};

	render() {
		return (
			<div>
				<Button
					color="dark"
					style={{ marginBottom: "2em" }}
					onClick={this.toggleModal}
				>
					Add Item
				</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						Add to ShoppingList
					</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item"></Label>
								<Input
									type="text"
									name="itemName"
									id="itemName"
									placeholder="Add item"
									onChange={this.onChange}
								/>
								{/* submit button (last button in a form) */}
								<Button color="dark" style={{ marginTop: "2em" }} block>
									Add Item
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
