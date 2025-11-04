import dotenv from "dotenv";
import { connectMongo } from "./db.js";
import Experience from "./models/Experience.js";
import Slot from "./models/Slot.js";
import Promo from "./models/Promo.js";

dotenv.config();
await connectMongo(process.env.MONGO_URL || "mongodb://127.0.0.1:27017");

await Promise.all([
  Experience.deleteMany({}),
  Slot.deleteMany({}),
  Promo.deleteMany({}),
]);

// 🌍 10 curated experiences with images from Unsplash
const exps = await Experience.insertMany([
  {
    title: "Kayaking Adventure",
    description:
      "Explore calm rivers and lakes with professional kayaking instructors. Perfect for beginners and nature lovers.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    city: "Udupi",
    state: "Karnataka",
    priceFrom: 999,
  },
  {
    title: "Nandi Hills Sunrise Trek",
    description:
      "Catch a breathtaking sunrise from the top of Nandi Hills with guided trails and safety gear included.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    city: "Bangalore",
    state: "Karnataka",
    priceFrom: 899,
  },
  {
    title: "Coorg Coffee Plantation Tour",
    description:
      "Walk through aromatic coffee estates and learn about the process from bean to brew. Includes tasting session.",
    imageUrl:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    city: "Coorg",
    state: "Karnataka",
    priceFrom: 1299,
  },
  {
    title: "Gokarna Beach Camping",
    description:
      "Spend a magical night under the stars with bonfires, acoustic music, and beach games.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=M3w5",
    city: "Gokarna",
    state: "Karnataka",
    priceFrom: 1599,
  },
  {
    title: "Hampi Heritage Trail",
    description:
      "Explore ancient ruins, temples, and stone chariots with an experienced history guide.",
    imageUrl: "https://images.unsplash.com/photo-1689946727963-be60e05fe278?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    city: "Hampi",
    state: "Karnataka",
    priceFrom: 1199,
  },
  {
    title: "Mysore Palace Day Tour",
    description:
      "Discover the grandeur of Mysore Palace and its rich history. Includes entry tickets and guide.",
    imageUrl: "https://images.unsplash.com/photo-1665910690956-2d16ce1cf515?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    city: "Mysuru",
    state: "Karnataka",
    priceFrom: 799,
  },
  {
    title: "Dandeli River Rafting",
    description:
      "Get your adrenaline rush on the Kali River with professional-grade white-water rafting.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0",
    city: "Dandeli",
    state: "Karnataka",
    priceFrom: 1799,
  },
  {
    title: "Chikmagalur Waterfall Hike",
    description:
      "A scenic trek through dense forests leading to breathtaking waterfalls. Ideal for weekend getaways.",
    imageUrl:
      "https://images.unsplash.com/photo-1533628635777-112b2239b1c7",
    city: "Chikmagalur",
    state: "Karnataka",
    priceFrom: 999,
  },
  {
    title: "Kabini Wildlife Safari",
    description:
      "Spot tigers, elephants, and exotic birds in their natural habitat. Includes jeep safari and lunch.",
    imageUrl:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    city: "Kabini",
    state: "Karnataka",
    priceFrom: 2499,
  },
  {
    title: "Agumbe Rainforest Exploration",
    description:
      "Journey through the Western Ghats rainforest, known as the 'Cherrapunji of South India'.",
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
    city: "Agumbe",
    state: "Karnataka",
    priceFrom: 1399,
  },
]);

// ⏰ Generate slot data dynamically
const today = new Date();
function dateOffset(days) {
  const t = new Date(today);
  t.setDate(t.getDate() + days);
  return t.toISOString().slice(0, 10);
}

const times = ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"];

for (const e of exps) {
  for (const dayOffset of [0, 1, 2, 3, 4]) {
    for (const time of times) {
      await Slot.create({
        experienceId: e._id,
        date: dateOffset(dayOffset),
        time,
        capacity: 8,
        bookedCount: Math.floor(Math.random() * 5),
      });
    }
  }
}

// 🎟️ Add promo codes
await Promo.insertMany([
  { code: "SAVE10", type: "percent", value: 10 },
  { code: "FLAT100", type: "flat", value: 100 },
  { code: "NEWUSER50", type: "flat", value: 50 },
]);

process.exit(0);
