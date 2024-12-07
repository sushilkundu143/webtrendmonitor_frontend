// utils/localStorageUtils.js

export const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };
  
  export const getLocalStorage = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting localStorage:', error);
      return null;
    }
  };
  
  export const removeLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage:', error);
    }
  };
  