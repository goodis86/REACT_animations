import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

const animationTime = {   // this can define our different timing for enetering and exiting!!! 
  enter: 400,
  exit: 1000
};

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          className="Button"
          onClick={() =>
            this.setState((prevState) => ({ showBlock: !prevState.showBlock }))
          }
        >
          Toggle
        </button>
        <br />
        {/* {this.state.showBlock ? ( */}
        {/* transition element gives us 4 states (entering, entered, exiting, exited)
       of our element that we can control 
       depending on what stage we are in our transition
       this way we can control our DOM and still keep the animation using TRANSITION ELEMENT  */}
        <Transition
          in={this.state.showBlock}
          timeout={animationTime}
          mountOnEnter //TELLS US TO MOUNT OUR ELEMENT TO DOM ON ENTERING STAGE OF TRANSITION
          unmountOnExit // UNMOUNT OUR ELEMENT ONLY AFTER OUR TIMEOUT IS DONE
        >
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
              }}
            />
          )}
        </Transition>
        <Transition
          mountOnEnter
          unmountOnExit
          in={this.state.modalIsOpen}
          timeout={animationTime}
        >
          {(state) => <Modal show={state} closed={this.closeModal} />}
        </Transition>
        {/* ) : null} */}
        {/* conditional rendering will help with reactiveness, but limits our animations/effects
        because after rendering element, it gets cleared out from the DOM and we dont have an element to apply our closing animation in this case */}
        {this.state.modalIsOpen ? <Backdrop show /> : null};
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
