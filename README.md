<h1 align="center">Welcome to writer-for-playlist-club 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/punkthebucket" target="_blank">
    <img alt="Twitter: punkthebucket" src="https://img.shields.io/twitter/follow/punkthebucket.svg?style=social" />
  </a>
</p>

> Writer for Playlist Club.Web application that returns a copy-able and edit-able write-out of a selected Spotify Playlist. Utilizing TypeScript, querying the Spotify API via OAuth authorization. Even though this is available to use on the internet, due to how spotify's API works, I would have to add everyone who wanted to use the app's email to my list of approved users. See "Usage" to run locally. 

### ✨ [Demo](https://writer-for-playlist-club.netlify.app)
![gif](https://i.imgur.com/besJSIp.gif)

## Install

```sh
npm install
```

## Usage

```sh
npm run dev
```
To run this app locally with your own spotify developer app, you will have to:
1. Log in with your spotify account at https://developer.spotify.com/dashboard/login and create an app through the dashboard. 
2. Add your localhost callback to your application in spotify developer dashboard and replace the client_id in `src/authCodeWithPkce.ts`. 
3. `npm run dev`
4. share all of your playlists with friends on apple music. 


## Author

👤 **Brook Slagle**

* Website: https://brookslagle.com
* Twitter: [@punkthebucket](https://twitter.com/punkthebucket)
* Github: [@brook-slagle](https://github.com/brook-slagle)
* LinkedIn: [@brook-slagle](https://linkedin.com/in/brook-slagle)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_