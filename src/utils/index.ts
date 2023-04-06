export function getIdFromUrl(url: string): number {
  const urlParts = url.split("/")
  return parseInt(urlParts[urlParts.length - 2])
}

export function isOG(url: string) {
  const id = getIdFromUrl(url)

  return id < 150
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
