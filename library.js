const library = {
  tracks: {
    t01: {
      id: "t01",
      name: "Code Monkey",
      artist: "Jonathan Coulton",
      album: "Thing a Week Three"
    },
    t02: {
      id: "t02",
      name: "Model View Controller",
      artist: "James Dempsey",
      album: "WWDC 2003"
    },
    t03: {
      id: "t03",
      name: "Four Thirty-Three",
      artist: "John Cage",
      album: "Woodstock 1952"
    }
  },
  playlists: {
    p01: {
      id: "p01",
      name: "Coding Music",
      tracks: ["t01", "t02"]
    },
    p02: {
      id: "p02",
      name: "Other Playlist",
      tracks: ["t03"]
    }
  }
};

/////////////////////////////
// FUNCTIONS TO IMPLEMENT:
/////////////////////////////

// prints a list of all playlists, in the form:
// p01: Coding Music - 2 tracks
// p02: Other Playlist - 1 tracks
const printPlaylists = function() {
  const playlists = library.playlists;
  for (const playlistKey in playlists) {
    const playlist = playlists[playlistKey];
    const playlistId = playlist.id;
    const playlistName = playlist.name;
    const numberOfTracks = playlist.tracks.length;
    playlistMessage = `${playlistId}: ${playlistName} - ${numberOfTracks} tracks`;
    console.log(playlistMessage);
  }

};

printPlaylists();

// prints a list of all tracks, using the following format:
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
// t03: Four Thirty-Three by John Cage (Woodstock 1952)
const printTracks = function() {
  const tracks = library.tracks;

  for (const trackKey in tracks) {//need track number, track name, artist, album name
    const track = tracks[trackKey];
    const trackNumber = track.id;
    const trackName = track.name;
    const artistName = track.artist;
    const albumName = track.album;
    const trackInfoString = `${trackNumber}: ${trackName} by ${artistName} (${albumName})`;
    console.log(trackInfoString);
  }
};

printTracks();

// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
const printPlaylist = function(playlistId) {
  const playlist = library.playlists[playlistId];

  console.log(`${playlist.id}: ${playlist.name} - ${playlist.tracks.length} tracks`);

  playlist.tracks.forEach(trackId => {
    const track = library.tracks[trackId];
    console.log(`${track.id}: ${track.name} by ${track.artist} (${track.album})`);
  });
};

printPlaylist("p01");


// adds an existing track to an existing playlist
const addTrackToPlaylist = function(trackId, playlistId) {
  const trackInfo = library.tracks[trackId];

  if (trackInfo === undefined) {
    console.log("Error: Track doesn't exist");
    return;
  }

  const playlistInfo = library.playlists[playlistId];
  const playlistTracks = playlistInfo.tracks;
  playlistTracks.push(trackId);

  console.log(`Track ${trackId} has been added to playlist ${playlistId}`);
  const newPlaylistInfo = library.playlists[playlistId];
  console.log(`Updated tracks for ${playlistId}. Updated track list: ${newPlaylistInfo.tracks}`);
};

addTrackToPlaylist("t03", "p01");



// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};


// adds a track to the library
const addTrack = function(name, artist, album) {
  const scanTracks = library.tracks;

  for (const trackKey in scanTracks) {
    if (name === scanTracks[trackKey].name && artist === scanTracks[trackKey].artist && album === scanTracks[trackKey].album) {
      console.log(`Error, track already exists!`);
      return;
    }
  }
  const newId = generateUid();
  const newTrack = {
    id: newId,
    name: name,
    artist: artist,
    album: album
  };
  library.tracks[newId] = newTrack;

  console.log(`Track: ${name} by ${artist} successfully added to library! Track ID: ${newId}`);
};

addTrack("Rain", "The Beatles", "Hey Jude");
addTrack("Rain", "The Beatles", "Hey Jude"); //should give error message

// adds a playlist to the library
const addPlaylist = function(name) {

  const scanPlaylist = library.playlists;
  for (const trackPlaylist in scanPlaylist) {

    if (name === scanPlaylist[trackPlaylist].name) {
      console.log("Error, playlist name taken already. Choose a new playlist name");
      return;
    }
  }
  const newId = generateUid();
  const newPlaylist = {
    id: newId,
    name: name,
    tracks: []
  };

  library.playlists[newId] = newPlaylist;
  console.log(`New playlist: ${name} successfully added. Playlist ID: ${newId}`);
};

addPlaylist("Gaming Music");
addPlaylist("Gaming Music"); //gives error message




// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri") 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
const printSearchResults = function(query) {
  const matchingTracks = [];

  for (const trackId in library.tracks) {
    const track = library.tracks[trackId];

    if (track.name.toLowerCase().search(query.toLowerCase()) !== -1 ||
                     track.artist.toLowerCase().search(query.toLowerCase()) !== -1 ||
                     track.album.toLowerCase().search(query.toLowerCase()) !== -1) {

      matchingTracks.push(track);
    }
  }
  console.log("Matching tracks:");
  for (const matchingTrack of matchingTracks) {
    console.log(`${matchingTrack.id}: ${matchingTrack.name} by ${matchingTrack.artist} (${matchingTrack.album})`);
  }

};

printSearchResults("model");