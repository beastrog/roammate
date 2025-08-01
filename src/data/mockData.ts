// Mock data for Roammate platform
export interface User {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  location: string;
  memberSince: string;
  vibeScore: number;
  stats: {
    tripsCompleted: number;
    placesVisited: number;
    friendsMade: number;
    reviewsGiven: number;
  };
  badges: Badge[];
  recentTrips: Trip[];
}

export interface Badge {
  name: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  duration: string;
  vibe: string;
  groupSize: number;
  priceRange: string;
  images: string[];
  members: Member[];
  tags: string[];
  description: string;
  date?: string;
  story?: string;
}

export interface Member {
  name: string;
  avatar: string;
  vibeScore: number;
}

export interface Guide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  languages: string[];
  pricePerHour: number;
  experiences: Experience[];
  availability: string[];
}

export interface Experience {
  title: string;
  duration: string;
  price: number;
  images: string[];
  description: string;
}

export const heroContent = {
  tagline: "Travel Raw, Connect Real",
  subtitle: "Discover India's Soul Through Authentic Experiences",
  ctaText: "Start Your Journey",
  features: [
    { 
      icon: "🏛️", 
      title: "Cultural Immersion", 
      description: "Live traditions, not just see them" 
    },
    { 
      icon: "👥", 
      title: "Travel Groups", 
      description: "Find your tribe of explorers" 
    },
    { 
      icon: "🏡", 
      title: "Local Guides", 
      description: "Authentic experiences from locals" 
    }
  ]
};

