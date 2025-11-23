export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: {
    general: number;
    vip?: number;
  };
  category: string;
  organizer: {
    name: string;
    image: string;
  };
  rating: number;
  reviews: {
    id: number;
    user: {
      name: string;
      image: string;
    };
    rating: number;
    text: string;
    date: string;
  }[];
  featured: boolean;
  trending: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Cultural",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    icon: "/icons/cultural.svg"
  },
  {
    id: 2,
    name: "Heritage Sites",
    image: "https://hub.wtm.com/wp-content/uploads/2021/10/al-turaif-760x475@2x.png",
    icon: "/icons/heritage.svg"
  },
  {
    id: 3,
    name: "Desert Adventures",
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    icon: "/icons/desert.svg"
  },
  {
    id: 4,
    name: "Festivals",
    image: "https://www.datocms-assets.com/66357/1696514054-mdl_beast_jb_2022_12_01_21_2833-6505_alivecoverage.webp?auto=format&fit=max&w=3840&q=75",
    icon: "/icons/festival.svg"
  },
  {
    id: 5,
    name: "Modern Cities",
    image: "https://dom-publishers.com/cdn/shop/articles/iStock-1264361225_1024x1024.jpg?v=1709557130",
    icon: "/icons/city.svg"
  },
  {
    id: 6,
    name: "Culinary",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    icon: "/icons/food.svg"
  },
];

export const events: Event[] = [
  {
    id: 1,
    title: "Riyadh Heritage Festival",
    description: "Explore the heritage of Saudi Arabia through traditional music, folk dance performances, artisan showcases, and authentic Saudi cuisine. The event highlights local crafts and offers hands-on workshops in Najdi embroidery, Sadu weaving, and sword dancing.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/66/6a/be/photo2jpg.jpg?w=1200&h=-1&s=1",
    date: "2025-06-15",
    time: "4:00 PM - 11:00 PM",
    location: {
      name: "Al-Masmak Fortress",
      address: "Al Imam Turki Ibn Abdullah Rd",
      city: "Riyadh",
      country: "Saudi Arabia",
      coordinates: {
        // 24.767406814750974, 
        lat: 24.6319,
        lng: 46.7196,
      },
    },
    price: {
      general: 30,
      vip: 60,
    },
    category: "Cultural",
    organizer: {
      name: "Saudi Heritage Commission",
      image: "https://images.unsplash.com/photo-1581091012184-50f37b02a1a6?auto=format&fit=crop&w=100&q=80",
    },
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: {
          name: "Faisal Alharbi",
          image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=100&q=80",
        },
        rating: 5,
        text: "A beautiful way to connect with our traditions. Highly recommended!",
        date: "2024-06-16",
      },
    ],
    featured: true,
    trending: true,
  },
  {
    id: 2,
    title: "Al-Soudah Hiking Adventure",
    description: "Join a guided trekking experience in the majestic mountains of Al-Soudah in the Asir region. Enjoy scenic views, cool mountain weather, and a rich encounter with local flora and fauna.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/7a/35/07/caption.jpg?w=500&h=500&s=1",
    date: "2025-07-10",
    time: "6:00 AM - 5:00 PM",
    location: {
      name: "Al-Soudah Park",
      address: "Al-Soudah Mountain Trail",
      city: "Abha",
      country: "Saudi Arabia",
      coordinates: {
        lat: 18.2469,
        lng: 42.5053,
      },
    },
    price: {
      general: 100,
    },
    category: "Adventure",
    organizer: {
      name: "Saudi Trekking Club",
      image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=100&q=80",
    },
    rating: 4.9,
    reviews: [
      {
        id: 1,
        user: {
          name: "Noura Alshammari",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3c93?auto=format&fit=crop&w=100&q=80",
        },
        rating: 5,
        text: "Unforgettable views and a great group experience!",
        date: "2024-07-12",
      },
    ],
    featured: true,
    trending: true,
  },
  {
    id: 3,
    title: "Saudi Coffee Experience",
    description: "Dive into the history and culture of Saudi coffee. Enjoy tastings, brewing demonstrations, and workshops on roasting techniques with local Qahwa masters.",
    image: "https://cdn-ak.f.st-hatena.com/images/fotolife/y/ymdxd/20240723/20240723224058.jpg",
    date: "2025-08-20",
    time: "5:00 PM - 9:00 PM",
    location: {
      name: "Jeddah Historic District",
      address: "Al-Balad",
      city: "Jeddah",
      country: "Saudi Arabia",
      coordinates: {
        lat: 21.4858,
        lng: 39.1925,
      },
    },
    price: {
      general: 80,
      vip: 150,
    },
    category: "Food & Drink",
    organizer: {
      name: "Ministry of Culture",
      image: "https://images.unsplash.com/photo-1505247964246-1f0a90443c36?auto=format&fit=crop&w=100&q=80",
    },
    rating: 4.7,
    reviews: [
      {
        id: 1,
        user: {
          name: "Salem Alotaibi",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
        },
        rating: 5,
        text: "The best coffee experience I’ve had! Loved the cultural insights.",
        date: "2024-08-21",
      },
    ],
    featured: false,
    trending: true,
  },
  {
    id: 4,
    title: "Jeddah Historical Tour",
    description: "A guided walking tour through Al-Balad, Jeddah’s UNESCO World Heritage Site. Learn about the Hijazi architecture, ancient souqs, and the city's role as a historic trading port.",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8d/dc/26.jpg",
    date: "2025-09-01",
    time: "4:00 PM - 8:00 PM",
    location: {
      name: "Al-Balad District",
      address: "King Abdulaziz St",
      city: "Jeddah",
      country: "Saudi Arabia",
      coordinates: {
        lat: 21.4858,
        lng: 39.1925,
      },
    },
    price: {
      general: 40,
    },
    category: "Cultural",
    organizer: {
      name: "Jeddah Heritage Society",
      image: "https://images.unsplash.com/photo-1608122557962-f0a94e81e1f2?auto=format&fit=crop&w=100&q=80",
    },
    rating: 4.6,
    reviews: [
      {
        id: 1,
        user: {
          name: "Alya Hassan",
          image: "https://images.unsplash.com/photo-1590080876790-746e99358a2b?auto=format&fit=crop&w=100&q=80",
        },
        rating: 5,
        text: "Loved every moment. The tour guide was very passionate and knowledgeable.",
        date: "2024-09-02",
      },
    ],
    featured: true,
    trending: false,
  }
];

