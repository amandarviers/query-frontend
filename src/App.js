import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Videos from "./pages/Videos";
import Photos from "./pages/Photos";
import Article from "./pages/Article";
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
            <Route path="/videos" element={<Videos />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/article/:id" element={<Article />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
