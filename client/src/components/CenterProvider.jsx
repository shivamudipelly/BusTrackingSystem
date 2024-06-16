// CenterContext.js
import React, { createContext, useState, useContext } from "react";

const CenterContext = createContext();

export function CenterProvider({ children }) {
  const [center, setCenter] = useState([51.505, -0.09]); // Default center coordinates

  return (
    <CenterContext.Provider value={{ center, setCenter }}>
      {children}
    </CenterContext.Provider>
  );
}

export function useCenter() {
  const context = useContext(CenterContext);
  if (!context) {
    throw new Error("useCenter must be used within a CenterProvider");
  }
  return context;
}
