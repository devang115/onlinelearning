import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourseContext } from '../context/CourseContext';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const LessonPlayer: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { courses, userProgress, updateLessonProgress } = useCourseContext();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const course = courses.find((c) => c.id === courseId);
  const lessons = course?.lessons || [];
  const currentLesson = lessons[currentLessonIndex];

  useEffect(() => {
    const index = lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index !== -1) {
      setCurrentLessonIndex(index);
    }
  }, [lessonId, lessons]);

  if (!course || !currentLesson) {
    return <div>Lesson not found</div>;
  }

  const isCompleted = userProgress[courseId]?.completedLessons.includes(currentLesson.id);

  const handleComplete = () => {
    updateLessonProgress(courseId, currentLesson.id, !isCompleted);
  };

  const navigateLesson = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentLessonIndex - 1 : currentLessonIndex + 1;
    if (newIndex >= 0 && newIndex < lessons.length) {
      setCurrentLessonIndex(newIndex);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{currentLesson.title}</h2>
          {currentLesson.type === 'video' ? (
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={currentLesson.content}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: currentLesson.content }}></div>
          )}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => navigateLesson('prev')}
              disabled={currentLessonIndex === 0}
              className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              <ChevronLeft size={20} />
              Previous Lesson
            </button>
            <button
              onClick={handleComplete}
              className={`flex items-center px-4 py-2 rounded-md ${
                isCompleted ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
              } hover:bg-opacity-80 transition-colors`}
            >
              <CheckCircle size={20} className="mr-2" />
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </button>
            <button
              onClick={() => navigateLesson('next')}
              disabled={currentLessonIndex === lessons.length - 1}
              className="flex items-center text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              Next Lesson
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-xl font-semibold p-4 border-b">Course Content</h3>
        <ul>
          {lessons.map((lesson, index) => (
            <li key={lesson.id} className="border-b last:border-b-0">
              <Link
                to={`/lesson/${courseId}/${lesson.id}`}
                className={`block p-4 hover:bg-gray-50 ${
                  index === currentLessonIndex ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{index + 1}. {lesson.title}</span>
                  {userProgress[courseId]?.completedLessons.includes(lesson.id) && (
                    <CheckCircle size={20} className="text-green-500" />
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonPlayer;