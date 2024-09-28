export const saveToLocalStorage = (key: string, cityName: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(cityName));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Error getting from localStorage', error);
    return null;
  }
};
