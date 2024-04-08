const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

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
  },
  printPlaylists: function() {
    for (const playlistId in this.playlists) {
      const playlist = this.playlists[playlistId];
      const numberOfTracks = playlist.tracks.length;
      console.log(`${playlistId}: ${playlist.name} - ${numberOfTracks} tracks`);
    }
  },
  printTracks: function() {
    const tracks = this.tracks;
    for (const trackId in tracks) {
      const track = this.tracks[trackId];
      console.log(`${trackId}: ${track.name} by ${track.name} (${track.album}) `);
    }
  },
  printPlaylist: function(playlistId) {
    const playlist = this.playlists[playlistId];
    console.log(`${playlist.id}: ${playlist.name} - ${playlist.tracks.length} tracks`);

    playlist.tracks.forEach(trackId => {
      const track = this.tracks[trackId];
      console.log(`${trackId}: ${track.name} by ${track.artist} (${track.album})`);
    });
  },
  addTrackToPlaylist: function(trackId, playlistId) {
    const trackInfo = this.tracks[trackId];

    if (trackInfo === undefined) {
      console.log("Error: Track doesn't exist");
      return;
    }

    const playlistInfo = this.playlists[playlistId];
    const playlistTracks = playlistInfo.tracks;
    playlistTracks.push(trackId);

    console.log(`Track ${trackId} has been added to playlist ${playlistId}`);
    const newPlaylistInfo = this.playlists[playlistId];
    console.log(`Updated tracks for ${playlistId}. Updated track list: ${newPlaylistInfo.tracks}`);
  },
  addTrack: function(name, artist, album) {
    const tracks = this.tracks;

    for (const key in tracks) {
      if (name === tracks[key].name && artist === tracks[key].artist && album === tracks[key].album) {
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
    this.tracks[newId] = newTrack;

    console.log(`Track: ${name} by ${artist} successfully added to library! Track ID: ${newId}`);
  },
  addPlaylist: function (name) {
    const playlists = this.playlists;
    for (const playlist in playlists) {
  
      if (name === playlists[playlist].name) {
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
  
    this.playlists[newId] = newPlaylist;
    console.log(`New playlist: ${name} successfully added. Playlist ID: ${newId}`);
  },
  };




library.printPlaylists();

library.printTracks();

library.printPlaylist("p01");

library.addTrackToPlaylist("t03", "p01");

library.addTrack("Rain", "The Beatles", "Hey Jude");
library.addTrack("Rain", "The Beatles", "Hey Jude"); //should give error message

library.addPlaylist("gaming music");