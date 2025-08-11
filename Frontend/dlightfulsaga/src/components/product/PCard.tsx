import { useState, type FC } from "react";
import type { Book } from "@/context/Book";
import { AxiosError } from "axios";
import axios from "@/context/axiosInstance";
import { toast } from "react-hot-toast";

interface PCardProps {
  book: Book;
}

const PCard: FC<PCardProps> = ({ book }) => {

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
   <section>
  {/* Styled wrapper with strong enforced styling */}
  <div className="!bg-[#fdfcfb] !rounded-t-3xl !shadow-md !px-6 !py-8 md:!px-12 !max-w-6xl !mx-auto !mt-20">
    
    {/* Top section with image and title/author */}
    <div className="!flex !flex-col md:!flex-row !gap-10">
      <div className="!w-full md:!w-1/3 !flex !items-center !justify-center">
        <img
          src={book.coverImage}
          alt={book.title}
          className="!w-[220px] md:!w-[250px] !rounded-lg !shadow-xl"
        />
      </div>

      <div className="!w-full md:!w-2/3 !flex !flex-col !justify-center">
        <h1 className="!text-2xl md:!text-3xl !font-bold !text-gray-900">{book.title}</h1>
        <h2 className="!text-lg !text-gray-700 !mt-1 !mb-2"> Genre: {book.genre}</h2>
        <p className="!text-md !text-gray-600 !mb-4">
          {book.description?.slice(0, 200) ?? "No description available."}
        </p>
        <p className="!text-md !mb-6 !font-semibold !text-gray-900">₹{book.price}</p>

        {/* Action buttons */}
        <div className="!flex !flex-wrap !gap-3 !mt-2">
          <button className="!bg-emerald-700 !text-white !px-5 !py-2 !rounded-md hover:!bg-emerald-800"
          onClick={() => handleAddToCart(book)}>
           {added ? "Added" : "Add to Cart"}
          </button>
          <button className="!bg-yellow-600 !text-white !px-5 !py-2 !rounded-md hover:!bg-yellow-500">
            Wishlist
          </button>
        </div>
      </div>
    </div>

    {/* Divider */}
    <hr className="!my-6 !border-t !border-gray-500/60" />

    {/* Lower section: Description + Extras */}
    <div className="!flex !flex-col md:!flex-row !gap-8">
      {/* Left column - Full summary and author */}
      <div className="md:!w-2/3">
        <h3 className="!text-lg !font-semibold !mb-2 !text-gray-800">Description</h3>
        <p className="!text-md !text-gray-700 !leading-relaxed">{book.summary}</p>

        <p className="!mt-5 !text-md !font-medium !text-gray-800">
          Author: <span className="!font-normal !text-gray-800">{book.author}</span>
        </p>
      </div>

      {/* Right column - Book info */}
      <div className="md:!w-1/3 !flex !flex-col !gap-3">
        <p>
          <span className="!font-medium !text-gray-800">Ratings:</span>{" "}
          <span className="!text-gray-800">{book.ratings ?? "N/A"}</span>
        </p>
        <p>
          <span className="!font-medium !text-gray-800">Language: English (US)</span> 
        </p>
        <p>
          <span className="!font-medium !text-gray-800">Length: 345 pages</span> 
        </p>
        <p>
          <span className="!font-medium !text-gray-800">Paperback/Hardcover:</span>{" "}
          <a
            href="#"
            className="!text-blue-600 hover:!underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy on Amazon
          </a>
        </p>
      </div>
    </div>
  </div>
</section>

  );
};

export default PCard;
