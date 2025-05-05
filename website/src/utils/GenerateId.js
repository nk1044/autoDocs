// utils.js
export function generateHeadingId(text, fullPath) {
    return `${fullPath}-${text.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`;
  }
  