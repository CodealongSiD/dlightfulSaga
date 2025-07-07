//import banner from "@/assets/banner.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative h-[100vh] flex items-center justify-center bg-cover bg-center text-[--color-text]"
      //  style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="text-center bg-[#C5BDAC80] !p-6 !rounded">
        <h1 className="!text-4xl !md:text-4xl !lg:text-5xl !font-[--font-serif] !text-[--color-gold] !mb-4">
          Discover Indie Fiction
        </h1>
        <p className="!text-2xl !font-[--font-sans] !mb-6">
          Dive into the world of untold stories.
        </p>
        <a
          href="#"
          className="!animate-background block rounded-full !bg-gradient-to-r from-green-300 via-blue-600 to-red-300 bg-[length:_400%_400%] !p-1 [animation-duration:_6s]"
        >
          <span className="!block rounded-full !bg-white !px-10 !py-4 !text-lg !font-medium">
            {" "}
            Browse Books 👋{" "}
          </span>
        </a>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </section>
  );
};

export default HeroSection;
