import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'kesurved-admin-secret-key-change-in-production';

/**
 * Verify admin JWT token from cookies.
 * Returns the decoded payload if valid, or null if invalid/missing.
 */
export function verifyAdminToken(request: NextRequest): { email: string; role: string } | null {
  try {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    if (decoded.role !== 'admin') return null;

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Helper to return a 401 response for unauthenticated requests.
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized. Please log in to the admin panel.' },
    { status: 401 }
  );
}
