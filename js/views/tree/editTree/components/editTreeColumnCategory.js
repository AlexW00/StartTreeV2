import Button from "../../../other/button.js";
import EditTreeItem from "./editTreeItem.js";
import Editor from "../editor/components/editor.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import TreeUpdateEvent from "../events/treeUpdateEvent.js";
import DragOptions from "../../../../helper/dragOptions.js";
import makeDraggable from "../../../../helper/makeDraggable.js";
import TreeColumnCategory from "../../components/treeColumnCategory.js";

// ====================================================== //
// ================= EditTreeColumnCategory ============= //
// ====================================================== //

export default class EditTreeColumnCategory extends TreeColumnCategory {
  static count = 0;
  constructor(bookmarkCategory, onUpdate) {
    super(bookmarkCategory);
    this.onUpdate = onUpdate;
  }

  // ~~~~~~~ override parent methods ~~~~~~~ //

  initTreeItems(bookmarkConfig) {
    return bookmarkConfig.map((bookmark) => {
      return new EditTreeItem(bookmark, this.onBookmarkUpdate.bind(this));
    });
  }

  renderHtml() {
    super.renderHtml();
    this.root.appendChild(this.#newAddCategoryButton(this.bookmarkList));
    this.#makeDraggable();
    return this.root;
  }

  categoryTitleHtml() {
    const h1 = super.categoryTitleHtml();
    h1.addEventListener("click", () => {
      this.#categoryTitleClickListener(h1);
    });
    h1.appendChild(this.editButtonHtml());
    return h1;
  }

  // ~~~~~~~ EditTreeColumnCategory methods ~~~~~~~ //

  editButtonHtml() {
    const editButton = new Button("edit"),
      editButtonHtml = editButton.html();
    editButtonHtml.classList.add("category-name-edit-button");
    return editButtonHtml;
  }

  #makeDraggable = () => {
    const dragOptionsData = this.export();
    dragOptionsData.classList = ["category"];
    const dragOptions = new DragOptions({
      data: JSON.stringify(dragOptionsData),
      validDropzones: ["category", "bookmark"],
    });
    makeDraggable(this.root, dragOptions, (type, event) => {
      if (type === "drop") {
        this.#onDrop(event);
      } else if (type === "dragend") {
        this.#onDragEnd();
      }
    });
  };

  #onDragEnd = () => {
    this.#delete();
  };

  #delete() {
    this.root.remove();
    this.onUpdate(new TreeUpdateEvent({ type: "delete", updatedObject: this }));
  }

  #onDrop = (event) => {
    const dragItemData = JSON.parse(event.dataTransfer.getData("text"));

    const dragItemClass = dragItemData.classList[0];

    if (dragItemClass === "bookmark") this.#onDropBookmark(dragItemData);
    else if (dragItemClass === "category") this.#onDropCategory(dragItemData);
  };

  #onDropCategory(dragItemData) {
    const draggedItem = new EditTreeColumnCategory(
      { cn: dragItemData.cn, b: dragItemData.b },
      this.onUpdate
    );
    const draggedItemHtml = draggedItem.html();
    this.root.parentNode.insertBefore(draggedItemHtml, this.root);
    this.onUpdate(
      new TreeUpdateEvent({
        type: "add",
        updatedObject: this,
        newObject: draggedItem,
      })
    );
  }

  #onDropBookmark(dragItemData) {
    const draggedItem = new EditTreeItem(
      { n: dragItemData.n, u: dragItemData.u },
      this.onBookmarkUpdate.bind(this)
    );
    const draggedItemHtml = draggedItem.html();

    // prepend this item to the list
    const categoryList = this.root.querySelector("ul");
    this.treeItems.unshift(draggedItem);
    categoryList.insertBefore(
      draggedItemHtml,
      categoryList.querySelector(".bookmark")
    );
  }

  // TODO: create extra class for this??
  #newAddCategoryButton = (ul) => {
    const addBookmarkButton = new Button("add").html();
    addBookmarkButton.classList.add("add-bookmark-button");
    addBookmarkButton.style.paddingLeft = "1.5rem";
    addBookmarkButton.addEventListener("click", () => {
      // create new empty bookmark element
      const newBookmark = new EditTreeItem(
          { n: "new bookmark", u: "" },
          this.onBookmarkUpdate.bind(this)
        ),
        newBookmarkHtml = newBookmark.html();
      ul.appendChild(newBookmarkHtml);

      new Editor(
        ul,
        new editorTarget(newBookmark.name, "", newBookmark.id),
        new EditorOptions({
          buttons: ["cancel", "link"],
          openWithLinkInput: true,
        }),
        (editorFinishEvent) => {
          if (editorFinishEvent.type === "save") {
            // append new bookmark to end of list and push to array
            newBookmark.name = editorFinishEvent.editResult.text;
            newBookmark.url = editorFinishEvent.editResult.link ?? "#";
            this.treeItems.push(newBookmark);
            ul.appendChild(newBookmark.renderHtml());
          }
        }
      );
    });
    return addBookmarkButton;
  };

  #categoryTitleClickListener = (h1) => {
    new Editor(
      this.root,
      new editorTarget(this.name, null, h1.id),
      new EditorOptions({}),
      (editorFinishEvent) => {
        if (editorFinishEvent.type === "save") {
          // if the editor exits with "save", update the category name
          this.name = editorFinishEvent.editResult.text;
          h1 = this.categoryTitleHtml();
          this.root.insertBefore(h1, this.bookmarkList);
          this.onUpdate(
            new TreeUpdateEvent({ type: "save", updatedObject: this })
          );
        } else if (editorFinishEvent.type === "delete") {
          // if the editor exits with "delete", delete the category
          this.root.remove();
          this.onUpdate(
            new TreeUpdateEvent({ type: "delete", updatedObject: this })
          );
        } else {
          // if the editor exits with "cancel", only re-attach the category title
          this.root.insertBefore(h1, this.bookmarkList);
        }
      }
    );
  };

  // ~~~~~~~~~~~~~~ callbacks ~~~~~~~~~~~~~~ //

  onBookmarkUpdate(treeUpdateEvent) {
    if (treeUpdateEvent.type === "delete") {
      this.treeItems.splice(
        this.treeItems.indexOf(treeUpdateEvent.updatedObject),
        1
      );
    } else if (treeUpdateEvent.type === "add") {
      // add the bookmark to bookmarks after the updated object, if updated object isn't in listit will be added to the end
      const dragTargetIndex =
        this.treeItems.indexOf(treeUpdateEvent.updatedObject) ??
        this.treeItems.length;
      this.treeItems.splice(dragTargetIndex + 1, 0, treeUpdateEvent.newObject);
    }
  }
}
