import { Course, UserProgress } from './types';

// Fake courses data
const fakeCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    instructor: 'John Doe',
    category: 'Web Development',
    difficulty: 'Beginner',
    lessons: [
      { id: '1-1', title: 'HTML Fundamentals', content: 'https://www.youtube.com/embed/UB1O30fR-EE', type: 'video' },
      { id: '1-2', title: 'CSS Styling', content: 'Learn how to style your HTML with CSS.', type: 'text' },
      { id: '1-3', title: 'JavaScript Basics', content: 'https://www.youtube.com/embed/PkZNo7MFNFg', type: 'video' },
    ],
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Explore the world of data science with Python and popular libraries.',
    instructor: 'Jane Smith',
    category: 'Data Science',
    difficulty: 'Intermediate',
    lessons: [
      { id: '2-1', title: 'Introduction to Python', content: 'https://www.youtube.com/embed/kqtD5dpn9C8', type: 'video' },
      { id: '2-2', title: 'Data Analysis with Pandas', content: 'Learn how to analyze data using Pandas.', type: 'text' },
      { id: '2-3', title: 'Data Visualization', content: 'https://www.youtube.com/embed/a9UrKTVEeZA', type: 'video' },
    ],
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps using React Native.',
    instructor: 'Mike Johnson',
    category: 'Mobile Development',
    difficulty: 'Advanced',
    lessons: [
      { id: '3-1', title: 'React Native Basics', content: 'https://www.youtube.com/embed/0-S5a0eXPoc', type: 'video' },
      { id: '3-2', title: 'State Management in React Native', content: 'Learn about state management in React Native apps.', type: 'text' },
      { id: '3-3', title: 'Publishing Your App', content: 'https://www.youtube.com/embed/oBWBDaqNuws', type: 'video' },
    ],
  },
];

// Fake user progress data
const fakeUserProgress: UserProgress = {
  '1': { enrolled: true, completedLessons: ['1-1'] },
  '2': { enrolled: true, completedLessons: [] },
};

export const fetchCourses = async (): Promise<Course[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return fakeCourses;
};

export const fetchUserProgress = async (): Promise<UserProgress> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return fakeUserProgress;
};

export const enrollInCourse = async (courseId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Enrolled in course: ${courseId}`);
  // In a real application, this would update the backend
};

export const updateLessonProgress = async (
  courseId: string,
  lessonId: string,
  completed: boolean
): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updated lesson progress: Course ${courseId}, Lesson ${lessonId}, Completed: ${completed}`);
  // In a real application, this would update the backend
};