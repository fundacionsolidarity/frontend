// app/components/BlogCard.tsx

import Image from "next/image";

interface BlogCardProps {
  title: string;
  summary: string[];
  imageUrl: string;
  date: Date;
}

export default function BlogCard({ title, summary, imageUrl, date }: BlogCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden">
        <Image 
            width={400} 
            height={400} 
            priority
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover" 
        />
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">
            {new Date(date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })}
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        { 
          summary.map( (s, index) => (
             <p key={ index } className="text-gray-600 mb-4">{s}</p>
          ))          
        }
        <button className="text-blue-600 font-medium hover:underline">Leer más</button>
      </div>
    </div>
  );
}
