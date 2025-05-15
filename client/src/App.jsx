import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./pages/Header";
import { Slider } from "./pages/Slider";

function App() {
  return (
    <div>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <Slider />
        </main>
      </div>
    </div>
  );
}

export default App;
