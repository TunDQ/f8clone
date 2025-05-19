import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./pages/Header";
import { Slider } from "./pages/Slider";
import { Blog } from "./pages/Blog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import Category from "./pages/Category";
function App() {
  return (
    <Router>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Slider />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetail/>} />
            <Route path="/category/:name" element={<Category/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;