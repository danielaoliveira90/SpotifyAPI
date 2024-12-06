const clientId = "08c93bdce8704a528e1520ca3441f5bc";  // Replace with your Spotify Client ID
const redirectUri = "https://danielaoliveira90.github.io/SpotifyAPI/"; // Replace with your redirect URI
const scopes = "user-read-recently-played";

// Step 1: Redirect user to Spotify login to get an access token
if (!window.location.hash) {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}`;
    window.location.href = authUrl;
} else {
    // Step 2: Extract the access token from the URL hash
    const accessToken = window.location.hash.split('&')[0].split('=')[1];

    // Step 3: Fetch recently played tracks
    fetch("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            const tracksDiv = document.getElementById("tracks");
            data.items.forEach(item => {
                const track = item.track;
                const trackElement = document.createElement("div");
                trackElement.innerHTML = `
                    <p><strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(", ")}</p>
                    <img src="${track.album.images[1]?.url}" alt="Album Cover" width="100">
                `;
                tracksDiv.appendChild(trackElement);
            });
        })
        .catch(error => console.error("Error fetching tracks:", error));
}
