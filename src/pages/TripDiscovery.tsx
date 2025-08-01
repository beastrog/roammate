import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Users, Clock, Star, Heart, Share2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AnimatedButton from '../components/ui/AnimatedButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { sampleTrips, Trip } from '../data/mockData';

const TripDiscovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [duration, setDuration] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [likedTrips, setLikedTrips] = useState<Set<string>>(new Set());

  const vibes = ['All', 'Spiritual', 'Adventure', 'Relaxation', 'Cultural'];
  const priceRanges = ['All', '₹5,000-8,000', '₹7,000-12,000', '₹8,000-15,000'];
  const durations = ['All', '3 days', '4 days', '5 days', '7 days'];

  const filteredTrips = useMemo(() => {
    return sampleTrips.filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesVibe = selectedVibe === 'All' || trip.vibe === selectedVibe;
      const matchesPrice = priceRange === 'All' || trip.priceRange === priceRange;
      const matchesDuration = duration === 'All' || trip.duration === duration;
      
      return matchesSearch && matchesVibe && matchesPrice && matchesDuration;
    });
  }, [searchTerm, selectedVibe, priceRange, duration]);

  const handleLike = (tripId: string) => {
    setLikedTrips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tripId)) {
        newSet.delete(tripId);
      } else {
        newSet.add(tripId);
      }
      return newSet;
    });
  };

  const handleSearch = (term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Discover India
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect travel experience with like-minded explorers
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search destinations, experiences, or vibes..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Vibe Filter */}
            <div className="flex flex-wrap gap-2">
              {vibes.map((vibe) => (
                <motion.button
                  key={vibe}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedVibe === vibe
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
                  }`}
                  onClick={() => setSelectedVibe(vibe)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {vibe}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                {durations.map(dur => (
                  <option key={dur} value={dur}>{dur}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              className="flex justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner type="mandala" size="lg" />
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TripCard
                    trip={trip}
                    isLiked={likedTrips.has(trip.id)}
                    onLike={() => handleLike(trip.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredTrips.length === 0 && !isLoading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No trips found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface TripCardProps {
  trip: Trip;
  isLiked: boolean;
  onLike: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, isLiked, onLike }) => {
  return (
    <Card hover={true} className="overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={trip.images[0]}
          alt={trip.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            className={`p-2 rounded-full backdrop-blur-sm ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
            }`}
            onClick={onLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-white/90 text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={16} />
          </motion.button>
        </div>

        {/* Vibe Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="primary" animated>
            {trip.vibe}
          </Badge>
        </div>

        {/* Members Preview */}
        <div className="absolute bottom-4 left-4 flex -space-x-2">
          {trip.members.slice(0, 3).map((member, index) => (
            <motion.img
              key={member.name}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
          {trip.members.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
              +{trip.members.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            {trip.title}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star size={16} className="fill-current" />
            <span className="text-sm font-medium text-gray-600">4.8</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{trip.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trip.description}</p>

        {/* Trip Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{trip.groupSize} travelers</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trip.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-orange-600">{trip.priceRange}</span>
            <span className="text-sm text-gray-600 ml-1">per person</span>
          </div>
          <AnimatedButton size="sm">
            Join Trip
          </AnimatedButton>
        </div>
      </div>
    </Card>
  );
};

export default TripDiscovery;