import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Star, 
  MapPin, 
  Languages, 
  Clock, 
  IndianRupee,
  Calendar,
  Heart,
  Share2,
  Filter,
  ChevronRight
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AnimatedButton from '../components/ui/AnimatedButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { sampleGuides, Guide } from '../data/mockData';

const GuideMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likedGuides, setLikedGuides] = useState<Set<string>>(new Set());

  const locations = ['All', 'Jaipur', 'Varanasi', 'Kochi', 'Delhi', 'Mumbai'];
  const specialties = ['All', 'Cultural Tours', 'Spiritual Tours', 'Cooking Classes', 'Photography', 'Block Printing'];

  const filteredGuides = sampleGuides.filter(guide => {
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'All' || guide.location.includes(selectedLocation);
    const matchesSpecialty = selectedSpecialty === 'All' || guide.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const handleLike = (guideId: string) => {
    setLikedGuides(prev => {
      const newSet = new Set(prev);
      if (newSet.has(guideId)) {
        newSet.delete(guideId);
      } else {
        newSet.add(guideId);
      }
      return newSet;
    });
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
            Local Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with authentic local experiences through our verified cultural ambassadors
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
              placeholder="Search guides, locations, or experiences..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GuideCard
                guide={guide}
                isLiked={likedGuides.has(guide.id)}
                onLike={() => handleLike(guide.id)}
                onViewDetails={() => setSelectedGuide(guide)}
              />
            </motion.div>
          ))}
        </div>

        {/* Guide Detail Modal */}
        <AnimatePresence>
          {selectedGuide && (
            <GuideDetailModal
              guide={selectedGuide}
              onClose={() => setSelectedGuide(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface GuideCardProps {
  guide: Guide;
  isLiked: boolean;
  onLike: () => void;
  onViewDetails: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, isLiked, onLike, onViewDetails }) => {
  return (
    <Card hover={true} className="overflow-hidden group">
      {/* Header */}
      <div className="relative p-6 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <motion.img
              src={guide.avatar}
              alt={guide.name}
              className="w-16 h-16 rounded-2xl object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{guide.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={14} className="mr-1" />
                {guide.location}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              className={`p-2 rounded-full ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={onLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </motion.button>
            <motion.button
              className="p-2 rounded-full bg-white text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{guide.rating}</span>
            </div>
            <span className="text-sm text-gray-600">({guide.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center text-orange-600 font-semibold">
            <IndianRupee size={16} />
            <span>{guide.pricePerHour}/hour</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Specialties */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {guide.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="primary" size="sm">
                {specialty}
              </Badge>
            ))}
            {guide.specialties.length > 3 && (
              <Badge variant="secondary" size="sm">
                +{guide.specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Languages size={16} className="mr-2" />
            <span>{guide.languages.join(', ')}</span>
          </div>
        </div>

        {/* Top Experience */}
        {guide.experiences.length > 0 && (
          <div className="mb-4 p-3 bg-orange-50 rounded-xl">
            <h5 className="font-medium text-gray-800 text-sm mb-1">Featured Experience</h5>
            <p className="text-sm text-gray-600 mb-2">{guide.experiences[0].title}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                {guide.experiences[0].duration}
              </div>
              <div className="flex items-center font-medium text-orange-600">
                <IndianRupee size={12} />
                {guide.experiences[0].price}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <AnimatedButton 
          size="sm" 
          className="w-full"
          onClick={onViewDetails}
        >
          View Details & Book
          <ChevronRight size={16} className="ml-2" />
        </AnimatedButton>
      </div>
    </Card>
  );
};

interface GuideDetailModalProps {
  guide: Guide;
  onClose: () => void;
}

const GuideDetailModal: React.FC<GuideDetailModalProps> = ({ guide, onClose }) => {
  const [selectedExperience, setSelectedExperience] = useState(guide.experiences[0]);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <img
                src={guide.avatar}
                alt={guide.name}
                className="w-24 h-24 rounded-3xl object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{guide.name}</h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  {guide.location}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{guide.rating}</span>
                    <span className="text-sm text-gray-600">({guide.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-orange-600 font-semibold">
                    <IndianRupee size={18} />
                    <span>{guide.pricePerHour}/hour</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Specialties & Languages */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {guide.specialties.map((specialty) => (
                  <Badge key={specialty} variant="primary" size="sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {guide.languages.map((language) => (
                  <Badge key={language} variant="secondary" size="sm">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Experiences */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Available Experiences</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {guide.experiences.map((experience) => (
                <motion.div
                  key={experience.title}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedExperience.title === experience.title
                      ? 'border-orange-400 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedExperience(experience)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={experience.images[0]}
                    alt={experience.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-gray-800 mb-2">{experience.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{experience.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center font-semibold text-orange-600">
                      <IndianRupee size={14} />
                      {experience.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Book Experience</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Experience
                </label>
                <div className="p-3 bg-white rounded-xl border">
                  <p className="font-medium">{selectedExperience.title}</p>
                  <p className="text-sm text-gray-600">{selectedExperience.description}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Date
                </label>
                <select
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Select a date</option>
                  {guide.availability.map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Total Cost:</span>
                <div className="flex items-center text-xl font-bold text-orange-600">
                  <IndianRupee size={20} />
                  {selectedExperience.price}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Includes: {selectedExperience.title} ({selectedExperience.duration})
              </p>
              <AnimatedButton 
                size="lg" 
                className="w-full"
                disabled={!selectedDate}
              >
                Book Now
              </AnimatedButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GuideMarketplace;