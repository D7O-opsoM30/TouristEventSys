
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { events } from '@/data/mockData';
import EventCard from '@/components/EventCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { List, Grid, Calendar } from 'lucide-react';
import HeroSearch from '@/components/HeroSearch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const EventListing = () => {
  const [searchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    categories: [] as string[],
    minRating: 0,
    startDate: '',
    endDate: '',
  });

  // Extract URL parameters
  useEffect(() => {
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const category = searchParams.get('category');
    
    // Apply initial filters from URL
    setFilters(prev => ({
      ...prev,
      categories: category ? [category] : [],
      startDate: date || '',
    }));
    
    // Apply the filters
    applyFilters({
      ...filters,
      categories: category ? [category] : filters.categories,
      startDate: date || filters.startDate,
    }, location);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [searchParams]);

  const applyFilters = (newFilters: any, locationQuery?: string | null) => {
    let result = [...events];
    
    // Filter by price
    if (newFilters.priceRange) {
      result = result.filter(
        event => event.price.general >= newFilters.priceRange[0] && 
                event.price.general <= newFilters.priceRange[1]
      );
    }
    
    // Filter by categories
    if (newFilters.categories && newFilters.categories.length > 0) {
      result = result.filter(
        event => newFilters.categories.includes(event.category)
      );
    }
    
    // Filter by rating
    if (newFilters.minRating > 0) {
      result = result.filter(
        event => event.rating >= newFilters.minRating
      );
    }
    
    // Filter by dates
    if (newFilters.startDate) {
      result = result.filter(
        event => new Date(event.date) >= new Date(newFilters.startDate)
      );
    }
    
    if (newFilters.endDate) {
      result = result.filter(
        event => new Date(event.date) <= new Date(newFilters.endDate)
      );
    }
    
    // Filter by location
    if (locationQuery) {
      const query = locationQuery.toLowerCase();
      result = result.filter(
        event => 
          event.location.city.toLowerCase().includes(query) ||
          event.location.country.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(result);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tourism-primary/90 to-tourism-primary py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Find Your Perfect Event</h1>
            <HeroSearch />
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{filteredEvents.length} Events Found</h2>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="hidden md:block">
                <Button
                  variant="outline"
                  size="icon"
                  className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`ml-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={20} />
                </Button>
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <List size={16} className="mr-2" /> 
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <FilterSidebar 
                      onFilter={handleFilterChange}
                      initialFilters={filters}
                      isMobile={true}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar onFilter={handleFilterChange} initialFilters={filters} />
              </div>
            </div>
            
            {/* Events Grid */}
            <div className="flex-grow">
              {filteredEvents.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria.</p>
                  <Button onClick={() => handleFilterChange({})}>
                    Clear all filters
                  </Button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-48 flex-shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                        <div className="text-gray-500 text-sm mb-2 flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <p className="text-gray-500 text-sm mb-4">{event.location.city}, {event.location.country}</p>
                        <p className="text-sm line-clamp-2 mb-4">{event.description}</p>
                        <div className="flex items-center mt-auto">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="ml-1 text-sm font-medium">{event.rating}</span>
                          </div>
                          <div className="ml-auto">
                            <span className="font-bold text-tourism-primary">
                              ${event.price.general}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventListing;
