
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Info } from 'lucide-react';

const About = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#9b87f5]/90 to-[#9b87f5] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About TourEvents Saudi</h1>
            <p className="text-xl text-white/80">
              Connecting visitors with authentic Saudi experiences across the Kingdom
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-[#9b87f5]" size={28} />
              <h2 className="text-3xl font-bold text-[#1A1F2C]">Our Mission</h2>
            </div>
            <p className="text-lg mb-6 text-gray-700">
              At TourEvents Saudi, we're dedicated to showcasing the incredible diversity and richness of Saudi Arabia's cultural heritage, natural wonders, and modern attractions to visitors from around the world.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Our mission is to connect travelers with authentic Saudi experiences, from the ancient archaeological treasures of AlUla to the bustling metropolis of Riyadh, the pristine beaches of the Red Sea, and the spiritual significance of Makkah and Madinah.
            </p>
            <div className="bg-[#E5DEFF] p-6 rounded-lg border-l-4 border-[#9b87f5] my-8">
              <p className="text-lg italic text-[#1A1F2C]">
                "We're committed to sharing the authentic beauty, hospitality and cultural richness of Saudi Arabia with visitors, supporting the Kingdom's Vision 2030 goals for tourism development."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-[#E5DEFF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-[#9b87f5]" size={28} />
              <h2 className="text-3xl font-bold text-[#1A1F2C]">Our Story</h2>
            </div>
            <p className="text-lg mb-6 text-gray-700">
              TourEvents Saudi was founded in 2023, inspired by the Kingdom's Vision 2030 initiative to develop the tourism sector and showcase Saudi Arabia's unique cultural heritage and natural beauty to the world.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Beginning with a focus on major events in Riyadh and Jeddah, we've expanded to cover experiences across the entire Kingdom, from the mountains of Abha to the historic areas of AlUla and the coastal regions of the Red Sea.
            </p>
            <p className="text-lg text-gray-700">
              Our team includes Saudi nationals and international experts in tourism, technology, and customer experience, all united by a passion for sharing authentic Saudi experiences with visitors.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1F2C]">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Abdullah Al-Otaibi",
                role: "Founder & CEO",
                bio: "Tourism expert with deep knowledge of Saudi heritage and culture",
                image: "https://i.pravatar.cc/150?img=52"
              },
              {
                name: "Noura Al-Harbi",
                role: "Head of Cultural Experiences",
                bio: "Passionate about showcasing Saudi traditions to the world",
                image: "https://i.pravatar.cc/150?img=47"
              },
              {
                name: "Mohammed Al-Qahtani",
                role: "Chief Technology Officer",
                bio: "Tech innovator focused on digital tourism solutions",
                image: "https://i.pravatar.cc/150?img=68"
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-[#9b87f5]"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#9b87f5] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-[#1A1F2C] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore Saudi Arabia With Us</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
            Whether you're planning your first visit to the Kingdom or looking to explore new regions, we invite you to discover the incredible experiences Saudi Arabia has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                Discover Events
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-[#1A1F2C] hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
