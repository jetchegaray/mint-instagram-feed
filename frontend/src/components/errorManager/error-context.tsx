import React, { createContext, useState, ReactNode } from "react";
import classes from "./error-context.module.css";

interface ErrorContextProps {
  errorMessage: string;
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextProps>({
  errorMessage: "",
  showError: () => {},
});

interface ErrorProviderParams {
  children: ReactNode;
}

const ErrorProvider = ({ children }: ErrorProviderParams) => {
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000); // Hide the error after 3 seconds
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, showError }}>
      {errorMessage && (
        <div className={classes.error_message}>{errorMessage}</div>
      )}
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider };
