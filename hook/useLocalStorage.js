import { useEffect } from "react";
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(initialValue)

  useEffect(() => {
    const exisitingData = JSON.parse(localStorage.getItem(key))

    if (exisitingData) {
      setData(exisitingData)
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue))
    }
  }, [])
  const setLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)))
      setData(newData)
    } else {
      localStorage.setItem(key, JSON.stringify(newData))
      setData(newData)
    }
  }

  return [data, setLocalStorage]
} 