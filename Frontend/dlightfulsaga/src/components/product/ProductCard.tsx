interface ProductProps {
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
}

const ProductCard = ({ title, author, price, image, rating }: ProductProps) => {
  return (
    <div className="bg-white text-black rounded !px-4 !py-2 shadow-lg overflow-hidden hover:scale-105 transition transform duration-200">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{author}</p>
        <div className="mt-2 text-[--color-gold] font-bold">₹{price}</div>
        <div className="text-sm text-gray-500">⭐ {rating}</div>
      </div>
    </div>
  );
};

export default ProductCard;
