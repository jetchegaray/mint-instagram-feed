import classes from "./LogoLoader.module.css";

const LogoLoader = (props: { isLoading: boolean; message: string }) => {
  return (
    <>
      <>
        <div className={`${classes.loading_overlay}`}>
          <img src="./images/loading.gif" alt="loading" />
        </div>
      </>
    </>
  );
};

export default LogoLoader;
