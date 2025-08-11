const HeroSection = () => {
  return (
    <section className="!h-100vh !flex !flex-col !items-center !justify-center !bg-cover !bg-center !text-[--color-text] !mt-10 !px-4 sm:!px-6 md:!px-8">
      <div className="!w-full !max-w-6xl !mx-auto">
        <div className="!text-center !bg-gradient-to-br !from-[#f6d4cc] !to-[#e96e66] !px-10 !py-12 !rounded-lg !shadow-lg">
          <h1 className="!text-4xl md:!text-4xl lg:!text-5xl !font-['Playfair_Display'] !text-zinc-900 !mb-6">
            Your Next Story Awaits
          </h1>
          <p className="!text-xl md:!text-2xl !font-['Playfair_Display'] !text-zinc-800 !mb-8 max-w-2xl !mx-auto">
            Step into a curated collection of books where imagination takes center stage.
          </p>
          <a
            href="/products"
            className="!inline-flex !items-center !justify-center !px-8 !py-4 !text-lg !font-semibold !font-['Playfair_Display'] !rounded-lg !bg-[var(--color-gold)] !text-white !shadow-md !transition-transform !duration-300 hover:!scale-105 hover:!shadow-lg"
          >
            Start Exploring
            <svg
              className="ml-3 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;