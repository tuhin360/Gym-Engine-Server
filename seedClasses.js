const { connectDB } = require('./src/config/db');
const ClassModel = require('./src/models/classModel');

const classesData = [
  {
    title: "Elite Bodybuilding",
    time: "60 Mins",
    level: "Advanced",
    image: "/assets/training-image-01.jpg",
    description: "Focus on maximum muscle growth with elite-level hypertrophy techniques and heavy lifting sessions.",
    featured: true,
    trainer: "Marcus Chen"
  },
  {
    title: "HIIT Transformation",
    time: "45 Mins",
    level: "Intermediate",
    image: "/assets/training-image-02.jpg",
    description: "High-intensity interval training designed to burn maximum fat and improve your athletic endurance.",
    featured: true,
    trainer: "Alex Thompson"
  },
  {
    title: "Yoga Flow",
    time: "50 Mins",
    level: "All Levels",
    image: "/assets/training-image-03.jpg",
    description: "Experience variety in your fitness journey. From high-intensity training to soul-soothing yoga, we offer a wide range of classes to keep you motivated and moving.",
    featured: false,
    trainer: "Sarah Jenkins"
  },
  {
    title: "Crossfit",
    time: "55 Mins",
    level: "Advanced",
    image: "/assets/training-image-04.jpg",
    description: "Integer dapibus, est vel dapibus mattis, sem mauris luctus leo, nec rutrum mauris diam eu magna. Quisque in tempor libero.",
    featured: false,
    trainer: "Alex Thompson"
  },
  {
    title: "Powerlifting",
    time: "75 Mins",
    level: "Advanced",
    image: "/assets/training-image-01.jpg",
    description: "Fusce laoreet malesuada rhoncus. Donec ultricies diam tortor, id auctor neque facilisis eget. Fusce in dolor elementum.",
    featured: false,
    trainer: "Marcus Chen"
  },
  {
    title: "Boxing",
    time: "60 Mins",
    level: "Intermediate",
    image: "/assets/training-image-02.jpg",
    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ultrices elementum est.",
    featured: false,
    trainer: "Alex Thompson"
  }
];

async function seed() {
  try {
    await connectDB();
    await ClassModel.clear();
    for (const item of classesData) {
      await ClassModel.create(item);
    }
    console.log("Classes seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding classes:", error);
    process.exit(1);
  }
}

seed();
