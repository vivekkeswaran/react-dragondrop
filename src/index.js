import React from "react";
import ReactDOM from "react-dom";
import DragDropList from "./DragDropList";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ["Red", "Green", "Blue", "Yellow", "Black", "White", "Orange"]
    };
  }
  render() {
    return (
      <div className="App">
        <DragDropList items={this.state.colors} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
