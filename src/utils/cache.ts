export const getCache = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Error parseando cache para key "${key}":`, item);
    localStorage.removeItem(key); // limpia automáticamente
    return null;
  }
};


export const setCache = (key: string, data: any) => {
  if (data === undefined || data === null) return;
  localStorage.setItem(key, JSON.stringify(data));
};
