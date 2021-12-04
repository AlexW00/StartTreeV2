// ====================================================== //
// ==================== makeDraggable =================== //
// ====================================================== //

// helper method to make an element draggable, configured with DragOptions

let lastDropWasValid = false;
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
    lastDropWasValid = _isValidDropzone(
      JSON.parse(event.dataTransfer.getData("text"))
    );
    if (lastDropWasValid) {
      event.stopPropagation();
      callback("drop", event);
    }
  });

  const _isValidDropzone = (dropZone) => {
    // check if an element of dropzone.classlist is in the array dragOptions.classList
    return _isValid(dropZone, dragOptions.validDropzones);
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
