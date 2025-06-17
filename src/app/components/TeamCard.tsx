
import Image from "next/image";
import React from "react";

type TeamCardProps = {
  name: string;
  role: string;
  imageUrl: string;
  description?: string;
};

export default function TeamCard({ name, role, imageUrl, description }: TeamCardProps) {
  return (
    <div

      className="bg-white rounded-3xl shadow-xl p-6 text-center transform transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl animate-fade-in-up"
      style={{ animationDelay: `${0.2 * 1}s` }}
    >
      <Image
        src={imageUrl}
        width={400}
        height={400}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-300 shadow-md"
      />
      <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-purple-600 font-semibold mb-3">{role}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
