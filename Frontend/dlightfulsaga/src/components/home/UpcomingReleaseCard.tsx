// src/components/home/UpcomingReleaseCard.tsx

import React from 'react';

interface UpcomingReleaseProps {
  title: string;
  author: string;
  image: string;
  releaseDate: string;
}

const UpcomingReleaseCard: React.FC<UpcomingReleaseProps> = ({
  title,
  author,
  image,
  releaseDate,
}) => {
  return (
    <div className="rounded-lg bg-white/10 !p-4 text-white border text-center border-white/20 w-full h-full">
      <img src={image} alt={title} className="w-68 h-48 object-cover rounded-md my-2" />
      /* Here we will use flex and divide into 2 half image and content */
      <h3 className="mt-3 !text-lg !font-serif">{title}</h3>
      <p className="!text-sm !text-[gold]">{author}</p>
      <p className="!text-xs !mt-1 !italic">Coming Soon! {releaseDate}</p>
    </div>
  );
};

export default UpcomingReleaseCard;
