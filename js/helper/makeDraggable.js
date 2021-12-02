// keeps track of whether the last draggable element was dropped successfully or not
let lastDropWasValid = false;

export default (element, dragOptions, callback) => {
  const nodeStack = [];
  const highlightStack = [];
  element.draggable = true;
  element.classList.add("dropzone");

  const pushHighlight = (element) => {
    element.classList.add("drag-under-item");
    const currentHighlight = highlightStack.at(-1);
    if (currentHighlight) {
      currentHighlight.classList.remove("drag-under-item");
    }
    highlightStack.push(element);
  };

  const popHighlight = () => {
    const removedHighlight = highlightStack.pop();
    if (removedHighlight) removedHighlight.classList.remove("drag-under-item");

    const newHighlight = highlightStack.at(-1);
    if (newHighlight) newHighlight.classList.add("drag-under-item");
  };

  const tryPushHighlight = (element) => {
    if (_isValidDropzone(element)) {
      pushHighlight(element);
    }
  };

  const tryPopHighlight = (element) => {
    if (highlightStack.at(-1) === element) {
      popHighlight();
    }
  };

  const popNodeStack = () => {
    const removedNode = nodeStack.pop();
    tryPopHighlight(removedNode);
  };

  const pushNodeStack = (element) => {
    nodeStack.push(element);
    tryPushHighlight(element);
  };

  const checkBacktrack = (element) => {
    for (let i = nodeStack.length - 1; i >= 0; i--) {
      const topNode = nodeStack.at(-1);
      if (topNode === element) {
        return true;
      } else if (topNode.contains(element)) {
        pushNodeStack(element);
        return true;
      } else {
        popNodeStack();
      }
    }
    pushNodeStack(element);
    return false;
  };

  element.addEventListener("dragstart", (event) => {
    event.stopPropagation();
    event.dataTransfer.setData("text", dragOptions.data);
    event.currentTarget.classList.add("drag-item");
    //console.log("dragstart of " + event.currentTarget.classList);
    callback("dragstart", event);
  });

  element.addEventListener("dragend", (event) => {
    event.preventDefault();
    // drop effect checks whether the last drop was on **any** dropzone
    // lastDropWasValid checks whether the last drop was on a **valid** dropzone (only gets set to true the drop event was actually fired)
    if (event.dataTransfer.dropEffect != "none" && lastDropWasValid) {
      callback("dragend", event);
      event.stopPropagation();
      nodeStack.forEach((node) => {
        node.classList.remove("drag-under-item");
      });
    }
    event.currentTarget.classList.remove("drag-item");
  });

  element.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
  });

  element.addEventListener("dragenter", (event) => {
    event.stopPropagation();
    event.preventDefault();
    const isNewNode = checkBacktrack(event.target);
    //console.log("dragenter");
    //console.log(highlightStack);
    //console.log(nodeStack);
  });

  element.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    event.preventDefault();
    //console.log("dragleave");

    if (event.target === nodeStack.at(-1)) {
      popNodeStack();
    }
  });

  // called when ANOTHER element is dropped on this element
  element.addEventListener("drop", (event) => {
    event.preventDefault();
    lastDropWasValid = _isValidDragItem(
      JSON.parse(event.dataTransfer.getData("text"))
    );
    if (lastDropWasValid) {
      event.stopPropagation();
      const dropzone = event.currentTarget;
      dropzone.classList.remove("drag-under-item");
      //console.log("callback called");
      callback("drop", event);
    }
  });

  const _isValidDropzone = (dropzone) => {
    /* console.log(
      "checking dropzone " +
        dropzone.classList +
        " against vaild dropzones " +
        dragOptions.validDropzones
    ); */
    const r = _isValid(dropzone, dragOptions.validDropzones);
    //console.log(r);
    return r;
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
