import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourseContext } from '../context/CourseContext';
import { User, BookOpen, Award } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, userProgress, enrollInCourse } = useCourseContext();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <div>Course not found</div>;
  }

  const isEnrolled = userProgress[course.id]?.enrolled;

  const handleEnroll = () => {
    enrollInCourse(course.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <img src={`https://source.unsplash.com/random/1200x400?${course.category}`} alt={course.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <User size={20} className="text-gray-400 mr-2" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={20} className="text-gray-400 mr-2" />
              <span>{course.lessons.length} lessons</span>
            </div>
            <div className="flex items-center">
              <Award size={20} className="text-gray-400 mr-2" />
              <span>{course.difficulty}</span>
            </div>
          </div>
          {isEnrolled ? (
            <Link to={`/lesson/${course.id}/${course.lessons[0].id}`} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
              Continue Learning
            </Link>
          ) : (
            <button onClick={handleEnroll} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Enroll Now
            </button>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {course.lessons.map((lesson, index) => (
          <div key={lesson.id} className="p-4 border-b last:border-b-0">
            <h3 className="text-lg font-medium mb-2">
              {index + 1}. {lesson.title}
            </h3>
            <p className="text-gray-600">{lesson.type === 'video' ? 'Video Lesson' : 'Text Lesson'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;