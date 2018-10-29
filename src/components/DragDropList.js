import React from "react";
import PropTypes from "prop-types";
import {AFTER, BEFORE} from "../constants/constants";

class DragDropList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};

        this.targetLocation = null;
        this.dragged = null;
        this.nodePlacement = "";
        this.rowElement = null;
        this.setRowElement = element => {
            this.rowElement = element;
        };
    }

    createPlaceHolder = (item, i) => {
        let placeholder = document.createElement("li");
        placeholder.className = "placeholder";
        placeholder.innerHTML = item;
        placeholder.dataset.id = i;
        this.placeholder = placeholder;
    };

    onMouseDown = e => {
        e.currentTarget.parentNode.draggable = true;
    };

    dragStart = e => {
        let {currentTarget} = e;
        e.dataTransfer.setData("text/html", currentTarget);

        this.dragged = currentTarget;
        this.createPlaceHolder(currentTarget.innerHTML, currentTarget.dataset.id);
    };

    dragEnd = e => {
        let parent = this.dragged.parentNode;
        parent.contains(this.placeholder) && parent.removeChild(this.placeholder);
        this.dragged.style.display = "block";

        // update state
        if (!this.targetLocation) return;

        const {state, dragged, targetLocation, nodePlacement} = this;

        let data = [...state.content],
            from = Number(dragged.dataset.id),
            to = Number(targetLocation.dataset.id);
        if (from < to) to--;
        if (nodePlacement === AFTER) to++;

        data.splice(to, 0, data.splice(from, 1)[0]);
        this.setState({content: data});
        dragged.removeAttribute("draggable");
    };

    dragOver = e => {
        e.preventDefault();
        this.dragged.style.display = "none";
        if (e.target.className !== "row") return;
        this.targetLocation = e.target;

        let relY = e.clientY - this.targetLocation.offsetTop,
            height = this.targetLocation.offsetHeight / 2,
            parent = e.target.parentNode;

        if (relY > height) {
            this.nodePlacement = AFTER;
            parent.insertBefore(this.placeholder, e.target.nextElementSibling);
        } else if (relY < height) {
            this.nodePlacement = BEFORE;
            parent.insertBefore(this.placeholder, e.target);
        }
    };

    render() {
        const listItems = this.state.content.map((item, i) => {
            return (
                <li className="row" data-id={i} key={i} onDragEnd={this.dragEnd} onDragStart={this.dragStart}>
                    {item}
                    <button className="icon" onMouseDown={this.onMouseDown} aria-label="Reorder"/>
                </li>
            );
        });

        return (
            <ul ref={this.setRowElement} onDragOver={this.dragOver}>{listItems}</ul>
        );
    }
}

DragDropList.propTypes = {
    content: PropTypes.array
};

DragDropList.defaultProps = {
    content: []
};

export default DragDropList;