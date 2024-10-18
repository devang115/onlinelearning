import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseContext } from '../context/CourseContext';
import { Search, Filter } from 'lucide-react';

const CourseCatalog: React.FC = () => {
  const { courses } = useCourseContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || course.category === categoryFilter) &&
      (difficultyFilter === '' || course.difficulty === difficultyFilter)
    );
  });

  const categories = Array.from(new Set(courses.map((course) => course.category)));
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Course Catalog</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option value="">All Difficulties</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={`https://source.unsplash.com/random/800x600?${course.category}`} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{course.difficulty}</span>
                <Link to={`/courses/${course.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;