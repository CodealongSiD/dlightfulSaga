import { useEffect, useState } from "react";
import axios from "@/context/axiosInstance";
import type { Book } from "@/context/Book";
import ListingCard from "@/components/product/ListingCard";

const ProductListPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        setBooks(res.data.books);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <main className="!px-4 sm:!px-6 md:!px-6 lg:!px-8 !py-6 flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {books.map((book) => (
            <ListingCard key={book._id} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
