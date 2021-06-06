import React, { Component } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
} from "reactstrap";
import Logout from "./auth/Logout";
import RegisterModal from "./auth/RegisterModal";

class AppNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	render() {
		return (
			<div>
				{/* Known Bootstrap CSS classes are provided as React Components (e.g. .navbar, .nav-item,...) */}
				{/* Bootstrap <-> reactstrap is the same relation as Materialize <-> Material-UI */}
				<Navbar color="dark" dark expand="sm" className="mb-5">
					<Container>
						<NavbarBrand href="/">ShoppingList (Learn MERN Stack)</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" nvabar>
								<NavItem>
									<RegisterModal />
								</NavItem>
								<NavItem>
									<Logout />
								</NavItem>
								<NavItem>
									<NavLink href="https://github.com/MightyWalrus/traversy_media-mern-stack">
										Github (MightyWalrus)
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default AppNavbar;
