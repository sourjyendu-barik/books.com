import React, { useEffect, useState } from "react";

const useLocalstorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    try {
    } catch (error) {
      console.log("Error while reading data.", error);
    }
  }, [key, value]);
  return [value, setValue];
};

export default useLocalstorage;
