import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/context/axiosInstance";
import { AxiosError } from "axios";
import type { Book } from "@/context/Book";
import PCard from "@/components/product/PCard";

const ProductPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/books/${id}`);
        setBook(res.data.book);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 404) {
          setError("Book not found.");
        } else {
          setError("Failed to load book.");
        }
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (error || !book) return <div className="p-6 text-red-600">{error || "Book not found"}</div>;

  return (
    <PCard book={book} />
  );
};

export default ProductPage;
