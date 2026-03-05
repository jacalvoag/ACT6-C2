// ====================================
// GET /api/movies/popular
// Proxy: TMDB /movie/popular
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
 * Obtiene el listado de películas populares desde TMDB.
 * Soporta paginación: ?page=1
 */
export async function GET(request: NextRequest) {
    try {
        // Obtener página de los query params (default: 1)
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";

        const data = await fetchFromTMDB<MoviesResponse>("/movie/popular", {
            page,
        });

        return jsonResponse(data);
    } catch (error) {
        console.error("Error en /api/movies/popular:", error);

        const message =
            error instanceof Error ? error.message : "Error interno del servidor";

        return errorResponse(message);
    }
}
