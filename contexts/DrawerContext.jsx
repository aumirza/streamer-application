import { createContext, useContext, useState } from "react";

export const DrawerContext = createContext({
  drawerOpen: false,
  setDrawerOpen: () => {},
  toggleDrawer: () => {},
});

export const DrawerProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <DrawerContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
