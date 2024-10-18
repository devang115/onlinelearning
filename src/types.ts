export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'text';
}

export interface UserProgress {
  [courseId: string]: {
    enrolled: boolean;
    completedLessons: string[];
  };
}