import "./App.css";
import Header from "./components/header/header";
import AppRouter from "./components/routes/router";


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AppRouter />
      </main>

      
    </div>
  );
}

export default App;
