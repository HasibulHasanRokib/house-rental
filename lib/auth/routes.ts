export const publicRoutes = ["/"];
export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/active-account",
];
export const protectedRoute = [
  "/profile",
  "/profile/edit-profile",
  "/profile/add-property",
  "/profile/update-property",
  "/profile/overview",
  "/profile/my-property",
  "/property/preview",
  "/thank-you",
];

export const apiRoutePrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/";
export const LOGIN_REDIRECT = "/auth/login";
