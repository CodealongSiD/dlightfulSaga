// src/components/home/UpcomingReleaseCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";


interface NewReleaseBook {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  // include other fields if needed
}

interface Props {
  newRelease: NewReleaseBook;
}

const UpcomingReleaseCard: React.FC<Props> = ({ newRelease }) => {
  const navigate = useNavigate();

  if (!newRelease) return null;

  return (
    <section id="upcoming" className="!w-full !px-6 !py-10">
      <h2 className="!text-xl sm:!text-2xl md:!text-3xl !font-semibold !mb-6 !text-white lg:!text-center lg:!pr-150">
        ⭐ New Releases
      </h2>
      
      <div
        onClick={() => navigate(`/product/${newRelease._id}`)}
        className="!w-full !max-w-4xl !mx-auto flex flex-col sm:flex-row !bg-zinc-800 hover:!bg-white/20 text-white rounded-xl overflow-hidden !border !border-white/20 cursor-pointer transition duration-200"
      >
        <img
          src={newRelease.coverImage}
          alt={newRelease.title}
          className="w-full sm:w-1/3 h-64 sm:h-auto object-cover rounded-l-xl"
        />

        <div className="flex flex-col justify-top !p-6 text-left w-full sm:w-2/3 !pl-2 sm:!pl-6">
          <h3 className="!text-2xl sm:!text-3xl !font-serif !font-bold !mb-2">
            {newRelease.title}
          </h3>
          <p className="!text-md sm:!text-lg !text-[--color-gold] !font-medium">
            Author: {newRelease.author}
          </p>
          <p className="!text-sm !italic !mt-3">🆕 New Launch</p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingReleaseCard;
