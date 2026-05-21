import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session) {
    const callbackUrl = encodeURIComponent(pathname);

    return NextResponse.redirect(
      new URL(`/login?redirect=${callbackUrl}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-idea",
    "/ideas/:id+",
    "/my-ideas",
    "/my-interactions",
    "/my-profile",
  ],
};
