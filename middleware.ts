import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify, type JWTPayload } from 'jose';


export async function verify(token: string, secret: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("refresh_token")

  try {
    const result = await verify(token?.value as string, process.env.JWT_SECRET as string)
    if (result?.role !== "ADMIN") {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }

}

export const config = {
  matcher: '/new-item',
}
