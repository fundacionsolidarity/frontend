import { Text } from "../testimonios/interfaces/testimonios-http";

interface TestimonialProps {
  name: string;
  messages: Text[];
  index: number;
  icon: string;
}

export default function TestimonialCard({ name, messages, icon, index }: TestimonialProps) {
  const getCardClasses = (index: number) => {
    // Rotar entre algunos gradientes bonitos
    const colors = [
      'from-pink-100 to-red-100 hover:shadow-red-200',
      'from-blue-100 to-purple-100 hover:shadow-purple-200',
      'from-green-100 to-yellow-100 hover:shadow-yellow-200',
      'from-indigo-100 to-teal-100 hover:shadow-teal-200',
    ];
    return colors[index % colors.length];
  };
  return (
    <div
      className={`bg-gradient-to-br ${getCardClasses(index)} rounded-2xl shadow-lg p-6 text-center
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl-lg animate-fade-in-up`}
      style={{ animationDelay: `${0.15 * index}s` }}
    >
      <div className="text-6xl mb-4 text-purple-600 transform transition-transform duration-300 group-hover:scale-110">
        {  icon }
      </div>
      
      {messages.map((message, idx) => (
        <p key={idx} className="text-gray-800 text-base md:text-lg italic leading-relaxed mb-4">
          { message['children'][0].text }
        </p>
      ) )}
  
      <p className="text-gray-600 font-semibold text-sm">- {name}</p>
    </div>
  );
}
