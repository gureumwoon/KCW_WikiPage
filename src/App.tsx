import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import UploadPage from './pages/UploadPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
