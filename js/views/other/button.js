// ====================================================== //
// ======================= Button ======================= //
// ====================================================== //

export default class Button {
  // possible values for type: "save", "cancel", "add" or "delete"
  constructor(type) {
    this.type = type;
    if (type === "add") {
      this.svg = `
      <svg width="20" class="icon, ${type}" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 5V9H5V11H9V15H11V11H15V9H11V5H9ZM2 10C2 14.41 5.59 18 10 18C14.41 18 18 14.41 18 10C18 5.59 14.41 2 10 2C5.59 2 2 5.59 2 10Z" />
      </svg>
      `;
    } else if (type === "delete") {
      this.svg = `
        <svg width="24" class="icon, ${type}" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z"/>
        </svg>
      `;
    } else if (type === "cancel") {
      this.svg = `
        <svg width="24" class="icon, ${type}" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.364 0 0 5.364 0 12C0 18.636 5.364 24 12 24C18.636 24 24 18.636 24 12C24 5.364 18.636 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.70799 6.708 2.39999 12 2.39999C17.292 2.39999 21.6 6.70799 21.6 12C21.6 17.292 17.292 21.6 12 21.6ZM12 10.308L16.308 6L18 7.692L13.692 12L18 16.308L16.308 18L12 13.692L7.692 18L6 16.308L10.308 12L6 7.692L7.692 6L12 10.308Z" fill="#2F4B34"/>
        </svg> 
        `;
    } else if (type === "link") {
      this.svg = `
      <svg width="20" class="icon, ${type}" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="filling" fill-rule="evenodd" clip-rule="evenodd" d="M9 8H5C3.35 8 2 6.65 2 5C2 3.35 3.35 2 5 2H9V0L5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8ZM15 0L11 0V2H15C16.65 2 18 3.35 18 5C18 6.65 16.65 8 15 8H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0ZM14 4H6V6H14V4Z"/>
      </svg>

      `;
    } else if (type === "export") {
      this.svg = `
      <svg width="36" class="icon, ${type}" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="check_circle_outline_24px">
         <path class="filling" id="icon/action/check_circle_outline_24px" fill-rule="evenodd" clip-rule="evenodd" d="M18 3C9.72 3 3 9.72 3 18C3 26.28 9.72 33 18 33C26.28 33 33 26.28 33 18C33 9.72 26.28 3 18 3ZM18 30C11.385 30 6 24.615 6 18C6 11.385 11.385 6 18 6C24.615 6 30 11.385 30 18C30 24.615 24.615 30 18 30ZM15 21.255L24.885 11.37L27 13.5L15 25.5L9 19.5L11.115 17.385L15 21.255Z"/>
        </g>
      </svg>
      `;
    } else if (type === "cancelExport") {
      this.svg = `
      <svg width="30"class="icon, ${type}" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" class="filling" clip-rule="evenodd" d="M15 0C6.705 0 0 6.705 0 15C0 23.295 6.705 30 15 30C23.295 30 30 23.295 30 15C30 6.705 23.295 0 15 0ZM15 27C8.385 27 3 21.615 3 15C3 8.385 8.385 3 15 3C21.615 3 27 8.385 27 15C27 21.615 21.615 27 15 27ZM15 12.885L20.385 7.5L22.5 9.615L17.115 15L22.5 20.385L20.385 22.5L15 17.115L9.615 22.5L7.5 20.385L12.885 15L7.5 9.615L9.615 7.5L15 12.885Z" />
      </svg>
  `;
    } else if (type === "edit") {
      this.svg = `
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="mode_24px">
        <path class="filling" id="icon/editor/mode_24px" fill-rule="evenodd" clip-rule="evenodd" d="M17.6588 3C17.4088 3 17.1487 3.10001 16.9587 3.28999L15.1288 5.12L18.8788 8.87L20.7087 7.03999C21.0988 6.64999 21.0988 6.02 20.7087 5.63L18.3687 3.28999C18.1688 3.09 17.9188 3 17.6588 3ZM14.0587 9.02L14.9788 9.94L5.91876 19H4.99875V18.08L14.0587 9.02ZM2.99875 17.25L14.0587 6.19L17.8087 9.94L6.74875 21H2.99875V17.25Z" fill-opacity="0.54"/>
        </g>
      </svg> 
      `;
    } else throw new Error("Unknown AddButton type");
  }

  html = () => {
    const button = document.createElement("div");

    button.classList.add("button");
    button.classList.add(this.type + "-button");
    button.innerHTML = this.svg;
    return button;
  };
}
