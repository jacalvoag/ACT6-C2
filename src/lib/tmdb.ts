// ====================================
// Cliente centralizado para TMDB API
// ====================================

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * Realiza una petición autenticada a la API de TMDB.
 * El token Bearer se inyecta desde las variables de entorno.
 */
export async function fetchFromTMDB<T>(
    endpoint: string,
    params?: Record<string, string>
): Promise<T> {
    const token = process.env.TMDB_API_TOKEN;

    if (!token) {
        throw new Error("TMDB_API_TOKEN no está configurado en las variables de entorno");
    }

    // Construir query params
    const searchParams = new URLSearchParams({
        language: "es-MX",
        ...params,
    });

    const url = `${TMDB_BASE_URL}${endpoint}?${searchParams.toString()}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        // No cachear en desarrollo para siempre tener datos frescos
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            `Error de TMDB: ${response.status} ${response.statusText}`
        );
    }

    return response.json() as Promise<T>;
}