export const sampleTrips: Trip[] = [
  {
    id: "1",
    title: "Varanasi Spiritual Awakening",
    location: "Varanasi, UP",
    duration: "5 days",
    vibe: "Spiritual",
    groupSize: 6,
    priceRange: "₹5,000-8,000",
    images: [
      "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    members: [
      { name: "Ravi", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.8 },
      { name: "Priya", avatar: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.6 }
    ],
    tags: ["Temples", "Ganga Aarti", "Photography"],
    description: "Experience the spiritual heart of India through dawn boat rides and evening aartis"
  },
  {
    id: "2",
    title: "Rajasthan Desert Safari",
    location: "Jaisalmer, Rajasthan",
    duration: "4 days",
    vibe: "Adventure",
    groupSize: 8,
    priceRange: "₹7,000-12,000",
    images: [
      "https://images.pexels.com/photos/1576942/pexels-photo-1576942.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    members: [
      { name: "Arjun", avatar: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.9 },
      { name: "Kavya", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.7 }
    ],
    tags: ["Desert", "Camel Safari", "Folk Music"],
    description: "Golden sand dunes, traditional folk performances under starlit skies"
  },
  {
    id: "3",
    title: "Kerala Backwater Bliss",
    location: "Alleppey, Kerala",
    duration: "3 days",
    vibe: "Relaxation",
    groupSize: 4,
    priceRange: "₹6,000-9,000",
    images: [
      "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    members: [
      { name: "Deepak", avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.5 },
      { name: "Meera", avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.8 }
    ],
    tags: ["Houseboat", "Ayurveda", "Local Cuisine"],
    description: "Serene backwaters, traditional houseboats, and authentic Kerala cuisine"
  },
  {
    id: "4",
    title: "Himachal Mountain Trek",
    location: "Manali, Himachal Pradesh",
    duration: "7 days",
    vibe: "Adventure",
    groupSize: 10,
    priceRange: "₹8,000-15,000",
    images: [
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    members: [
      { name: "Rohit", avatar: "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.6 },
      { name: "Anita", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150", vibeScore: 4.7 }
    ],
    tags: ["Trekking", "Mountains", "Photography"],
    description: "High-altitude adventure through pristine Himalayan landscapes"
  }
];

export const sampleUser: User = {
  id: "user1",
  name: "Arjun Mehta",
  avatar: "https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=300",
  coverImage: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1200",
  location: "Mumbai, India",
  memberSince: "2023",
  vibeScore: 4.7,
  stats: {
    tripsCompleted: 12,
    placesVisited: 28,
    friendsMade: 45,
    reviewsGiven: 18
  },
  badges: [
    { name: "Temple Explorer", icon: "🏛️", unlocked: true, rarity: "common" },
    { name: "Mountain Conqueror", icon: "🏔️", unlocked: true, rarity: "rare" },
    { name: "Cultural Ambassador", icon: "🎭", unlocked: false, progress: 75, rarity: "epic" },
    { name: "Desert Wanderer", icon: "🏜️", unlocked: true, rarity: "common" },
    { name: "Spiritual Seeker", icon: "🕉️", unlocked: true, rarity: "rare" },
    { name: "Adventure Master", icon: "⛰️", unlocked: false, progress: 60, rarity: "legendary" }
  ],
  recentTrips: [
    {
      id: "recent1",
      title: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      duration: "3 days",
      vibe: "Relaxation",
      groupSize: 4,
      priceRange: "₹6,000-9,000",
      images: [
        "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
      ],
      members: [],
      tags: ["Houseboat", "Ayurveda"],
      description: "Discovered the magic of houseboat life and traditional Kerala cuisine",
      date: "Dec 2023",
      story: "Discovered the magic of houseboat life and connected with local fishermen who shared stories passed down through generations."
    },
    {
      id: "recent2",
      title: "Rajasthan Heritage",
      location: "Jaipur, Rajasthan",
      duration: "5 days",
      vibe: "Cultural",
      groupSize: 6,
      priceRange: "₹8,000-12,000",
      images: [
        "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=400",
        "https://images.pexels.com/photos/1576942/pexels-photo-1576942.jpeg?auto=compress&cs=tinysrgb&w=400"
      ],
      members: [],
      tags: ["Palaces", "Block Printing"],
      description: "Explored royal palaces and learned traditional block printing",
      date: "Nov 2023",
      story: "Learned traditional block printing from master craftsmen and stayed in a heritage haveli with incredible architecture."
    }
  ]
};

export const sampleGuides: Guide[] = [
  {
    id: "guide1",
    name: "Meera Sharma",
    avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Jaipur, Rajasthan",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Block Printing", "Local Cuisine", "Historical Tours"],
    languages: ["Hindi", "English", "Gujarati"],
    pricePerHour: 500,
    experiences: [
      {
        title: "Traditional Rajasthani Cooking Class",
        duration: "3 hours",
        price: 1500,
        images: [
          "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400",
          "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        description: "Learn authentic dal baati churma in a local family kitchen"
      },
      {
        title: "Block Printing Workshop",
        duration: "2 hours",
        price: 1200,
        images: [
          "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        description: "Create your own traditional Rajasthani textile prints"
      }
    ],
    availability: ["2024-02-15", "2024-02-16", "2024-02-17"]
  },
  {
    id: "guide2",
    name: "Ravi Kumar",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Varanasi, UP",
    rating: 4.8,
    reviewCount: 89,
    specialties: ["Spiritual Tours", "Photography", "River Cruises"],
    languages: ["Hindi", "English", "Sanskrit"],
    pricePerHour: 400,
    experiences: [
      {
        title: "Sunrise Ganga Aarti Experience",
        duration: "4 hours",
        price: 1800,
        images: [
          "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=400",
          "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        description: "Witness the sacred morning rituals on the ghats of Varanasi"
      }
    ],
    availability: ["2024-02-18", "2024-02-19", "2024-02-20"]
  },
  {
    id: "guide3",
    name: "Kavya Nair",
    avatar: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Kochi, Kerala",
    rating: 4.7,
    reviewCount: 156,
    specialties: ["Backwater Tours", "Ayurveda", "Spice Gardens"],
    languages: ["Malayalam", "English", "Tamil"],
    pricePerHour: 450,
    experiences: [
      {
        title: "Backwater Village Tour",
        duration: "6 hours",
        price: 2500,
        images: [
          "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=400",
          "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        description: "Traditional houseboat journey through serene backwaters"
      },
      {
        title: "Spice Garden Experience",
        duration: "3 hours",
        price: 1300,
        images: [
          "https://images.pexels.com/photos/4198021/pexels-photo-4198021.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        description: "Explore organic spice gardens and learn traditional cultivation"
      }
    ],
    availability: ["2024-02-21", "2024-02-22", "2024-02-23"]
  }
];