import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseContext } from '../context/CourseContext';

const HomePage: React.FC = () => {
  const { courses } = useCourseContext();
  const featuredCourses = courses.slice(0, 3); // Display top 3 courses

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to LearnHub</h1>
        <p className="text-xl mb-6">Discover, Learn, and Grow with Our Online Courses</p>
        <Link to="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Explore Courses
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={`https://source.unsplash.com/random/800x600?${course.category}`} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
                <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;