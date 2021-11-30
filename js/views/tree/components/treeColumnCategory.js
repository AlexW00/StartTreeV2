import Button from "../../other/button.js";
import TreeItem from "./treeItem.js";
import Editor from "../editor/components/editor.js";
import editorTarget from "../editor/helperObjects/editorTarget.js";
import EditorOptions from "../editor/helperObjects/editorOptions.js";
import TreeUpdateEvent from "../events/treeUpdateEvent.js";

// ====================================================== //
// ================= TreeColumnCategory ================= //
// ====================================================== //

export default class TreeColumnCategory {
  static count = 0;
  constructor(bookmarkCategory, isEditing, onUpdate) {
    TreeColumnCategory.count++;
    this.onUpdate = onUpdate;
    this.id = `category-${TreeColumnCategory.count}`;
    this.name = bookmarkCategory.cn;
    this.bookmarks = bookmarkCategory.b.map((bookmark) => {
      return new TreeItem(bookmark, isEditing, this.#onBookmarkUpdate);
    });
    this.isEditing = isEditing;
  }

  // returns a bookmark category with all bookmarks of that category
  html() {
    const column = document.createElement("li");
    this.root = column;
    column.setAttribute("id", this.id);
    column.classList.add("category");

    // append the category name as a h1 element
    column.appendChild(this.#newCategoryTitle());

    // create a ul of class "bookmarks", containing all bookmarks of that category
    const ul = document.createElement("ul");
    this.bookmarks.forEach((bookmark) => {
      ul.appendChild(bookmark.html());
    });
    column.appendChild(ul);

    //create new add button and append to end of category, if edit mode is on
    if (this.isEditing) column.appendChild(this.#newAddCategoryButton(ul));

    return column;
  }

  // TODO: create extra class for this??
  #newAddCategoryButton = (ul) => {
    const addBookmarkButton = new Button("add").html();
    addBookmarkButton.style.paddingLeft = "1.5rem";
    addBookmarkButton.addEventListener("click", () => {
      // create new empty bookmark element
      const newBookmark = new TreeItem(
          { n: "new bookmark", u: "" },
          this.isEditing,
          this.#onBookmarkUpdate
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
            this.bookmarks.push(newBookmark);
            ul.appendChild(newBookmark.html());
          }
        }
      );
    });
    return addBookmarkButton;
  };

  // creates a new h1 element with the category name and returns it
  #newCategoryTitle = () => {
    const h1 = document.createElement("h1");
    h1.setAttribute("id", this.id + "-header");
    h1.innerHTML = this.name;
    h1.addEventListener("click", (event) => {
      this.#categoryTitleClickListener(event, h1);
    });
    return h1;
  };

  // listener for category title h1
  #categoryTitleClickListener = (event, h1) => {
    const targetParent = event.target.parentElement;
    if (this.isEditing) {
      // creates new editor and attaches it to the parent element
      new Editor(
        targetParent,
        new editorTarget(this.name, null, h1.id),
        new EditorOptions({}),
        (editorFinishEvent) => {
          if (editorFinishEvent.type === "save") {
            // if the editor exits with "save", update the category name
            this.name = editorFinishEvent.editResult.text;
            h1.innerHTML = this.name;
            targetParent.insertBefore(h1, targetParent.querySelector("ul"));
            this.onUpdate(
              new TreeUpdateEvent({ type: "save", updatedObject: this })
            );
          } else if (editorFinishEvent.type === "delete") {
            // if the editor exits with "delete", delete the category
            targetParent.parentElement.removeChild(targetParent);
            this.onUpdate(
              new TreeUpdateEvent({ type: "delete", updatedObject: this })
            );
          } else {
            // if the editor exits with "cancel", only re-attach the category title
            targetParent.insertBefore(h1, targetParent.querySelector("ul"));
          }
        }
      );
    }
  };

  // callback for when a bookmark item is updated
  #onBookmarkUpdate = (treeUpdateEvent) => {
    if (treeUpdateEvent.type === "delete") {
      this.bookmarks.splice(
        this.bookmarks.indexOf(treeUpdateEvent.updatedObject),
        1
      );
    }
  };

  export() {
    return {
      cn: this.name,
      b: this.bookmarks.map((bookmark) => {
        return bookmark.export();
      }),
    };
  }
}
