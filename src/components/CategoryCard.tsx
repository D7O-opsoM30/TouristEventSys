
import { Link } from 'react-router-dom';
import { Category } from '@/data/mockData';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/events?category=${category.name}`}>
      <div className="relative group overflow-hidden rounded-lg h-40">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
