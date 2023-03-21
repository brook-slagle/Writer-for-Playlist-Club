interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Playlist {
    name: string;
}

interface PlaylistItem {
    name: string;
    href: string;
    id: string;
    tracks: {
      total: number;
    };
}

interface Playlists {
    items: PlaylistItem[];
}

interface Artist {
    name: string; 
}    

interface PlaylistTrackItems {
    track: {
        name: string,
        artists: [
            { name: string }
        ]
    } 
}
    
interface PlaylistTracks {
    items: PlaylistTrackItems[];
}