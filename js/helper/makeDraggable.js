// keeps track of whether the last draggable element was dropped successfully or not
let lastDropWasValid = false;

export default (element, dragOptions, callback) => {
  element.draggable = true;
  element.classList.add("dropzone");

  element.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", dragOptions.data);
    event.currentTarget.classList.add("drag-item");
    callback("dragstart", event);
  });

  element.addEventListener("dragend", (event) => {
    event.preventDefault();
    // drop effect checks whether the last drop was on **any** dropzone
    // lastDropWasValid checks whether the last drop was on a **valid** dropzone (only gets set to true the drop event was actually fired)
    if (event.dataTransfer.dropEffect != "none" && lastDropWasValid) {
      callback("dragend", event);
    }
    event.currentTarget.classList.remove("drag-item");
  });

  element.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  element.addEventListener("dragenter", (event) => {
    event.preventDefault();
    if (_isValidDropzone(event.currentTarget)) {
      event.currentTarget.classList.add("drag-under-item");
      callback("dragenter", event);
    }
  });

  element.addEventListener("dragleave", (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("drag-under-item");
    callback("dragleave", event);
  });

  element.addEventListener("drop", (event) => {
    event.preventDefault();
    lastDropWasValid = _isValidDragItem(
      JSON.parse(event.dataTransfer.getData("text"))
    );
    if (lastDropWasValid) {
      const dropzone = event.currentTarget;
      dropzone.classList.remove("drag-under-item");
      callback("drop", event);
    }
  });

  const _isValidDropzone = (dropzone) => {
    return _isValid(dropzone, dragOptions.validDropzones);
  };

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
