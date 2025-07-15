export const getCache = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setCache = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
