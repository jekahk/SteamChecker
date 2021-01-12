# ![Steam Checker](https://github.com/jekahk/SteamChecker/blob/master/src/images/headerlogo.png?raw=true)

[Steam Checker](https://steam-checker-93cde.web.app/) is an web application that lets the user search information about a specific Steam profile by Steam profile ID or url. It will show the profile name, picture, level, number of badges, experience points and how much XP needed for level up.

The website is coded with React.js with [Material-UI](https://material-ui.com/) library and gets the profile information from an API with [Axios](https://www.npmjs.com/package/axios). The API is also made by me. More info about that [here](https://github.com/jekahk/SteamCheck_API). The application sends the ID or url to the API and gets back an object containing the profile information. If ID/url is invalid or the profile is private the application shows that.

## Examples

Public profile:
![NonBlocked](https://i.gyazo.com/28527048d7fbc9541ed7fe3e4138dabf.png)

Private profile:
![private](https://i.gyazo.com/1aed12e5407a1f72b805958b1eef0551.png)
