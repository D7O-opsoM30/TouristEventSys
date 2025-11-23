
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';
import CategoryCard from '@/components/CategoryCard';
import { FileText } from 'lucide-react';

const Categories = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#9b87f5]/90 to-[#9b87f5] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">استكشف فئات الفعاليات</h1>
            <p className="text-xl text-white/80">
              Discover the rich cultural heritage and modern attractions of Saudi Arabia
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="animate-slide-in">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="py-16 bg-[#E5DEFF]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#1A1F2C]">Explore Saudi Arabia's Wonders</h2>
              <p className="text-lg mb-4 text-gray-700">
                From the ancient heritage of AlUla to the modern marvels of Riyadh and the pristine beaches of the Red Sea, Saudi Arabia offers an incredible diversity of experiences.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Our carefully curated categories help you discover the perfect events and activities across the Kingdom. Whether you're seeking cultural immersion, thrilling desert adventures, or world-class festivals, you'll find it here.
              </p>
              <Link 
                to="/events" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#9b87f5] text-white rounded-md hover:bg-[#7E69AB] transition-colors"
              >
                <FileText size={20} />
                Browse All Events
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#9b87f5]">Popular Categories</h3>
              <ul className="space-y-4">
                {categories.slice(0, 5).map((category) => (
                  <li key={category.id} className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#E5DEFF] flex items-center justify-center">
                      <img 
                        src={category.icon} 
                        alt={category.name} 
                        className="w-5 h-5"
                      />
                    </span>
                    <span className="font-medium">{category.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
