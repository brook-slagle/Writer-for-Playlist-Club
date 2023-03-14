// Because this is a literal single page application
// we detect a callback from Spotify by checking for the hash fragment
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "9eb8b4498bcd4fccbd1ce70c4aab735d";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const playlists = await fetchPlaylists(accessToken)
    populateUI(profile);
    populatePlaylists(accessToken, playlists)
}

async function fetchProfile(code: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });
    console.log(result)
    return await result.json();
}

async function fetchPlaylists(code: string): Promise<Playlists> {
    const result = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
        method: "GET", headers:  { Authorization: `Bearer ${code}` }
    });
    console.log(result)
    return await result.json();
}

async function fetchPlaylistTracks(code: string, id: string): Promise<PlaylistTracks> {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?fields=items.track(name,artists)`, {
        method: "GET", headers:  { Authorization: `Bearer ${code}` }
    });
    console.log(result)
    return await result.json();
}

function populateUI(profile: UserProfile) {
    document.getElementById("displayName")!.innerText = profile.display_name;
    document.getElementById("avatar")!.setAttribute("src", profile.images[0].url)
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.href;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0].url;
}

function populatePlaylists(accessToken: string, playlists: Playlists) {
    const list = document.getElementById("playlist-selector")

    playlists.items.forEach(playlist => {
        if(playlist.name.includes("Week")) {
            const elemName = document.createElement('li');
            elemName.innerHTML = `<a href="#">${playlist.name}</a>`
            elemName.addEventListener('click', () => populatePrintOut(accessToken, playlist.id))
            list?.appendChild(elemName)
        }
    });
}

async function populatePrintOut(accessToken: string, id: string) {
    console.log("populating...")
    const playlist: PlaylistTracks = await fetchPlaylistTracks(accessToken, id)
    console.log(playlist)
    const writeOut = document.getElementById('print-out')
    writeOut?.appendChild(document.createElement('hr'))

    playlist.items.forEach(song => {
        const songWrite = document.createElement('li')
        const artistsArrObject = song.track.artists
        let artistsArr: string[] = []
        artistsArrObject.forEach(artist => {
            artistsArr = [...artistsArr, artist.name] 
        })
        const artists = artistsArr.join(", ")
        songWrite.innerHTML = `${song.track.name} - ${artists}`
        writeOut?.appendChild(songWrite)
    })
}