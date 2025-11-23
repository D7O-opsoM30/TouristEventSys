
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  onFilter: (filters: any) => void;
  initialFilters?: any;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const FilterSidebar = ({ 
  onFilter, 
  initialFilters = {}, 
  isMobile = false,
  onCloseMobile 
}: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters.priceRange || [0, 1000]
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.categories || []
  );
  const [selectedRating, setSelectedRating] = useState<number>(
    initialFilters.minRating || 0
  );
  const [dateRange, setDateRange] = useState({
    start: initialFilters.startDate || '',
    end: initialFilters.endDate || '',
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      categories: selectedCategories,
      minRating: selectedRating,
      startDate: dateRange.start,
      endDate: dateRange.end,
    });
    
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleClearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedRating(0);
    setDateRange({ start: '', end: '' });
    
    onFilter({});
    
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${isMobile ? 'w-full' : 'w-full md:w-64'}`}>
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onCloseMobile}>
            Close
          </Button>
        </div>
      )}
      
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider 
              defaultValue={priceRange}
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">${priceRange[0]}</span>
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <Checkbox 
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={() => handleCategoryToggle(category.name)}
                />
                <label 
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Date Range */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Date Range</h3>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-600 block mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={dateRange.start}
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 block mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        {/* Rating */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Minimum Rating</h3>
          <div className="flex flex-wrap gap-2">
            {[0, 3, 3.5, 4, 4.5].map((rating) => (
              <button
                key={rating}
                className={`px-3 py-1 text-sm rounded ${
                  selectedRating === rating 
                    ? 'bg-tourism-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedRating(rating)}
              >
                {rating > 0 ? `${rating}+` : 'Any'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 pt-4">
          <Button 
            onClick={handleApplyFilters}
            className="bg-tourism-primary hover:bg-tourism-primary/90"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
