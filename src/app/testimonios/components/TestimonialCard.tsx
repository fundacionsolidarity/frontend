
import { Testimonio } from "../interfaces/testimonios-http";

interface TestimonialCardProps{
    testimonial: Testimonio;
    index: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  const { icon,  name, text } = testimonial;

  const getCardClasses = (idx: number) => {
    const colors = [
      'from-pink-100 to-red-100 hover:shadow-red-200',
      'from-blue-100 to-purple-100 hover:shadow-purple-200',
      'from-green-100 to-yellow-100 hover:shadow-yellow-200',
      'from-indigo-100 to-teal-100 hover:shadow-teal-200',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div
      className={`bg-gradient-to-br ${getCardClasses(index)} rounded-2xl shadow-lg p-6 text-center
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl-lg animate-fade-in-up`}
      style={{ animationDelay: `${0.15 * index}s` }}
    >
      <div className="text-6xl mb-4 text-purple-600 transform transition-transform duration-300 group-hover:scale-110">
        {icon || '💬'} {/* Fallback icon */}
      </div>
      {
        text.map( (tex, id) => (
            <p key={id} className="text-gray-800 text-base md:text-lg italic leading-relaxed mb-4">
                {tex['children'][0].text}
            </p>
        ))
      }
      <p className="text-gray-600 font-semibold text-sm">- {name || "Anónimo"}</p>
    </div>
  );
};