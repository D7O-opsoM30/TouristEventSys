
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/data/mockData';

const HeroSearch = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (location) params.append('location', location);
    if (date) params.append('date', date);
    if (category) params.append('category', category);
    
    navigate(`/events?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <Input 
          type="text" 
          placeholder="Any location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <Input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Any category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any category</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <Button onClick={handleSearch} className="bg-tourism-primary hover:bg-tourism-primary/90 w-full md:w-auto">
          Search Events
        </Button>
      </div>
    </div>
  );
};

export default HeroSearch;
