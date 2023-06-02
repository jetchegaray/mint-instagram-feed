import { useState } from "react";
import LogoLoader from "./LogoLoader";

export const IsLoading = (
  WrappedComponent: React.FC<any>,
  loadingMessage: string
) => {
  const LoadingWrapper = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoadingState = (isWrappedComponentLoading: boolean) => {
      setIsLoading(isWrappedComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <LogoLoader message={loadingMessage} isLoading={isLoading} />
        )}
        <WrappedComponent {...props} setLoadingState={setLoadingState} />
      </>
    );
  };

  return LoadingWrapper;
};

export default IsLoading;
