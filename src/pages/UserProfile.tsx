import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Users, 
  Camera, 
  Award, 
  Edit3,
  Settings,
  Share2,
  Plus
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import AnimatedButton from '../components/ui/AnimatedButton';
import { sampleUser } from '../data/mockData';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'badges', label: 'Achievements', icon: Award },
    { id: 'stats', label: 'Statistics', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: Camera }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Cover Section */}
        <motion.div
          className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={sampleUser.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Cover Actions */}
          <div className="absolute top-6 right-6 flex space-x-3">
            <motion.button
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={20} />
            </motion.button>
            <motion.button
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit3 size={20} />
            </motion.button>
          </div>

          {/* Profile Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {sampleUser.name}
            </motion.h1>
            <motion.div
              className="flex items-center space-x-4 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {sampleUser.location}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                Member since {sampleUser.memberSince}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8 -mt-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <motion.img
              src={sampleUser.avatar}
              alt={sampleUser.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {sampleUser.vibeScore}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(sampleUser.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-orange-600">{value}</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <AnimatedButton variant="outline" size="sm">
              <Settings size={16} className="mr-2" />
              Settings
            </AnimatedButton>
            <AnimatedButton size="sm">
              <Plus size={16} className="mr-2" />
              New Trip
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'timeline' && <TimelineContent />}
            {activeTab === 'badges' && <BadgesContent />}
            {activeTab === 'stats' && <StatsContent />}
            {activeTab === 'gallery' && <GalleryContent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const TimelineContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Timeline</h2>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-orange-200" />
        
        {sampleUser.recentTrips.map((trip, index) => (
          <motion.div
            key={trip.id}
            className="relative flex items-start space-x-6 mb-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Timeline Node */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                {trip.date?.split(' ')[0]}
              </div>
            </div>

            {/* Content */}
            <Card hover={true} className="flex-1 p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <div className="md:w-48 h-32 rounded-xl overflow-hidden">
                  <img
                    src={trip.images[0]}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{trip.title}</h3>
                    <Badge variant="primary">{trip.date}</Badge>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{trip.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{trip.story}</p>
                  <div className="flex flex-wrap gap-2">
                    {trip.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BadgesContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
        <Badge variant="info">
          {sampleUser.badges.filter(b => b.unlocked).length} / {sampleUser.badges.length} Unlocked
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleUser.badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover={true} className={`p-6 text-center ${!badge.unlocked ? 'opacity-60' : ''}`}>
              <motion.div
                className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-3xl`}
                whileHover={badge.unlocked ? { scale: 1.1, rotate: 5 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {badge.icon}
              </motion.div>
              <h3 className="font-bold text-gray-800 mb-2">{badge.name}</h3>
              <Badge variant={badge.unlocked ? 'success' : 'warning'} size="sm">
                {badge.unlocked ? 'Unlocked' : `${badge.progress || 0}% Progress`}
              </Badge>
              {!badge.unlocked && badge.progress && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-orange-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatsContent: React.FC = () => {
  const additionalStats = [
    { label: 'Countries Visited', value: 1, icon: '🇮🇳' },
    { label: 'States Explored', value: 12, icon: '🗺️' },
    { label: 'Cultural Events', value: 8, icon: '🎭' },
    { label: 'Local Cuisines Tried', value: 25, icon: '🍛' },
    { label: 'Photos Shared', value: 156, icon: '📸' },
    { label: 'Reviews Written', value: 18, icon: '✍️' }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {additionalStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover={true} className="p-6 text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <motion.div
                className="text-3xl font-bold text-orange-600 mb-2"
                initial={{ scale: 0 }}
                animate={ { scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress Bars */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Travel Goals Progress</h3>
        <div className="space-y-4">
          {[
            { goal: 'Visit 15 States', current: 12, target: 15 },
            { goal: 'Complete 20 Trips', current: 12, target: 20 },
            { goal: 'Make 50 Friends', current: 45, target: 50 },
            { goal: 'Write 25 Reviews', current: 18, target: 25 }
          ].map((goal, index) => (
            <div key={goal.goal}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">{goal.goal}</span>
                <span className="text-sm text-gray-600">{goal.current}/{goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const GalleryContent: React.FC = () => {
  const galleryImages = [
    ...sampleUser.recentTrips.flatMap(trip => trip.images),
    "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1576942/pexels-photo-1576942.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400"
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Photo Gallery</h2>
        <AnimatedButton size="sm">
          <Plus size={16} className="mr-2" />
          Add Photos
        </AnimatedButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={ { scale: 1.05 }}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;