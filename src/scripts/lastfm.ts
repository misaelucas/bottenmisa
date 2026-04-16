export async function getRecentTracks(limit = 5) {
  const apiKey = import.meta.env.LASTFM_API_KEY;
  const username = import.meta.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return [];
  }

  const url = new URL("https://ws.audioscrobbler.com/2.0/");
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", username);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(limit));

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Erro ao buscar músicas do Last.fm:", data.message);
      return [];
    }

    const tracks = Array.isArray(data.recenttracks?.track)
      ? data.recenttracks.track
      : [];

    return tracks.slice(0, limit);
  } catch (error) {
    console.error("Erro ao buscar músicas do Last.fm:", error);
    return [];
  }
}
