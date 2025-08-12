// src/pages/Orders.tsx
import type { Order } from "@/context/OrderTypes";
import { useEffect, useState } from "react";
import type { Book } from "@/context/Book";
import axiosInstance from "@/context/axiosInstance";

const Orders = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
    
        const res = await axiosInstance.get<Order[]>("/orders");
         console.log("Fetched orders response:", res.data);

        const allBooks = res.data.flatMap((order) => order.books);
        setBooks(allBooks);
      } catch (err) {
        console.error("Failed to fetch orders:", err)
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="!px-4 !py-8 !mb-12 xl:!ml-50">
      <h1 className="!text-2xl !font-semibold !mb-6 !mt-8 ">Your Orders</h1>

      {books.length === 0 ? (
        <p className="!text-gray-500">You haven't ordered any books yet.</p>
      ) : (
        <div className="!grid !gap-4 !bg-zinc-800">
          {books.map((book) => (
            <div
              key={book._id}
              className="!flex !items-center !gap-4 !p-4 !rounded-xl !shadow !flex-col sm:!flex-row"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 !object-cover !rounded"
              />
              <div className="!flex-1 !mt-2 sm:!mt-0">
                <h2 className="!text-lg !font-medium">{book.title}</h2>
              </div>
              <a
                href={`/ebooks/${book._id}.pdf`}
                download
                className="!bg-blue-600 !text-white !px-4 !py-2 !rounded !hover:bg-blue-700 !transition !mt-4 sm:!mt-0"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
