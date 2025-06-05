import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./pages/Header";
import { Slider } from "./pages/Slider";
import { Blog } from "./pages/Blog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from "./pages/BlogDetail";
import Category from "./pages/Category";
import { Course } from "./components/Course";
import { Road } from "./pages/Road";

import MyCoursesPage from "./pages/MyCoursesPage";
import PopupModal from "./components/PopupModal";

function App() {
  return (
    <Router>
      <Header />

      <div className="flex">
        <Sidebar />
        <PopupModal />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Slider />} />
            <Route path="/road" element={<Road />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
