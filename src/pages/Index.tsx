
import { useEffect } from 'react';
import HeroSearch from '@/components/HeroSearch';
import EventCard from '@/components/EventCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { events, categories } from '@/data/mockData';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get featured and trending events
  const featuredEvents = events.filter(event => event.featured).slice(0, 4);
  const trendingEvents = events.filter(event => event.trending).slice(0, 3);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-tourism-primary/90 to-tourism-primary text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Unforgettable Tourism Experiences</h1>
            <p className="text-xl text-white/80 mb-8">Find and book the most exciting events, tours, and adventures worldwide.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Events</h2>
            <Link to="/events">
              <Button variant="link" className="text-tourism-primary">View All Events</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map(event => (
              <div key={event.id} className="animate-slide-in">
                <EventCard event={event} featured={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingEvents.map(event => (
              <div key={event.id} className="animate-slide-in">
                <EventCard event={event} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/events">
              <Button className="bg-tourism-primary hover:bg-tourism-primary/90">
                Explore All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-tourism-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Host Your Own Event?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
            Join our community of event organizers and share your unique experiences with travelers from around the world.
          </p>
          <Link to="/organizer">
            <Button className="bg-tourism-secondary hover:bg-tourism-secondary/90 text-white">
              Become an Organizer
            </Button>
          </Link>
        </div>
      </section> */}
    </div>
  );
};

export default Index;
