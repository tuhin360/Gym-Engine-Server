import { connectDB, getDB } from './src/config/db';

const classes = [
  {
    title: "Basic Fitness",
    subtitle: "A great starting point for beginners to build a solid foundation.",
    category: "General",
    duration: "45 mins",
    trainer: "Alex Thompson",
    image: "/assets/training-image-01.jpg"
  },
  {
    title: "Advanced Muscle Course",
    subtitle: "Take your physique to the next level with advanced hypertrophy.",
    category: "Strength",
    duration: "90 mins",
    trainer: "Marcus Chen",
    image: "/assets/training-image-02.jpg"
  },
  {
    title: "Yoga Training",
    subtitle: "Improve flexibility, balance, and mental clarity with yoga.",
    category: "Wellness",
    duration: "60 mins",
    trainer: "Sarah Jenkins",
    image: "/assets/training-image-03.jpg"
  },
  {
    title: "Body Building Course",
    subtitle: "Intense bodybuilding routines to maximize muscle growth.",
    category: "Bodybuilding",
    duration: "120 mins",
    trainer: "Marcus Chen",
    image: "/assets/training-image-04.jpg"
  }
];

async function seedData() {
  try {
    console.log("Seeding started...");
    await connectDB();
    const db = getDB();
    
    const collection = db.collection('classes');
    
    // Clear existing data (optional)
    await collection.deleteMany({});
    
    // Insert new data
    const result = await collection.insertMany(classes);
    console.log(`${result.insertedCount} classes were successfully added to the database!`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
