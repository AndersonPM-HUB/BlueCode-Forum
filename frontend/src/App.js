import "./App.css";
import Header from "./components/header/header";
import AppRouter from "./components/routes/router";
import footer from "./media/footer.png";
import Imagenes from "./components/imagenes/imagenes";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AppRouter />
      </main>

      <Imagenes imagen={footer} text={"Footer"} />
    </div>
  );
}

export default App;
