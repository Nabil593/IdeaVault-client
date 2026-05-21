import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
    
  // ১. BetterAuth এপিআই দিয়ে সেশন ডাটা চেক করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // ২. ইউজার লগইন থাকলে তাকে আর /login বা /register পেজে যেতে না দিয়ে হোমে পাঠানো
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ৩. ইউজার লগইন না থাকলে তাকে আটকে পূর্বের পেজের লিঙ্কসহ (redirect চাবিসহ) লগইনে পাঠানো
  if (!session) {
    const callbackUrl = encodeURIComponent(pathname);

    // লগইন পেজ যাতে searchParams.get('redirect') দিয়ে এটা ধরতে পারে
    return NextResponse.redirect(
      new URL(`/login?redirect=${callbackUrl}`, request.url),
    );
  }

  // ৪. সব ঠিক থাকলে বা পাবলিক রুট হলে সামনে যাওয়ার অনুমতি দেওয়া
  return NextResponse.next();
}

// 🎯 তোমার অ্যাসাইনমেন্টের নিখুঁত রুট কনফিগারেশন
export const config = {
  matcher: [
    "/add-idea",
    "/ideas/:id+", // 👈 মেইন /ideas পাবলিক, কিন্তু আইডি ডিটেইলস পেজ লক থাকবে
    "/my-ideas",
    "/my-interactions", // 👈 সঠিক নাম
    "/my-profile", // 👈 প্রোফাইল পেজ
  ],
};
