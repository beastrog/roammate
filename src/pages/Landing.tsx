import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Star, Users, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { heroContent } from '../data/mockData';

const Landing: React.FC = () => {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: "🏛️",
      title: "Cultural Immersion",
      description: "Live traditions, not just see them",
      color: "from-orange-400 to-red-400"
    },
    {
      icon: "👥",
      title: "Travel Groups",
      description: "Find your tribe of explorers",
      color: "from-amber-400 to-orange-400"
    },
    {
      icon: "🏡",
      title: "Local Guides",
      description: "Authentic experiences from locals",
      color: "from-green-400 to-teal-400"
    }
  ];

  const stats = [
    { value: "10K+", label: "Happy Travelers", icon: Users },
    { value: "500+", label: "Destinations", icon: MapPin },
    { value: "4.9", label: "Average Rating", icon: Star },
    { value: "98%", label: "Love Rate", icon: Heart }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      avatar: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=150",
      location: "Delhi",
      rating: 5,
      text: "Roammate connected me with the most authentic experiences. The spiritual journey in Varanasi changed my perspective on travel forever."
    },
    {
      name: "Arjun Patel",
      avatar: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=150",
      location: "Mumbai",
      rating: 5,
      text: "Found my travel family through Roammate. The desert safari in Rajasthan was pure magic - from camel rides to starlit dinners."
    },
    {
      name: "Kavya Nair",
      avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150",
      location: "Kochi",
      rating: 5,
      text: "The local guides are incredible! Learned traditional cooking and heard stories you won't find in any guidebook."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        className="fixed top-20 left-10 w-6 h-6 bg-orange-300 rounded-full opacity-60 pointer-events-none z-10"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      <motion.div
        className="fixed top-40 right-20 w-8 h-8 bg-amber-400 rounded-full opacity-40 pointer-events-none z-10"
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * 0.04,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-orange-500 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-20 right-20 w-24 h-24 border-4 border-amber-500 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>

        <motion.div
          className="text-center px-4 max-w-4xl mx-auto z-10"
          style={{ y: y1, opacity }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <Badge variant="secondary" size="md" animated>
              ✨ India's #1 Authentic Travel Platform
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroContent.tagline}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/discover">
              <AnimatedButton size="lg" className="px-8 py-4">
                {heroContent.ctaText} <ArrowRight className="ml-2" size={20} />
              </AnimatedButton>
            </Link>
            
            <motion.button
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Play size={20} className="text-orange-600 ml-1" />
              </div>
              <span className="font-medium">Watch Stories</span>
            </motion.button>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="text-orange-500" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Why Choose <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Roammate</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect you with authentic Indian experiences through local communities, 
              cultural immersion, and meaningful travel connections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card hover={true} className="p-8 text-center h-full">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Stories from Our <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from travelers who discovered the authentic soul of India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover={true} className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Ready to Start Your <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Journey</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers discovering the real India. Your authentic adventure awaits.
          </p>
          <Link to="/discover">
            <AnimatedButton size="lg">
              Explore Destinations <ArrowRight className="ml-2" size={20} />
            </AnimatedButton>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;