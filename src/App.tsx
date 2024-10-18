import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import UserDashboard from './pages/UserDashboard';
import LessonPlayer from './pages/LessonPlayer';
import { CourseProvider } from './context/CourseContext';

function App() {
  return (
    <Router>
      <CourseProvider>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/lesson/:courseId/:lessonId" element={<LessonPlayer />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CourseProvider>
    </Router>
  );
}

export default App;