import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [displayCartSidebar, setDisplayCartSidebar] = useState(false);
  const [displayMenuSidebar, setDisplayMenuSidebar] = useState(false);

  const openCartSidebar = () => setDisplayCartSidebar(true);
  const closeCartSidebar = () => setDisplayCartSidebar(false);

  const openMenuSidebar = () => setDisplayMenuSidebar(true);
  const closeMenuSidebar = () => setDisplayMenuSidebar(false);

  return (
    <UIContext.Provider
      value={{
        displayCartSidebar,
        openCartSidebar,
        closeCartSidebar,
        displayMenuSidebar,
        openMenuSidebar,
        closeMenuSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