export interface UserTicket {
  id: number;
  eventId: number;
  eventName: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;
  ticketType: "General" | "VIP";
  ticketPrice: number;
  purchaseDate: string;
  qrCode: string;
}

export const userTickets: UserTicket[] = [
  {
    id: 1,
    eventId: 1,
    eventName: "Cultural Heritage Festival",
    eventImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    eventDate: "2025-06-15",
    eventLocation: "City Heritage Park, New York",
    ticketType: "VIP",
    ticketPrice: 50,
    purchaseDate: "2025-05-10",
    qrCode: "data:image/png;base64,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",
  },
  {
    id: 2,
    eventId: 2,
    eventName: "Mountain Trekking Adventure",
    eventImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    eventDate: "2025-07-10",
    eventLocation: "Rocky Mountains, Denver",
    ticketType: "General",
    ticketPrice: 75,
    purchaseDate: "2025-06-01",
    qrCode: "data:image/png;base64,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",
  },
];

export interface SavedEvent {
  id: number;
  eventId: number;
  eventName: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;
  savedDate: string;
}

export const savedEvents: SavedEvent[] = [
  {
    id: 1,
    eventId: 3,
    eventName: "Wine Tasting Tour",
    eventImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    eventDate: "2025-08-22",
    eventLocation: "Napa Valley Vineyards, Napa",
    savedDate: "2025-05-15",
  },
  {
    id: 2,
    eventId: 5,
    eventName: "Tropical Island Paradise Getaway",
    eventImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    eventDate: "2025-10-15",
    eventLocation: "Azure Isle Resort, Bali",
    savedDate: "2025-05-20",
  },
];

export interface OrganizerEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  attendees: number;
  revenue: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
}

export const organizerEvents: OrganizerEvent[] = [
  {
    id: 1,
    name: "Cultural Heritage Festival",
    date: "2025-06-15",
    location: "City Heritage Park, New York",
    attendees: 543,
    revenue: 15670,
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Winter Wonderland Fair",
    date: "2024-12-20",
    location: "Central Park, New York",
    attendees: 1200,
    revenue: 35000,
    status: "Completed",
  },
  {
    id: 3,
    name: "Summer Beach Party",
    date: "2025-07-04",
    location: "Miami Beach, Florida",
    attendees: 320,
    revenue: 9600,
    status: "Upcoming",
  },
];

export interface OrganizerStats {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  upcomingEvents: number;
}

export const organizerStats: OrganizerStats = {
  totalEvents: 3,
  totalAttendees: 2063,
  totalRevenue: 60270,
  upcomingEvents: 2,
};
