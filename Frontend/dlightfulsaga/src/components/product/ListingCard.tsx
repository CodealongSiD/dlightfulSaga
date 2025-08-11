import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import type { Book } from "@/context/Book";
import { Heart } from "lucide-react";
import { AxiosError } from "axios";
import axios from "@/context/axiosInstance";
import { toast } from "react-hot-toast";


interface Props {
  book: Book;
}

const ListingCard: FC<Props> = ({ book }) => {

  const [added, setAdded] = useState(false);

  const handleAddToCart = async (book: Book) => {
  try {
    const res = await axios.post("/cart", {
      bookId: book._id,
    });

    toast.success("Book added to cart!" + res.data.message);
    setAdded(true);
  } catch (err: unknown) {
  const axiosError = err as AxiosError;

  if (axiosError.response?.status === 409) {
    toast.error("Book already in cart!");
  } else {
    toast.error("Failed to add to cart.");
    console.error(axiosError);
  }
  }
  };
  return (
    <div className="flex flex-col rounded-md border border-gray-100 bg-zinc-800 hover:!bg-zinc-700 p-2 shadow-sm max-w-sm mx-auto">
      {/* Image and wishlist */}
      <div className="relative w-full overflow-hidden rounded-md">
        {/* ✅ Clickable Image */}
        <Link to={`/product/${book._id}`}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-64 w-full object-contain bg-zinc-100 !transition !duration-500 hover:!scale-105 sm:h-72"
          />
        </Link>

        <button className="absolute right-3 top-3 !z-10 !rounded-full !bg-zinc-100 !p-1.5 !text-emerald-900 !transition hover:!text-gray-900">
          <span className="sr-only">Wishlist</span>
          <Heart className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Book Info */}
      <div className="flex flex-col justify-between flex-1 gap-2 !mt-2 !px-4">
        {/* ✅ Clickable Title */}
        <Link to={`/product/${book._id}`}>
          <h3 className="text-[var(--color-gold)] font-semibold text-base leading-snug line-clamp-2 hover:underline">
            {book.title}
          </h3>
        </Link>

        <p className="!text-zinc-100 text-sm">₹{book.price}</p>

        <button className="!my-1.5 w-full !rounded-sm !bg-yellow-300/80 !py-1 text-sm font-medium text-gray-900 !mb-3 !transition hover:scale-[1.02]"
        onClick={() => handleAddToCart(book)}
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
