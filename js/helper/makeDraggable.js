// keeps track of whether the last draggable element was dropped successfully or not
let lastDropWasValid = false;
const nodeStack = [];
const highlightStack = [];
export default (element, dragOptions, callback) => {
  element.draggable = true;
  element.classList.add("dropzone");

  element.addEventListener("dragstart", (event) => {
    event.stopPropagation();
    event.dataTransfer.setData("text", dragOptions.data);
    callback("dragstart", event);
  });

  element.addEventListener("dragend", (event) => {
    event.preventDefault();
    if (event.dataTransfer.dropEffect != "none" && lastDropWasValid) {
      callback("dragend", event);
      event.stopPropagation();
    }
  });

  element.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    callback("dragover", event);
  });

  element.addEventListener("dragenter", (event) => {
    event.stopPropagation();
    event.preventDefault();
    callback("dragenter", event);
  });

  element.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    event.preventDefault();
    callback("dragleave", event);
  });

  // called when ANOTHER element is dropped on this element
  element.addEventListener("drop", (event) => {
    event.preventDefault();
    lastDropWasValid = _isValidDragItem(
      JSON.parse(event.dataTransfer.getData("text"))
    );
    if (lastDropWasValid) {
      event.stopPropagation();
      callback("drop", event);
    }
  });

  const _isValidDragItem = (dragItem) => {
    return _isValid(dragItem, dragOptions.validDragItems);
  };

  const _isValid = (element, classes) => {
    for (let i = 0; i < classes.length; i++) {
      if ([...element.classList].indexOf(classes[i]) > -1) {
        return true;
      }
    }
    return false;
  };
};
