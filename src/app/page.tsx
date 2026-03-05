export default function Home() {
  return (
    <div>
      <h1>TMDB Proxy API</h1>
      <p>Backend proxy activo. Endpoints disponibles:</p>
      <ul>
        <li>GET /api/movies/popular</li>
        <li>GET /api/movies/search?q=texto</li>
        <li>GET /api/movies/[id]</li>
      </ul>
    </div>
  );
}
