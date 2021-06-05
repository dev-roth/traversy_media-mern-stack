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
	NavLink,
	Alert,
} from "reactstrap";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
	state = {
		modal: false,
		name: "",
		email: "",
		password: "",
		msg: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired,
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			if (error.id === "REGISTER_FAIL") {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}

		// Close modal, if authenticated
		if (this.state.modal) {
			if (isAuthenticated) {
				this.toggleModal();
			}
		}
	}

	toggleModal = () => {
		this.props.clearErrors();
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

		const { name, email, password } = this.state;

		// Create new user
		const user = {
			name,
			email,
			password,
		};

		// Attempt to register
		this.props.register(user);

		// Close modal
		// this.toggleModal();
	};

	render() {
		return (
			<div>
				<NavLink onClick={this.toggleModal} href="#">
					Register
				</NavLink>

				<Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
					<ModalBody>
						{this.state.msg && <Alert color="danger">{this.state.msg}</Alert>}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="name">Name</Label>
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="Name"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									className="mb-3"
									onChange={this.onChange}
								/>
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="mb-3"
									onChange={this.onChange}
								/>
								{/* submit button (last button in a form) */}
								<Button color="dark" style={{ marginTop: "2em" }} block>
									Register
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
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
	RegisterModal
);
