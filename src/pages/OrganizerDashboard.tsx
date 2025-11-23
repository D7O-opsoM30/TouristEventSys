
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { organizerEvents, organizerStats } from '@/data/mockData';
import { formatDate } from '@/utils/formatDate';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  MoreVertical,
  Edit,
  Trash,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

const OrganizerDashboard = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleDeleteEvent = (eventId: number, eventName: string) => {
    if (confirm(`Are you sure you want to delete ${eventName}?`)) {
      // In a real app, this would make an API call
      toast({
        title: "Event deleted",
        description: `${eventName} has been deleted`,
      });
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-tourism-dark to-tourism-dark/90 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Organizer Dashboard</h1>
              <p className="text-white/80">Manage your events, track performance, and grow your business</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-tourism-secondary hover:bg-tourism-secondary/90 text-white" asChild>
                <Link to="/organizer/create-event">
                  Create New Event
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-tourism-primary/10 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-tourism-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Events</p>
                  <h3 className="text-2xl font-bold">{organizerStats.totalEvents}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-tourism-secondary/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-tourism-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Attendees</p>
                  <h3 className="text-2xl font-bold">{organizerStats.totalAttendees.toLocaleString()}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-tourism-accent/10 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-tourism-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${organizerStats.totalRevenue.toLocaleString()}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upcoming Events</p>
                  <h3 className="text-2xl font-bold">{organizerStats.upcomingEvents}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Events Table */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Your Events</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-medium">Event Name</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Location</th>
                  <th className="text-left p-4 font-medium">Attendees</th>
                  <th className="text-left p-4 font-medium">Revenue</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizerEvents.map((event) => (
                  <tr key={event.id} className="border-t">
                    <td className="p-4 font-medium">{event.name}</td>
                    <td className="p-4 text-gray-600">{formatDate(event.date)}</td>
                    <td className="p-4 text-gray-600">{event.location}</td>
                    <td className="p-4">{event.attendees.toLocaleString()}</td>
                    <td className="p-4">${event.revenue.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Upcoming' 
                          ? 'bg-blue-100 text-blue-800' 
                          : event.status === 'Ongoing'
                            ? 'bg-green-100 text-green-800'
                            : event.status === 'Completed'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/events/${event.id}`} className="flex items-center">
                              <Eye size={14} className="mr-2" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/organizer/edit-event/${event.id}`} className="flex items-center">
                              <Edit size={14} className="mr-2" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteEvent(event.id, event.name)}
                          >
                            <Trash size={14} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t text-center">
            <Button variant="outline" asChild>
              <Link to="/organizer/create-event">
                Add New Event
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganizerDashboard;
