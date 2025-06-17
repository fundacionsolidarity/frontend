
export const truncateWords = (text: string, maxLength: number) => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  let truncatedText = text.slice(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  // Si se encuentra un espacio y no es el inicio de la cadena, trunca hasta ese espacio
  if (lastSpaceIndex > -1 && lastSpaceIndex < maxLength - 1) {
    truncatedText = truncatedText.slice(0, lastSpaceIndex);
  }
  return truncatedText + '...';
};