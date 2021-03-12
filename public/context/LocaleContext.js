import React from "react";

export const LocaleContext = React.createContext({});

const LocaleContextProvider = ({ children }) => {
  // const locales = [
  //   { USA: { currency: USD, language: English } },
  //   { Canada: { currency: CAD, language: English } },
  // ];
  const [selectedLocale, setSelectedLocale] = React.useState("");
  const [isLocaleDialogOpen, setLocaleDialogOpen] = React.useState(false);

  return (
    <LocaleContext.Provider
      value={{
        selectedLocale,
        isLocaleDialogOpen,
        setSelectedLocale,
        setLocaleDialogOpen,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
