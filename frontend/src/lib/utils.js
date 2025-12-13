export function formatDate (d) {
  return new Date(d).toLocaleString('en-US', {})
}

export async function copyToClipboard (text) {
    await navigator.clipboard.writeText(text)
}
