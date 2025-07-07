import ProductCard from "@/components/product/ProductCard";

const dummyBooks = [
  {
    id: 1,
    title: "The Wandering Flame",
    author: "Aurelia Nyx",
    price: 399,
    image: "https://via.placeholder.com/300x400?text=Book+1",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Echoes of the Hollow",
    author: "Lioren Vale",
    price: 299,
    image: "https://via.placeholder.com/300x400?text=Book+2",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Chronicles of Dust",
    author: "Elira Frost",
    price: 499,
    image: "https://via.placeholder.com/300x400?text=Book+3",
    rating: 4.8,
  },
  {
    id: 4,
    title: "The Forgotten Tome",
    author: "Cassian Ember",
    price: 349,
    image: "https://via.placeholder.com/300x400?text=Book+4",
    rating: 4.7,
  },

  {
    id: 5,
    title: "The Forgotten Tome: Lana Lost",
    author: "Cassian Ember",
    price: 249,
    image: "https://via.placeholder.com/300x400?text=Book+5",
    rating: 4.6,
  },

  {
    id: 6,
    title: "The Forgotten Tome: Entrailed",
    author: "Cassian Ember",
    price: 449,
    image: "https://via.placeholder.com/300x400?text=Book+6",
    rating: 4.5,
  },

];

const PopularBooks = () => {
  return (
    <section id="popular" className="!py-16 !px-4 !sm:px-8 !bg-[--color-bg] !text-[--color-text]">
      <h2 className="!text-3xl !sm:text-4xl !font-[--font-serif] !text-[--color-gold] !mb-10 !text-center">
        Popular Books
      </h2>
      <div className="!grid !grid-cols-1 !sm:grid-cols-2 !md:grid-cols-3 !lg:grid-cols-4 !gap-6 !p-2 !max-w-7xl !mx-auto">
        {dummyBooks.map((book) => (
          <ProductCard key={book.id} {...book}/>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
