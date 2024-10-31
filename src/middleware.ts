//TODO: needs attention

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/signin(.*)', '/signup(.*)', '/', '/api/clerk-webhook', '/api/drive-activity/notification', '/api/payment/success',])
const isIgnoredRoute = createRouteMatcher(['/api/auth/callback/discord', '/api/auth/callback/notion', '/api/auth/callback/slack', '/api/flow', '/api/cron/wait',])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
  if (isIgnoredRoute(req)) return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};