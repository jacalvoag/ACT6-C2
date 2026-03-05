// ====================================
// Utilidad CORS para Route Handlers
// ====================================

import { NextResponse } from "next/server";

/**
 * Obtiene el origen permitido desde las variables de entorno.
 * Por defecto: http://localhost:3000
 */
function getAllowedOrigin(): string {
    return process.env.CORS_ORIGIN || "http://localhost:3000";
}

/**
 * Agrega headers CORS a una respuesta existente.
 */
export function corsHeaders(): Record<string, string> {
    const origin = getAllowedOrigin();
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
}

/**
 * Maneja las peticiones preflight (OPTIONS) con los headers CORS correctos.
 */
export function handlePreflight(): NextResponse {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

/**
 * Crea una respuesta JSON con headers CORS incluidos.
 */
export function jsonResponse<T>(data: T, status: number = 200): NextResponse {
    return NextResponse.json(data, {
        status,
        headers: corsHeaders(),
    });
}

/**
 * Crea una respuesta de error con headers CORS incluidos.
 */
export function errorResponse(
    message: string,
    status: number = 500
): NextResponse {
    return NextResponse.json(
        { error: message },
        { status, headers: corsHeaders() }
    );
}
