// Function to save data to localStorage
export const saveToLocalStorage = (key: string, cityName: string) => {
  try {
    // Save the cityName to localStorage under the specified key
    localStorage.setItem(key, JSON.stringify(cityName));
  } catch (error) {
    // Log an error if saving fails
    console.error('Error saving to localStorage', error);
  }
};

// Function to retrieve data from localStorage
export const getFromLocalStorage = (key: string) => {
  try {
    // Get the stored value from localStorage
    const storedValue = localStorage.getItem(key);
    // Parse and return the stored value, or return null if not found
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    // Log an error if retrieval fails
    console.error('Error getting from localStorage', error);
    return null;
  }
};
