import React from "react";
import ReactDOM from "react-dom";
import DragDropList from "./components/DragDropList";
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
                <div className="content">
                    <h1>Drag and drop with React</h1>
                    <h2>Sort the items</h2>
                    <p id='help'>Activate the reorder button and use mouse to drag/reorder.</p>
                    <div className="wrapper">
                        <DragDropList content={this.state.colors}/>
                    </div>
                </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
