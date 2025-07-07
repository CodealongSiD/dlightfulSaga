import HeroSection from "@/components/home/HeroSection";
import PopularBooks from "@/components/home/PopularBooks";
import UpcomingReleaseCard from "@/components/home/UpcomingReleaseCard";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

const HomePage = () => {
  return (
    <div className="bg-[--color-bg] text-[--color-text] font-[--font-sans]">
      <Navbar />
      <main>
        <HeroSection />
        <section id="popular" className="px-6 py-10">
          <PopularBooks />
        </section>
        <section id="upcoming" className="px-6 py-10">
          <UpcomingReleaseCard
            title="Upcoming Book Title"
            author="Author Name"
            image="image-url.jpg"
            releaseDate="Release Date"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
