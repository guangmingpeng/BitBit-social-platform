import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { routes } from "./config/routes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </Suspense>
        </main>

        <nav className="bottom-nav">
          <NavLink to="/" end>
            首页
          </NavLink>
          <NavLink to="/activities">活动</NavLink>
          <NavLink to="/community">社区</NavLink>
          <NavLink to="/profile">我的</NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;
