
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/formatDate';
import { useToast } from '@/hooks/use-toast';
import EventCard from '@/components/EventCard';
import ReviewForm from '@/components/ReviewForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<any | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Load event data
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const eventData = events.find(e => e.id === parseInt(id));
      if (eventData) {
        setEvent(eventData);
        
        // Find related events (same category)
        const related = events
          .filter(e => e.category === eventData.category && e.id !== eventData.id)
          .slice(0, 3);
        setRelatedEvents(related);
      } else {
        navigate('/events');
      }
    }
  }, [id, navigate]);
  
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading event...</h2>
        </div>
      </div>
    );
  }
  
  const handleTicketSelect = (type: string) => {
    setSelectedTicket(type);
  };
  
  const handleAddToCart = () => {
    if (!selectedTicket) {
      toast({
        title: "Please select a ticket type",
        description: "You need to select a ticket type before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Ticket added to cart",
      description: `${selectedTicket} ticket for ${event.title} has been added to your cart`,
    });
  };
  
  const handleSaveEvent = () => {
    toast({
      title: "Event saved",
      description: `${event.title} has been saved to your favorites`,
    });
  };

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };
  
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // We would typically refresh the reviews here after submission
  };
  
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Event Banner */}
      <div className="relative h-80 md:h-96">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <span className="bg-tourism-primary px-3 py-1 text-sm rounded-full mb-4 inline-block">
              {event.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>{event.location.city}, {event.location.country}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span>By {event.organizer.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({event.reviews.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="animate-fade-in">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
                    <li>Professional guidance throughout the experience</li>
                    <li>High-quality facilities and equipment</li>
                    <li>Safety measures in place</li>
                    <li>Memorable experiences with photo opportunities</li>
                    <li>Friendly and knowledgeable staff</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="font-medium">Duration</p>
                      <p>{event.time}</p>
                    </div>
                    <div>
                      <p className="font-medium">Group Size</p>
                      <p>Up to 20 people</p>
                    </div>
                    <div>
                      <p className="font-medium">Language</p>
                      <p>English</p>
                    </div>
                    <div>
                      <p className="font-medium">Accessibility</p>
                      <p>Wheelchair accessible</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="animate-fade-in">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Event Location</h2>
                  <div className="mb-4">
                    <h3 className="font-medium text-lg">{event.location.name}</h3>
                    <p className="text-gray-700">{event.location.address}</p>
                    <p className="text-gray-700">{event.location.city}, {event.location.country}</p>
                  </div>
                  
                  {/* Google Maps Embed (Static) */}
                  <div className="rounded-lg overflow-hidden h-80 bg-gray-100">
                    <iframe 
                      title="Event Location"
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${event.location.coordinates.lat},${event.location.coordinates.lng}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="animate-fade-in">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Reviews</h2>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < Math.floor(event.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-bold">{event.rating}</span>
                      <span className="ml-1 text-gray-500">({event.reviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Show review form if button clicked */}
                  {showReviewForm ? (
                    <div className="mb-8">
                      <ReviewForm 
                        eventId={event.id} 
                        onSuccess={handleReviewSubmitted} 
                        onCancel={() => setShowReviewForm(false)} 
                      />
                    </div>
                  ) : (
                    <Button 
                      className="w-full mb-8 bg-[#9b87f5] hover:bg-[#7E69AB]"
                      onClick={handleWriteReview}
                    >
                      Write Review
                    </Button>
                  )}
                  
                  <div className="space-y-6">
                    {event.reviews.map((review: any) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <img 
                            src={review.user.image} 
                            alt={review.user.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <p className="font-medium">{review.user.name}</p>
                            <p className="text-gray-500 text-sm">{formatDate(review.date)}</p>
                          </div>
                          <div className="flex ml-auto">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Related Events */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-6">Similar Events You Might Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map(relatedEvent => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Book This Event</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Select Ticket Type</h3>
                  
                  <div 
                    className={`border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${selectedTicket === 'General' ? 'border-tourism-primary bg-tourism-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => handleTicketSelect('General')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">General Admission</h4>
                        <p className="text-sm text-gray-500">Standard access to the event</p>
                      </div>
                      <span className="font-bold">${event.price.general}</span>
                    </div>
                  </div>
                  
                  {event.price.vip && (
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedTicket === 'VIP' ? 'border-tourism-primary bg-tourism-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => handleTicketSelect('VIP')}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">VIP Experience</h4>
                          <p className="text-sm text-gray-500">Premium access with special perks</p>
                        </div>
                        <span className="font-bold">${event.price.vip}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full bg-tourism-primary hover:bg-tourism-primary/90 mb-3"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSaveEvent}
                >
                  Save for Later
                </Button>
              </div>
              
              {/* Organizer Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Event Organizer</h2>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={event.organizer.image} 
                    alt={event.organizer.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{event.organizer.name}</h3>
                    <p className="text-sm text-gray-500">Event Host</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">
                  Professional organizer with expertise in creating memorable tourism experiences.
                </p>
                
                <Button variant="outline" className="w-full">
                  Contact Organizer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
