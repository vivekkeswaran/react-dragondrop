import React from "react";
import PropTypes from "prop-types";

class DragDropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };

    this.rowElement = null;
    this.setrowElement = element => {
      this.rowElement = element;
    };
  }

  getPlaceHolderElement = (item, i) => {
    var placeholder = document.createElement("li");
    placeholder.className = "placeholder";
    placeholder.innerHTML = item;
    placeholder.dataset.id = i;
    return placeholder;
  };

  updateState = () => {
    var data = this.state.items;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ items: data });
  };

  onMouseDown = e => {
    e.currentTarget.parentNode.draggable = true;
  };

  dragStart = e => {
    this.dragged = e.currentTarget;
    e.dataTransfer.setData("text/html", this.dragged);
    this.placeholder = this.getPlaceHolderElement(
      this.dragged.innerHTML,
      this.dragged.dataset.id
    );
  };

  dragEnd = e => {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(this.placeholder);

    // update state
    this.updateState();
    this.dragged.removeAttribute("draggable");
  };

  dragOver = e => {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className !== "row") return;
    this.over = e.target;

    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(this.placeholder, e.target.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(this.placeholder, e.target);
    }
  };

  render() {
    var listItems = this.state.items.map((item, i) => {
      return (
        <li
          className="row"
          data-id={i}
          key={i}
          onDragEnd={this.dragEnd}
          onDragStart={this.dragStart}
        >
          {item}
          <button
            className="icon"
            onMouseDown={this.onMouseDown}
            aria-label="Reorder"
          />
        </li>
      );
    });

    return (
      <ul ref={this.setrowElement} onDragOver={this.dragOver}>
        {listItems}
      </ul>
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
