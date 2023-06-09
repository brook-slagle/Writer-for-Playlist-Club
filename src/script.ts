// Because this is a literal single page application
// we detect a callback from Spotify by checking for the hash fragment
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "9eb8b4498bcd4fccbd1ce70c4aab735d";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
main()


async function main() {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        const playlists = await fetchPlaylists(accessToken)
        populateUI(profile);

        // playlists
        const list = document.getElementById("playlist-selector")!
        const searchInput = document.getElementById("searchInput") as HTMLInputElement;
        const searchTerm = searchInput.value;
        populatePlaylists(accessToken, playlists, searchTerm, list) // inital populate

        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value;
            populatePlaylists(accessToken, playlists, searchTerm, list)
        }) // event listener to populate when the search bar receives input


    } 
}

async function fetchProfile(code: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });
    console.log('fetchProfile: ', result)
    return await result.json();
}

async function fetchPlaylists(code: string): Promise<Playlists> {
    const result = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
        method: "GET", headers:  { Authorization: `Bearer ${code}` }
    });
    console.log(result)
    return await result.json(); 
}

async function fetchPlaylist(code: string, id: string): Promise<Playlist> {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: 'GET', headers: { Authorization: `Bearer ${code}`}
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
}


function populatePlaylists(accessToken: string, playlists: Playlists, searchTerm: string, list: HTMLElement) {
    list.innerHTML = "";
    
    playlists.items.forEach(playlist => {
        if (searchTerm == "") {
            const elemName = document.createElement('li');
            elemName.innerHTML = `<a href="#" class="playlist">${playlist.name}</a>`
            elemName.addEventListener('click', () => populatePrintOut(accessToken, playlist.id))
            list?.appendChild(elemName)
        }
        else if(playlist.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            const elemName = document.createElement('li');
            elemName.innerHTML = `<a href="#" class="playlist">${playlist.name}</a>`
            elemName.addEventListener('click', () => populatePrintOut(accessToken, playlist.id))
            list?.appendChild(elemName)
        }
    });


    // playlists.items.forEach(playlist => {
    //     if(playlist.name.includes("Brook") || playlist.name.includes("Nick")) {
    //         const elemName = document.createElement('li');
    //         elemName.innerHTML = `<a href="#">${playlist.name}</a>`
    //         elemName.addEventListener('click', () => populatePrintOut(accessToken, playlist.id))
    //         list?.appendChild(elemName)
    //     }
    // });
}

async function populatePrintOut(accessToken: string, id: string) {
    console.log("clearing anything in the writer...")
    const elem = document.getElementById('header')
    if (elem) {
        elem.remove()
    }
    const writeOut: HTMLElement | null = document.getElementById('print-out')
    if (writeOut) {
        writeOut.innerHTML = ''
    
        console.log("populating...")
        const playlistName: Playlist  = await fetchPlaylist(accessToken, id)
        console.log(playlistName)
        const playlist: PlaylistTracks = await fetchPlaylistTracks(accessToken, id)
        console.log(playlist)
    
        const header = document.createElement("h4")
        header.innerHTML = `${playlistName.name}`
        header.setAttribute('id', 'header')
        writeOut?.appendChild(header)
        let count = 1
    
        playlist.items.forEach(song => {
            const songWrite = document.createElement('p')
            const artistsArrObject: any[] = song.track.artists
            console.log('artist obj: ',artistsArrObject)
            let artistsArr: string[] = []
            artistsArrObject.forEach((artist: Artist) => {
                artistsArr = artistsArr.concat(artist.name) 
            })
            const artists = artistsArr.join(", ")
            songWrite.innerHTML = `${count}. ${song.track.name} - ${artists}`
            writeOut?.appendChild(songWrite)
            count+=1
        })
    }
}