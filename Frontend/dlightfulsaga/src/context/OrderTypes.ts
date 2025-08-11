import type { Book } from "@/context/Book";

export interface Order {
  _id: string;
  user: string; // userId
  books: Book[];
  createdAt: string;
  updatedAt: string;
}