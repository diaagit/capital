export function formatEnumLabel(value?: string) {
  if (!value) return "";

  return value
    .replace(/[_-]+/g, " ") 
    .toUpperCase();           
}