import "./App.css";
import Board from "./components/Board";
import { ErrorProvider } from "./components/errorManager/error-context";

function App() {
  return (
    <>
      <ErrorProvider>
        <Board></Board>
      </ErrorProvider>
    </>
  );
}

export default App;
