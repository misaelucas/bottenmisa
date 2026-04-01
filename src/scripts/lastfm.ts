export async function getRecentTracks(limit = 5) {
  // Pegando as variáveis do seu arquivo .env
const apiKey = import.meta.env.LASTFM_API_KEY;
const username = import.meta.env.LASTFM_USERNAME;
const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // Retorna a lista de músicas (tracks)
    return data.recenttracks.track;
  } catch (error) {
    console.error("Erro ao buscar músicas do Last.fm:", error);
    return [];
  }
}