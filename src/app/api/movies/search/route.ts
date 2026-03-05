// ====================================
// GET /api/movies/search?q=texto
// Proxy: TMDB /search/movie
// ====================================

import { NextRequest } from "next/server";
import { fetchFromTMDB } from "@/lib/tmdb";
import { handlePreflight, jsonResponse, errorResponse } from "@/lib/cors";
import type { MoviesResponse } from "@/types/tmdb";

/**
 * Maneja peticiones preflight CORS (OPTIONS).
 */
export async function OPTIONS() {
    return handlePreflight();
}

/**
 * Busca películas por nombre.
 * Query params: ?q=batman&page=1
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");
        const page = searchParams.get("page") || "1";

        if (!query || query.trim() === "") {
            return errorResponse("El parámetro 'q' es requerido para la búsqueda", 400);
        }

        const data = await fetchFromTMDB<MoviesResponse>("/search/movie", {
            query,
            page,
        });

        return jsonResponse(data);
    } catch (error) {
        console.error("Error en /api/movies/search:", error);

        const message =
            error instanceof Error ? error.message : "Error interno del servidor";

        return errorResponse(message);
    }
}
