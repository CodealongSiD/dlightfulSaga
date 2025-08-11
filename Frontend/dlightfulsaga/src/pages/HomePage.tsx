import HeroSection from "@/components/home/HeroSection";
import PopularBooks from "@/components/home/PopularBooks";
import UpcomingReleaseCard from "@/components/home/UpcomingReleaseCard";
import { useEffect, useState } from "react";
import axios from "@/context/axiosInstance";
import type { Book } from "@/context/Book";
import BestsellerBooks from "@/components/home/BestsellerBooks";


const HomePage = () => {
  const [bestsellers, setBestsellers] = useState<Book[]>([]);
  const [popular, setPopular] = useState<Book[]>([]);
  const [newRelease, setNewRelease] = useState<Book | null>(null);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books/categories");
        setBestsellers(res.data.bestsellers);
        setPopular(res.data.popular);
        setNewRelease(res.data.newRelease);
      } catch (err) {
        console.error("Failed to fetch categorized books:", err);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className="bg-[--color-bg] text-[--color-text] font-[--font-sans] overflow-x-hidden">
      <main>
        <HeroSection />
        <section id="bestsellers">
          <BestsellerBooks books={bestsellers} />
        </section>
          <section id="popular">
            <PopularBooks books={popular} />
          </section>
          <section id="upcoming">
          {newRelease && <UpcomingReleaseCard newRelease={newRelease} />}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
