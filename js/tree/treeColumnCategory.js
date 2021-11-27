import Button from "./edit/button.js";
import TreeItem from "./treeItem.js";
import Editor from "./edit/editor.js";

// ====================================================== //
// ================= TreeColumnCategory ================= //
// ====================================================== //

export default class TreeColumnCategory {
  constructor(bookmarkCategory, isEditing) {
    this.name = bookmarkCategory.cn;
    this.bookmarks = bookmarkCategory.b.map((bookmark) => {
      return new TreeItem(bookmark, isEditing);
    });
    this.isEditing = isEditing;
  }

  // returns a bookmark category with all bookmarks of that category
  html(appendPlus) {
    const column = document.createElement("li");

    // appends the plus button if it is the last category of the tree
    if (appendPlus && this.isEditing) {
      column.appendChild(appendPlus);
    }

    const h1 = document.createElement("h1");
    h1.innerHTML = this.name;
    column.appendChild(h1);

    const ul = document.createElement("ul");
    this.bookmarks.forEach((bookmark) => {
      ul.appendChild(bookmark.html());
    });
    column.appendChild(ul);

    //create new add button and append to end of category
    if (this.isEditing) {
      const addBookmarkButton = new Button("add").html();
      addBookmarkButton.style.paddingLeft = "1.5rem";
      addBookmarkButton.addEventListener("click", () => {
        // creates new bookmark element
        const newBookmark = new TreeItem(
            { n: "new bookmark", u: "" },
            this.isEditing
          ),
          newBookmarkHtml = newBookmark.html();
        ul.appendChild(newBookmarkHtml);

        const editor = new Editor(
          ul,
          newBookmark,
          ["cancel", "link"],
          true,
          (event) => {
            if (event.type === "save") {
              newBookmark.name = event.editResult.text;
              newBookmark.url = event.editResult.link ?? "#";
              this.bookmarks.push(newBookmark);
              ul.appendChild(newBookmark.html());
            } else if (event.type === "cancel") {
              console.log("cancel");
            }
          }
        );
      });
      column.appendChild(addBookmarkButton);
    }

    return column;
  }

  export() {
    return {
      cn: this.name,
      b: this.bookmarks.map((bookmark) => {
        return bookmark.export();
      }),
    };
  }
}
