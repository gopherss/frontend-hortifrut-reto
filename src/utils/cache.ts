export const getCache = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error parseando cache para key "${key}":`, item);
    localStorage.removeItem(key); // Limpia la entrada inválida
    return null;
  }
};

export const setCache = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
