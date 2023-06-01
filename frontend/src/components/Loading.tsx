import { useState } from "react";
import LogoLoader from "./LogoLoader";

const IsLoading = (WrappedComponent: React.FC, loadingMessage: string) => {
  const loadingWrapper = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);

    const setLoadingState = (isWrappedComponentLoading: boolean) => {
      setIsLoading(isWrappedComponentLoading);
    };

    return (
      <>
        {isLoading && <LogoLoader message={loadingMessage} />}
        <WrappedComponent {...props} setLoadingState={setLoadingState} />
      </>
    );
  };

  return loadingWrapper;
};

export default IsLoading;
