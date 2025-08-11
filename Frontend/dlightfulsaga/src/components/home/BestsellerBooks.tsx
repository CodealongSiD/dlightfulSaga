import { useNavigate } from "react-router-dom";
import type { Book } from "@/context/Book";

interface BestsellerBooksProps {
  books: Book[];
}

const BestsellerBooks = ({ books }: BestsellerBooksProps) => {
  const navigate = useNavigate();

  return (
    <section className="!w-full !px-6 !py-10">
      <h2 className="!text-xl sm:!text-2xl md:!text-3xl !font-semibold !mb-6 !text-white lg:!text-center lg:!pr-150">
        🔥 Bestselling Books
      </h2>

      <div className="!flex !flex-col !space-y-6 !gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/product/${book._id}`)}
            className="!w-full !max-w-4xl !mx-auto !flex !flex-col sm:!flex-row !bg-zinc-800 hover:!bg-white/20 !text-white !rounded-xl !overflow-hidden !border !border-white/20 !cursor-pointer !transition !duration-200"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full sm:w-1/3 h-64 sm:h-auto object-cover rounded-l-xl"
            />
            <div className="!flex !flex-col !justify-top !p-6 !text-left !w-full sm:!w-2/3 sm:!pl-6">
              <h3 className="!text-2xl sm:!text-3xl !font-serif !font-bold !mb-2">
                {book.title}
              </h3>
              <p className="!text-md sm:!text-lg !text-[--color-gold] !font-medium">
                Author: {book.author}
              </p>
              <p className="!text-sm !italic !mt-3">🔥 Top Picks</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestsellerBooks;
