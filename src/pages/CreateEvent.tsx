
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/EventCard';

const CreateEvent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    locationName: '',
    address: '',
    city: '',
    country: '',
    priceGeneral: '',
    priceVip: '',
    category: '',
    image: null as File | null,
    imagePreview: '',
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.date || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to create the event
    toast({
      title: "Event created successfully",
      description: "Your new event has been created and will be published soon",
    });
    
    setTimeout(() => {
      navigate('/organizer');
    }, 1500);
  };
  
  // Create a preview event object for the card
  const previewEvent = {
    id: 999,
    title: formData.title || 'Event Title',
    description: formData.description || 'Event description will appear here...',
    image: formData.imagePreview || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    date: formData.date || '2025-06-15',
    time: formData.time || '10:00 AM - 8:00 PM',
    location: {
      name: formData.locationName || 'Venue Name',
      address: formData.address || '123 Main Street',
      city: formData.city || 'City',
      country: formData.country || 'Country',
      coordinates: { lat: 0, lng: 0 },
    },
    price: {
      general: formData.priceGeneral ? parseFloat(formData.priceGeneral) : 25,
      vip: formData.priceVip ? parseFloat(formData.priceVip) : undefined,
    },
    category: formData.category || 'Category',
    organizer: {
      name: 'Your Organization',
      image: 'https://github.com/shadcn.png',
    },
    rating: 0,
    reviews: [],
    featured: false,
    trending: false,
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-tourism-dark to-tourism-dark/90 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Event</h1>
          <p className="text-white/80">Fill out the form to create and publish your event</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    {/* Basic Information */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Title <span className="text-red-500">*</span>
                          </label>
                          <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter event title"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                          </label>
                          <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your event"
                            rows={5}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleSelectChange('category', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Image
                          </label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Recommended size: 1200x800px, max 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Date and Time */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Date and Time</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                          </label>
                          <Input
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            placeholder="e.g. 10:00 AM - 2:00 PM"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Location</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Venue Name
                          </label>
                          <Input
                            name="locationName"
                            value={formData.locationName}
                            onChange={handleInputChange}
                            placeholder="e.g. City Convention Center"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street address"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <Input
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="City"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <Input
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pricing */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Ticket Pricing</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            General Admission Price ($)
                          </label>
                          <Input
                            type="number"
                            min="0"
                            name="priceGeneral"
                            value={formData.priceGeneral}
                            onChange={handleInputChange}
                            placeholder="e.g. 25"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            VIP Price ($) (optional)
                          </label>
                          <Input
                            type="number"
                            min="0"
                            name="priceVip"
                            value={formData.priceVip}
                            onChange={handleInputChange}
                            placeholder="e.g. 50"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Form Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" type="button" onClick={() => navigate('/organizer')}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-tourism-primary hover:bg-tourism-primary/90">
                        Create Event
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Event Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Event Preview</h2>
              <EventCard event={previewEvent} />
              
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                <h3 className="font-medium mb-2">Publishing Information</h3>
                <p className="text-sm">
                  Your event will be reviewed before being published. This typically takes 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateEvent;
