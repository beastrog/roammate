import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, Plus } from 'lucide-react';

interface TripCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  travelers: number;
  image: string;
  onClick: (id: string) => void;
}

const TripCard: React.FC<TripCardProps> = ({ id, title, location, date, travelers, image, onClick }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700/50"
    whileHover={{ y: -5 }}
    onClick={() => onClick(id)}
  >
    <div className="relative h-48">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
    </div>
    <div className="p-4 dark:text-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Users className="h-4 w-4 mr-1" />
          <span>{travelers} travelers</span>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 flex items-center text-sm font-medium">
          View Details <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  </motion.div>
);

const Trips: React.FC = () => {
  const navigate = useNavigate();

  const demoTrips = [
    {
      id: '1',
      title: 'Summer Adventure',
      location: 'Bali, Indonesia',
      date: 'Jun 15 - Jun 30, 2023',
      travelers: 4,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: '2',
      title: 'Mountain Retreat',
      location: 'Swiss Alps, Switzerland',
      date: 'Dec 5 - Dec 12, 2023',
      travelers: 2,
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6de93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: '3',
      title: 'City Explorer',
      location: 'Tokyo, Japan',
      date: 'Apr 1 - Apr 10, 2024',
      travelers: 3,
      image: 'https://images.unsplash.com/photo-1492571350019-22de09371a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const handleTripClick = (tripId: string) => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Trips</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and explore your upcoming adventures</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            New Trip
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              title={trip.title}
              location={trip.location}
              date={trip.date}
              travelers={trip.travelers}
              image={trip.image}
              onClick={handleTripClick}
            />
          ))}
        </div>

        {demoTrips.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md inline-block">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No trips yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Start planning your next adventure!</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
                Create Your First Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
