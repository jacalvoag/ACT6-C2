// ====================================
// GET /api/movies/[id]
// Proxy: TMDB /movie/{id}
// ====================================

import { NextRequest } from "next/server";
import { fetchFromTMDB } from "@/lib/tmdb";
import { handlePreflight, jsonResponse, errorResponse } from "@/lib/cors";
import type { MovieDetail } from "@/types/tmdb";

/**
 * Maneja peticiones preflight CORS (OPTIONS).
 */
export async function OPTIONS() {
    return handlePreflight();
}

/**
 * Obtiene el detalle completo de una película por su ID.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Validar que el ID sea un número
        if (!id || isNaN(Number(id))) {
            return errorResponse("ID de película inválido", 400);
        }

        const data = await fetchFromTMDB<MovieDetail>(`/movie/${id}`);

        return jsonResponse(data);
    } catch (error) {
        console.error(`Error en /api/movies/${(await params).id}:`, error);

        const message =
            error instanceof Error ? error.message : "Error interno del servidor";

        // Si TMDB devuelve 404, propagar el status
        if (message.includes("404")) {
            return errorResponse("Película no encontrada", 404);
        }

        return errorResponse(message);
    }
}
