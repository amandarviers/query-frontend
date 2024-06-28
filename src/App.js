import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Category from "./pages/Category";
import ArticlePage from "./pages/Article";
import Archive from "./pages/Archive";
import Staff from "./pages/Staff";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/:slug" element={<Category />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/staff" element={<Staff />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
