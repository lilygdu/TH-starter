import React from "react";

export const LocaleContext = React.createContext({});

// move to sanity
const supportedLocales = [
  {
    country: "Canada",
    countryCode: "CA",
    language: "English",
    languageCode: "EN",
    currency: "$",
    currencyCode: "cad",
    key: "EN/CA",
  },
  {
    country: "USA",
    countryCode: "US",
    language: "English",
    languageCode: "EN",
    currency: "$US",
    currencyCode: "usd",
    key: "EN/US",
  },
];

const LocaleContextProvider = ({ children }) => {
  const [locales, setLocales] = React.useState([]);
  const [selectedLocale, setSelectedLocale] = React.useState(
    JSON.parse(
      localStorage.getItem("locale") || JSON.stringify(supportedLocales[0])
    )
  );

  React.useEffect(() => {
    setLocales(supportedLocales);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("locale", JSON.stringify(selectedLocale));
  }, [selectedLocale]);

  return (
    <LocaleContext.Provider
      value={{
        locales,
        selectedLocale,
        setSelectedLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
