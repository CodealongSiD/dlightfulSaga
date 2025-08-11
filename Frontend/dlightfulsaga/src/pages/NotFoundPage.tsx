// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="min-h-screen !flex !flex-col !items-center !justify-center !bg-gradient-to-b from-emerald-800 to-emerald-900 !px-6">
      <h1 className="!text-7xl !font-bold !mb-8">404</h1>
      <p className="!text-2xl !font-semibold !font-serif !mb-8">
        Looks like the Joker stole this page!
      </p>

      <img
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXgyM2JkZTNzMnU0MmY1aDZ3ajBhZjc1eXFiOXMwdjJzYXQ0aG01ZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WuDtYz588aibu/giphy.gif"
        alt="Funny 404"
        className="w-140 h-100 !rounded-lg !shadow-lg !mb-8 !p-6"
      />

      <p className="!text-2xl !font-semibold !font-serif !mb-8">
        Fear not, Netizen. Batman will take you home! 
      </p>

      <Link
        to="/"
        className="!px-6 !py-3 !bg-yellow-400 !text-emerald-900 !rounded-lg !shadow-md !font-semibold !hover:bg-yellow-300 !transition-all"
      >
        Take me home →
      </Link>
    </section>
  );
}
