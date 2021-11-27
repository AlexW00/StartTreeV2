export default class Button {
  // types: add, delete, cancel
  constructor(type) {
    this.type = type;
    if (type === "add") {
      this.svg = `
      <svg width="20" class="icon" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 5V9H5V11H9V15H11V11H15V9H11V5H9ZM2 10C2 14.41 5.59 18 10 18C14.41 18 18 14.41 18 10C18 5.59 14.41 2 10 2C5.59 2 2 5.59 2 10Z" />
      </svg>
      `;
    } else if (type === "delete") {
      this.svg = `
        <svg width="24" class="icon" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z"/>
        </svg>
      `;
    } else if (type === "cancel") {
      this.svg = `
        <svg width="24" class="icon" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.364 0 0 5.364 0 12C0 18.636 5.364 24 12 24C18.636 24 24 18.636 24 12C24 5.364 18.636 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.70799 6.708 2.39999 12 2.39999C17.292 2.39999 21.6 6.70799 21.6 12C21.6 17.292 17.292 21.6 12 21.6ZM12 10.308L16.308 6L18 7.692L13.692 12L18 16.308L16.308 18L12 13.692L7.692 18L6 16.308L10.308 12L6 7.692L7.692 6L12 10.308Z" fill="#2F4B34"/>
        </svg> 
        `;
    } else if (type === "link") {
      this.svg = `
      <svg width="20" class="icon" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M9 8H5C3.35 8 2 6.65 2 5C2 3.35 3.35 2 5 2H9V0L5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8ZM15 0L11 0V2H15C16.65 2 18 3.35 18 5C18 6.65 16.65 8 15 8H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0ZM14 4H6V6H14V4Z"/>
      </svg>

      `;
    } else throw new Error("AddButton type must be add, delete, or cancel");
  }

  html = () => {
    const button = document.createElement("a");
    button.href = "#";
    button.classList.add("button");
    button.classList.add(this.type + "-button");
    button.innerHTML = this.svg;
    return button;
  };
}
