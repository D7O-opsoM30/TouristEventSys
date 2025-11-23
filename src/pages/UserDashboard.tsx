
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { events as allEvents } from '@/data/mockData';
import { formatDate } from '@/utils/formatDate';
import { Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface TicketUI {
  id: string;
  eventId: number;
  eventName: string;
  eventDate: string | Date;
  eventLocation: string;
  ticketType: string;
  ticketPrice: number;
  purchaseDate: string | Date;
  eventImage: string;
  qrCode: string;
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState<TicketUI | null>(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [tickets, setTickets] = useState<TicketUI[]>([]);
  const { currentUser, removeSavedEvent } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/user/tickets', { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        const ui: TicketUI[] = (data.tickets || []).map((t: any) => {
          const ev = allEvents.find(e => e.id === t.eventId);
          return {
            id: t._id,
            eventId: t.eventId,
            eventName: ev?.title || `Event #${t.eventId}`,
            eventDate: ev?.date || new Date(),
            eventLocation: ev ? `${ev.location.city}, ${ev.location.country}` : '—',
            ticketType: t.ticketType,
            ticketPrice: t.ticketPrice,
            purchaseDate: t.purchaseDate,
            eventImage: ev?.image || 'https://via.placeholder.com/300x200?text=Event',
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`TICKET:${t._id}`)}`,
          } as TicketUI;
        });
        setTickets(ui);
      } catch {}
    };
    fetchTickets();
  }, []);

  const handleOpenTicket = (ticket: TicketUI) => {
    setSelectedTicket(ticket);
    setTicketModalOpen(true);
  };

  const savedIds = currentUser?.savedEventIds || [];
  const savedEventsList = allEvents.filter(e => savedIds.includes(e.id));

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-tourism-primary/90 to-tourism-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
              <p className="text-white/80">Manage your tickets, saved events, and profile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold">{currentUser?.name || 'Guest'}</h2>
                  <p className="text-gray-500 mb-4">{currentUser?.email || ''}</p>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4 text-gray-700">Dashboard Links</h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="#tickets" 
                        className={`block p-2 rounded ${activeTab === 'tickets' ? 'bg-tourism-primary/10 text-tourism-primary font-medium' : 'hover:bg-gray-100'}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('tickets'); }}
                      >
                        My Tickets
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#saved" 
                        className={`block p-2 rounded ${activeTab === 'saved' ? 'bg-tourism-primary/10 text-tourism-primary font-medium' : 'hover:bg-gray-100'}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('saved'); }}
                      >
                        Saved Events
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#account" 
                        className={`block p-2 rounded ${activeTab === 'account' ? 'bg-tourism-primary/10 text-tourism-primary font-medium' : 'hover:bg-gray-100'}`}
                        onClick={(e) => { e.preventDefault(); setActiveTab('account'); }}
                      >
                        Account Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <Tabs defaultValue="tickets" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                  <TabsTrigger value="saved">Saved Events</TabsTrigger>
                  <TabsTrigger value="account">Account Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tickets" className="animate-fade-in">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Your Tickets</h2>
                    
                    {tickets.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">You don't have any tickets yet</p>
                        <Button asChild>
                          <a href="/events">Browse Events</a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tickets.map(ticket => (
                          <div key={ticket.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row">
                            <div className="sm:w-32 h-32 flex-shrink-0">
                              <img 
                                src={ticket.eventImage}
                                alt={ticket.eventName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                              <h3 className="font-medium text-lg mb-1">{ticket.eventName}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <Calendar size={14} className="mr-1" />
                                <span>{formatDate(ticket.eventDate)}</span>
                              </div>
                              <p className="text-gray-500 text-sm mb-2">{ticket.eventLocation}</p>
                              <div className="mt-auto flex items-center justify-between">
                                <div>
                                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium mr-2">
                                    {ticket.ticketType}
                                  </span>
                                  <span className="text-tourism-primary font-medium">
                                    ${ticket.ticketPrice}
                                  </span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleOpenTicket(ticket)}
                                >
                                  View Ticket
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="saved" className="animate-fade-in">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Saved Events</h2>
                    
                    {savedEventsList.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">You don't have any saved events</p>
                        <Button asChild>
                          <a href="/events">Browse Events</a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedEventsList.map(event => (
                          <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row">
                            <div className="sm:w-32 h-32 flex-shrink-0">
                              <img 
                                src={event.image} 
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                              <h3 className="font-medium text-lg mb-1">{event.title}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                <Calendar size={14} className="mr-1" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <p className="text-gray-500 text-sm mb-2">{event.location.city}, {event.location.country}</p>
                              <div className="mt-auto flex items-center justify-between">
                                <div>
                                  <span className="text-xs text-gray-500">
                                    Rating {event.rating}
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeSavedEvent(event.id)}
                                  >
                                    Remove
                                  </Button>
                                  <Button 
                                    size="sm"
                                    asChild
                                  >
                                    <a href={`/events/${event.id}`}>View Event</a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="account" className="animate-fade-in">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              value={(currentUser?.name || 'John Doe').split(' ')[0]}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              value={(currentUser?.name || 'John Doe').split(' ').slice(1).join(' ') || ''}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                              type="email" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              value={currentUser?.email || ''}
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input 
                              type="tel" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              placeholder="Add phone"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input 
                              type="password" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              placeholder="••••••••"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input 
                              type="password" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              placeholder="••••••••"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input 
                              type="password" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tourism-primary"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end space-x-3">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-tourism-primary hover:bg-tourism-primary/90">Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ticket Modal */}
      <Dialog open={ticketModalOpen} onOpenChange={setTicketModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="py-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium mb-1">{selectedTicket.eventName}</h3>
                <p className="text-gray-500 text-sm">{formatDate(selectedTicket.eventDate)} • {selectedTicket.eventLocation}</p>
              </div>
              
              <div className="flex justify-center mb-6">
                <img 
                  src={selectedTicket.qrCode} 
                  alt="Ticket QR Code"
                  className="w-48 h-48"
                />
              </div>
              
              <div className="border-t border-b py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ticket Type</span>
                  <span className="font-medium">{selectedTicket.ticketType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium">${selectedTicket.ticketPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Purchase Date</span>
                  <span className="font-medium">{formatDate(selectedTicket.purchaseDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ticket ID</span>
                  <span className="font-medium">#{selectedTicket.id.toString().slice(-6).padStart(6, '0')}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button className="w-full" onClick={() => setTicketModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
