
![starttreebanner](https://user-images.githubusercontent.com/55558407/144808254-d5cb11e0-950d-4fd5-a47a-21572b2ff970.png)


# StartTreeV2

StartTreeV2 is a custom start page for your browser, also it's:

- 🆓 **Free**: hosted on Github pages
- 🔒 **Private**: no database, saved via url
- ⚡ **Lightweight**: zero dependencies

→ Start [HERE](https://alexw00.github.io/StartTreeV2/)

## Guides

<details>
  <summary>✏️ Configuring</summary>
  
  <br/>
  
  To enter edit mode, click on the cog icon in the top right corner.

  #### Adding elements
  
Click the (+) buttons to add new elements:

 <img src="https://user-images.githubusercontent.com/55558407/144808650-48c147ee-fcb0-4521-8c35-1e6ebdf31390.gif" alt="adding elements gif" height="400"> 


#### Editing elements

<details>
  <summary> Search engine URLs</summary>
  Google search url: <code>http://www.google.com/search?q=</code><br/>
  DuckDuckGo search url: <code>https://duckduckgo.com/?q=</code>
</details>
  
Click on elements you would like to edit:

 <img src="https://user-images.githubusercontent.com/55558407/144808770-7745d0e2-2a61-4c20-961a-ab97eaca9ef9.gif" alt="editing elements gif" height="400"> 

#### Moving elements
  
Drag and drop elements you would like to move:

 <img src="https://user-images.githubusercontent.com/55558407/144809074-4bc1c042-2b51-4d9e-8292-ac762c0c4aff.gif" alt="moving elements gif" height="400"> 
  
  
#### Saving your StartTree
  
Click on the top right check button to **copy** and **go** to your new URL.

  Pro tip: Use an url-shortener to shorten the link: [TinyUrl](https://tinyurl.com/app)

  <img src="https://user-images.githubusercontent.com/55558407/144816485-950816b1-6353-45d0-b50f-a440c6e69011.gif" alt="saving starttree" height="400"> 

</details>


<details>
  <summary>⚙ Setting as default</summary>
  
  <br/>
  
  Once you configured your StartTree and **copied** its URL, you can set it as your default browser page.
  
  #### 🦊 Firefox
  
  Set as **home page**: [Guide](https://support.mozilla.org/en-US/kb/how-to-set-the-home-page)
  
  Set as **new-tab page**: Download the extension [New Tab Override](https://addons.mozilla.org/de/firefox/addon/new-tab-override/) and set it as "custom url"

  #### 🔴 Chrome
  
  Set as **home page**: [Guide](https://support.google.com/chrome/answer/95314?hl=en&co=GENIE.Platform%3DAndroid)
  
  Set as **new-tab page**: Download the extension [Change new tab](https://chrome.google.com/webstore/detail/change-new-tab/mocklpfdimiadpbgamlgehpgpodggahe?hl=de) and set it as "URL  address"

  #### 🧭 Safari
  
  Set as **home/new-tab page**: [Guide](https://support.apple.com/de-de/guide/safari/ibrw1020/mac)
  
</details>


## Featured

<a href="https://www.producthunt.com/posts/starttreev2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-starttreev2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=327867&theme=dark" alt="StartTreeV2 - A $tree styled start page generator. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>


## Development

The current version is stable and tested in Firefox, Chrome and Safari.
If you want to contribute, feel free to make a pull request. Please keep it simple and lightweight.

<details>
  <summary>Adding themes</summary>
  
  1. Create a new .css file in [/themes](https://github.com/AlexW00/StartTreeV2/tree/master/themes), which follows the same structure as the existing ones (most of them were generated using [Pywal](https://github.com/dylanaraps/pywal)).
  
  2. Add a new entry **at the end** of the `THEMES` array in [theme-changer.js](https://github.com/AlexW00/StartTreeV2/blob/master/js/views/tree/themechanger/theme-changer.js)
  
  3. (make a pull request)
</details>

## Credits

StartTreeV2 is based on a static website generated using [StartTree](https://github.com/Paul-Houser/StartTree). Huge Thanks @Paul-Houser for creating such an awesome project!

How StartTreeV2 differs from StartTree:

The original version is a python program, which generates a static html page based on a yaml config.
This version is a website hosted on Github pages, which means you do not have to host it yourself. To configure your tree, I added a web editor, which allows editing the tree directly in the browser. That means you do not have to write a yaml config and recompile the page every time you want to make a change. Your configuration data is stored in the url, which you simply copy once you are done with your configuration.
