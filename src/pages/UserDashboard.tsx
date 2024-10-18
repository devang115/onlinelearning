import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseContext } from '../context/CourseContext';
import { BookOpen, CheckCircle } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { courses, userProgress } = useCourseContext();

  const enrolledCourses = courses.filter((course) => userProgress[course.id]?.enrolled);

  const calculateProgress = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const completedLessons = userProgress[courseId]?.completedLessons || [];
    return Math.round((completedLessons.length / (course?.lessons.length || 1)) * 100);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => {
            const progress = calculateProgress(course.id);
            return (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <BookOpen size={20} />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Link
                    to={`/lesson/${course.id}/${course.lessons[0].id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
                  >
                    {progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recently Completed Lessons</h2>
        <ul className="space-y-4">
          {enrolledCourses.flatMap((course) => 
            course.lessons
              .filter((lesson) => userProgress[course.id]?.completedLessons.includes(lesson.id))
              .slice(0, 5)
              .map((lesson) => (
                <li key={`${course.id}-${lesson.id}`} className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span>{lesson.title}</span>
                  <span className="text-gray-500">- {course.title}</span>
                </li>
              ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default UserDashboard;