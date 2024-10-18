import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, UserProgress } from '../types';
import { fetchCourses, fetchUserProgress } from '../api';

interface CourseContextType {
  courses: Course[];
  userProgress: UserProgress;
  enrollInCourse: (courseId: string) => void;
  updateLessonProgress: (courseId: string, lessonId: string, completed: boolean) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  useEffect(() => {
    const loadData = async () => {
      const coursesData = await fetchCourses();
      const progressData = await fetchUserProgress();
      setCourses(coursesData);
      setUserProgress(progressData);
    };
    loadData();
  }, []);

  const enrollInCourse = (courseId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      [courseId]: { enrolled: true, completedLessons: [] },
    }));
  };

  const updateLessonProgress = (courseId: string, lessonId: string, completed: boolean) => {
    setUserProgress((prev) => {
      const courseProgress = prev[courseId] || { enrolled: true, completedLessons: [] };
      const updatedLessons = completed
        ? [...courseProgress.completedLessons, lessonId]
        : courseProgress.completedLessons.filter((id) => id !== lessonId);
      return {
        ...prev,
        [courseId]: { ...courseProgress, completedLessons: updatedLessons },
      };
    });
  };

  return (
    <CourseContext.Provider value={{ courses, userProgress, enrollInCourse, updateLessonProgress }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};