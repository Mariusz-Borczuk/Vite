export const saveToLocalStorage = (key: string, cityName: string) => {
  localStorage.setItem(key, JSON.stringify(cityName));
};

export const getFromLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : '';
};
