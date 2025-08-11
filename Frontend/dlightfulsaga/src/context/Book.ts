// src/context/types/Book.ts

export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  summary: string;
  genre: string[]; // Array of strings
  price: number;
  coverImage: string; // URL or relative path
  stock: number;
  ratings: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number; // optional Mongoose version key
}

// Categorized response structure used on homepage
export interface CategorizedBooks {
  bestsellers: Book[];
  popular: Book[];
  newRelease: Book | null;
}
// src/context/Book.ts