import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

class ShoppingList extends Component {
  state = {
    // dummy entries
    items: [
      { id: uuidv4(), name: "Eggs" },
      { id: uuidv4(), name: "Milk" },
      { id: uuidv4(), name: "Coffee" },
    ],
  };
  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2em" }}
          onClick={() => {
            const name = prompt("Enter Item");
            if (name) {
              this.setState((state) => ({
                items: [...state.items, { id: uuidv4(), name }],
              }));
            }
          }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.setState((state) => ({
                        // filter not currently selected item, therefore delete currently selected item
                        items: state.items.filter((item) => item.id !== id),
                      }));
                    }}
                  >
                    &times;
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

export default ShoppingList;
