import * as React from "react";
import { createContext, useContext } from "react";
import useListings from "../hooks/useListings";

export const ListingsContext = createContext();

export const useListingsContext = () => {
  return useContext(ListingsContext);
};

export const ListingsProvider = ({ children }) => {
  const listings = useListings();

  if (!listings) return null;

  return (
    <ListingsContext.Provider value={listings}>
      {children}
    </ListingsContext.Provider>
  );
};
