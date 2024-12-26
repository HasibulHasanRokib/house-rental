const dummyProperties = [
  {
    id: "1",
    slug: "spacious-apartment-in-gulshan",
    propertyTitle: "Spacious Apartment in Gulshan",
    status: "accepted",
    type: "apartment",
    area: 850,
    rooms: 3,
    price: 8000,
    bathrooms: 2,
    bedrooms: 3,
    address: "House 12, Road 7, Gulshan 1",
    city: "Dhaka",
    country: "Bangladesh",
    details:
      "A modern, spacious apartment with all the amenities for comfortable living.",
    buildingAge: 5,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-2.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-3.jpg",
    ],
    hasParking: true,
    hasSwimmingPool: false,
    hasLaundryRoom: true,
    hasWoodenCeiling: false,
    hasCentralHeating: false,
    hasAlarm: true,
    contactName: "John Doe",
    contactEmail: "john.doe@example.com",
    contactPhone: "01712345678",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: " 2",
    slug: "affordable-house-in-mirpur",
    propertyTitle: "Affordable House in Mirpur",
    status: "accepted",
    type: "houses",
    area: 600,
    rooms: 4,
    price: 5000,
    bathrooms: 2,
    bedrooms: 4,
    address: "Sector 10, Mirpur",
    city: "Dhaka",
    country: "Bangladesh",
    details: "A budget-friendly house perfect for a family.",
    buildingAge: 7,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-4.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-1.jpg",
    ],
    hasParking: false,
    hasSwimmingPool: false,
    hasLaundryRoom: false,
    hasWoodenCeiling: true,
    hasCentralHeating: false,
    hasAlarm: false,
    contactName: "Ahmed Khan",
    contactEmail: "ahmed.khan@example.com",
    contactPhone: "01876543210",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: "3",
    slug: "luxury-apartment-in-dhanmondi",
    propertyTitle: "Luxury Apartment in Dhanmondi",
    status: "accepted",
    type: "apartment",
    area: 950,
    rooms: 4,
    price: 9500,
    bathrooms: 3,
    bedrooms: 4,
    address: "Road 16, Dhanmondi",
    city: "Dhaka",
    country: "Bangladesh",
    details:
      "A luxurious apartment with beautiful interiors and prime location.",
    buildingAge: 3,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-2.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-3.jpg",
    ],
    hasParking: true,
    hasSwimmingPool: true,
    hasLaundryRoom: true,
    hasWoodenCeiling: false,
    hasCentralHeating: true,
    hasAlarm: true,
    contactName: "Sarah Hossain",
    contactEmail: "sarah.h@example.com",
    contactPhone: "01987654321",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: "4",
    slug: "modern-house-in-uttara",
    propertyTitle: "Modern House in Uttara",
    status: "accepted",
    type: "houses",
    area: 700,
    rooms: 3,
    price: 7500,
    bathrooms: 2,
    bedrooms: 3,
    address: "Sector 5, Uttara",
    city: "Dhaka",
    country: "Bangladesh",
    details: "A newly built house with modern design and facilities.",
    buildingAge: 2,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-4.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-1.jpg",
    ],
    hasParking: true,
    hasSwimmingPool: false,
    hasLaundryRoom: true,
    hasWoodenCeiling: false,
    hasCentralHeating: false,
    hasAlarm: true,
    contactName: "Rizwan Rahman",
    contactEmail: "rizwan.rahman@example.com",
    contactPhone: "01612345678",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: "5",
    slug: "cozy-apartment-in-banani",
    propertyTitle: "Cozy Apartment in Banani",
    status: "accepted",
    type: "apartment",
    area: 750,
    rooms: 2,
    price: 7000,
    bathrooms: 1,
    bedrooms: 2,
    address: "House 20, Road 12, Banani",
    city: "Dhaka",
    country: "Bangladesh",
    details: "A cozy and affordable apartment in a prime location.",
    buildingAge: 4,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-2.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-3.jpg",
    ],
    hasParking: true,
    hasSwimmingPool: false,
    hasLaundryRoom: true,
    hasWoodenCeiling: false,
    hasCentralHeating: false,
    hasAlarm: true,
    contactName: "Nazia Khan",
    contactEmail: "nazia.k@example.com",
    contactPhone: "01587654321",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: "6",
    slug: "family-home-in-chattogram",
    propertyTitle: "Family Home in Chattogram",
    status: "accepted",
    type: "houses",
    area: 900,
    rooms: 5,
    price: 10000,
    bathrooms: 3,
    bedrooms: 5,
    address: "Patharghata, Chattogram",
    city: "Chattogram",
    country: "Bangladesh",
    details: "A large family home in a serene location with spacious rooms.",
    buildingAge: 6,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-4.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-1.jpg",
    ],
    hasParking: true,
    hasSwimmingPool: true,
    hasLaundryRoom: true,
    hasWoodenCeiling: true,
    hasCentralHeating: false,
    hasAlarm: true,
    contactName: "Ali Ahmed",
    contactEmail: "ali.ahmed@example.com",
    contactPhone: "01711223344",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: "7",
    slug: "stylish-apartment-in-sylhet",
    propertyTitle: "Stylish Apartment in Sylhet",
    status: "accepted",
    type: "apartment",
    area: 800,
    rooms: 3,
    price: 8500,
    bathrooms: 2,
    bedrooms: 3,
    address: "Zindabazar, Sylhet",
    city: "Sylhet",
    country: "Bangladesh",
    details: "A stylish and comfortable apartment in the heart of Sylhet.",
    buildingAge: 3,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-2.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-3.jpg",
    ],
    hasParking: false,
    hasSwimmingPool: false,
    hasLaundryRoom: true,
    hasWoodenCeiling: true,
    hasCentralHeating: false,
    hasAlarm: true,
    contactName: "Farhana Yasmin",
    contactEmail: "farhana.y@example.com",
    contactPhone: "01998765432",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
  {
    id: "8",
    slug: "charming-house-in-rajshahi",
    propertyTitle: "Charming House in Rajshahi",
    status: "accepted",
    type: "houses",
    area: 750,
    rooms: 4,
    price: 9000,
    bathrooms: 2,
    bedrooms: 4,
    address: "Kazla, Rajshahi",
    city: "Rajshahi",
    country: "Bangladesh",
    details: "A charming and well-maintained house in a quiet neighborhood.",
    buildingAge: 4,
    imagesUrl: [
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-4.jpg",
      "https://storage.googleapis.com/theme-vessel-items/checking-sites/nest-2-html/HTML/main/img/properties/properties-1.jpg",
    ],
    hasParking: true,
    hasSwimmingPool: false,
    hasLaundryRoom: false,
    hasWoodenCeiling: true,
    hasCentralHeating: false,
    hasAlarm: true,
    contactName: "Mizanur Rahman",
    contactEmail: "mizan.r@example.com",
    contactPhone: "01722334455",
    userId: "8c8177f7-52b8-428f-a9b2-3d20589f87c0",
  },
];

module.exports = { dummyProperties };
