const themeCssLink = document.querySelector("link[href='./styles/colors.css']")

function changeTheme(nameTheme){
    themeCssLink .href = `./themes/${nameTheme}.css`;

}