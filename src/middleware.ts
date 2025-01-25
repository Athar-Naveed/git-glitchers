// import {NextRequest, NextResponse} from "next/server";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const token = request.cookies.get("serviceToken");

//   if (!token && token == undefined) {
//     // Unauthenticated user: Redirect to /mp/login unless already there
//     if (!url.pathname.startsWith("/login")) {
//       return NextResponse.redirect(new URL("/login", url.origin));
//     }
//     return NextResponse.next();
//   }

//   // Authenticated user logic
//   if (url.pathname === "/") {
//     // Redirect /mp to /ml
//     return NextResponse.redirect(new URL("/ml", url.origin));
//   }

//   // Allow access to /ml
//   return NextResponse.next();
// }

// // Set matcher to listen for /ml
// export const config = {
//   matcher: ["/ml", "/ml/:path*"],
// };
export function middleware(){}