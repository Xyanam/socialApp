import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import EditPage from "./pages/EditPage/EditPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import Profile from "./pages/ProfilePage/ProfilePage";
import ProfileUserPage from "./pages/ProfileUserPage/ProfileUserPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UsersPage from "./pages/UsersPage/UsersPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/profile/:id" replace />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/edit" element={<EditPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<ProfileUserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
