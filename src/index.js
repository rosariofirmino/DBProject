import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-bootstrap"
import {
  Footer,
  Home,
  About,
  Contact,
  Blog,
  Posts,
  Post,
  ETFs,
  MutualFunds,
  Both
} from "./components";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/etfs" element={<ETFs/>} />
      <Route path="/mutualfunds" element={<MutualFunds/>} />
      <Route path="/both" element={<Both/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();
