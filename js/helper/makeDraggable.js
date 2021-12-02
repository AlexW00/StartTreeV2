// keeps track of whether the last draggable element was dropped successfully or not
let lastDropWasValid = false;
const nodeStack = [];
export default (element, dragOptions, callback) => {
  element.draggable = true;
  element.classList.add("dropzone");

  element.addEventListener("dragstart", (event) => {
    event.stopPropagation();
    event.dataTransfer.setData("text", dragOptions.data);
    event.currentTarget.classList.add("drag-item");
    console.log("dragstart of " + event.currentTarget.classList);

    callback("dragstart", event);
  });

  element.addEventListener("dragend", (event) => {
    event.preventDefault();
    // drop effect checks whether the last drop was on **any** dropzone
    // lastDropWasValid checks whether the last drop was on a **valid** dropzone (only gets set to true the drop event was actually fired)
    if (event.dataTransfer.dropEffect != "none" && lastDropWasValid) {
      callback("dragend", event);
      event.stopPropagation();
    }
    event.currentTarget.classList.remove("drag-item");
  });

  element.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
  });

  element.addEventListener("dragenter", (event) => {
    console.log("enter");
    event.preventDefault();

    const lastNode = nodeStack.at(-1);
    if (lastNode === undefined) {
      console.log("empty stack");
      nodeStack.push(event.currentTarget);
    } else if (
      lastNode.contains(event.target) &&
      !event.target.isEqualNode(lastNode)
    ) {
      console.log(event.target + " is contained in " + lastNode);
      nodeStack.push(event.target);
    } else if (
      !lastNode.contains(event.target) &&
      !event.target.isEqualNode(lastNode)
    ) {
      console.log(event.target + " is not a child of " + lastNode);
      let didUpdateNodeStack = false;
      for (let i = nodeStack.length - 1; i >= 0; i--) {
        console.log(nodeStack[i]);
        console.log(nodeStack[i].contains(event.target));
        console.log(event.target);

        if (event.target.isEqualNode(nodeStack[i])) {
          nodeStack.splice(i + 1, nodeStack.length - i);
          didUpdateNodeStack = true;
          break;
        } else if (nodeStack[i].contains(event.target)) {
          console.log("splicing");

          console.log(nodeStack.splice(i + 1, nodeStack.length - i));
          console.log(nodeStack);
          nodeStack.push(event.target);
          didUpdateNodeStack = true;
          break;
        } else {
          if (nodeStack[i].classList.contains("drag-under-item")) {
            nodeStack[i].classList.remove("drag-under-item");
          }
        }
      }
      //clear the stack
      if (!didUpdateNodeStack) {
        nodeStack.splice(0, nodeStack.length);
        nodeStack.push(event.target);
      }
    } else {
      console.log("same node");
    }

    if (_isValidDropzone(nodeStack.at(-1))) {
      nodeStack.at(-1).classList.add("drag-under-item");
      if (
        nodeStack.at(-2) &&
        nodeStack.at(-2).classList.contains("drag-under-item")
      ) {
        nodeStack.at(-2).classList.remove("drag-under-item");
      }
    }
    console.log(nodeStack);
  });

  element.addEventListener("dragleave", (event) => {
    const lastNode = nodeStack.at(-1);
    console.log("leave");
    event.preventDefault();
    event.stopPropagation();

    // if the node that is being left is the parent of the last node in the stack, don't remove it
    if (!event.target.contains(lastNode)) {
    } else if (event.target.isEqualNode(lastNode)) {
      nodeStack.pop();
      if (lastNode.classList.contains("drag-under-item")) {
        lastNode.classList.remove("drag-under-item");
      }
    }

    console.log("nodestack:");
    console.log(nodeStack);
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
      console.log("callback called");
      callback("drop", event);
    }
  });

  const _isValidDropzone = (dropzone) => {
    console.log(
      "checking dropzone " +
        dropzone.classList +
        " against vaild dropzones " +
        dragOptions.validDropzones
    );
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
