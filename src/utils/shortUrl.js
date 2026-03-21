export function generateShortUrl() {
  return "short.ly/" + Math.random().toString(36).substring(2, 7);
}