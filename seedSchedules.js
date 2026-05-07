const { connectDB } = require('./src/config/db');
const ScheduleModel = require('./src/models/scheduleModel');

const scheduleData = [
  { 
    name: "Fitness Class", 
    trainer: "Alex Thompson", 
    schedules: { Monday: "10:00AM - 11:30AM", Tuesday: "", Wednesday: "", Thursday: "2:00PM - 3:30PM", Friday: "", Saturday: "10:00AM - 11:30AM", Sunday: "" } 
  },
  { 
    name: "Muscle Training", 
    trainer: "Sarah Jenkins", 
    schedules: { Monday: "", Tuesday: "10:00AM - 11:30AM", Wednesday: "", Thursday: "", Friday: "10:00AM - 11:30AM", Saturday: "", Sunday: "10:00AM - 11:30AM" } 
  },
  { 
    name: "Body Building", 
    trainer: "Marcus Chen", 
    schedules: { Monday: "2:00PM - 3:30PM", Tuesday: "", Wednesday: "10:00AM - 11:30AM", Thursday: "", Friday: "", Saturday: "2:00PM - 3:30PM", Sunday: "" } 
  },
  { 
    name: "Yoga Training Class", 
    trainer: "Sarah Jenkins", 
    schedules: { Monday: "", Tuesday: "2:00PM - 3:30PM", Wednesday: "", Thursday: "10:00AM - 11:30AM", Friday: "2:00PM - 3:30PM", Saturday: "", Sunday: "2:00PM - 2:30PM" } 
  },
  { 
    name: "Advanced Training", 
    trainer: "Alex Thompson", 
    schedules: { Monday: "", Tuesday: "", Wednesday: "2:00PM - 3:30PM", Thursday: "", Friday: "", Saturday: "4:00PM - 5:30PM", Sunday: "4:00PM - 5:30PM" } 
  },
];

async function seed() {
  try {
    await connectDB();
    await ScheduleModel.clear();
    for (const item of scheduleData) {
      await ScheduleModel.create(item);
    }
    console.log("Schedules seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding schedules:", error);
    process.exit(1);
  }
}

seed();
