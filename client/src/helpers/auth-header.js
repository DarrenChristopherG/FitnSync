/**
 * This helper function reads the user object from localStorage.
 * If the user is logged in and has an accessToken (JWT),
 * it returns an object containing the x-access-token header.
 * Otherwise, it returns an empty object.
 */
export default function authHeader() {
  // Get the user object from localStorage, which was saved during login
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if the user object and the accessToken exist
  if (user && user.accessToken) {
    // For our backend, we need to return the token in the 'x-access-token' header
    return { 'x-access-token': user.accessToken };
  } else {
    // If no user is logged in, return an empty object
    return {};
  }
}