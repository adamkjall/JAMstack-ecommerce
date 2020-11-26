import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const openSidebar = () => setDisplaySidebar(true);
  const closeSidebar = () => setDisplaySidebar(false);

  return (
    <UIContext.Provider
      value={{
        displaySidebar,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
