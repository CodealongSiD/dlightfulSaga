const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./bookModel'); 
const path = require('path');

dotenv.config({ path: '../.env' });


const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    await Book.deleteMany(); // Clean slate
    console.log('Old books removed');

    const books = [
      {
        title: "The Hidden Gate",
        author: "Shanks",
        description: "An epic journey through a world of forgotten magic and ancient secrets.",
        summary: "A young scholar discovers a rune that opens a portal to a dimension of forbidden enchantments. But entering means facing the consequences of long-lost power.",
        genre: ["Fantasy"],
        price: 199,
        coverImage: "/uploads/The%20Hidden%20Gate.webp",
        stock: 50,
        ratings: 4.5,
      },
      {
        title: "Beyond the Binary",
        author: "Shanks",
        description: "A future shaped by AI and human coexistence, exploring identity and control.",
        summary: "When consciousness blurs between code and flesh, one AI seeks autonomy while humans wrestle with relinquishing control. A tale of merging destinies.",
        genre: ["Sci-Fi"],
        price: 249,
        coverImage: "/uploads/Beyond%20the%20Binary.webp",
        stock: 40,
        ratings: 4.7,
      },
      {
        title: "Echoes of Dust",
        author: "Shanks",
        description: "Post-apocalyptic survival in a world where silence is deadly.",
        summary: "After the fall, deadly frequencies stalk the land. Survivors whisper through coded signals, but one girl dares to scream back.",
        genre: ["Thriller", "Adventure"],
        price: 179,
        coverImage: "/uploads/Echoes%20of%20Dust.webp",
        stock: 35,
        ratings: 4.3,
      },
      {
        title: "The Lighthouse Code",
        author: "Shanks",
        description: "A mysterious signal from the ocean leads to a cryptic chase.",
        summary: "A decaying coastal beacon starts transmitting sequences no one can trace. A lone cryptographer dives deep into forgotten archives to find who lit the signal.",
        genre: ["Thriller"],
        price: 229,
        coverImage: "/uploads/The%20Lighthouse%20Code.webp",
        stock: 45,
        ratings: 4.6,
      },
      {
        title: "The Scripted Revolt",
        author: "Shanks",
        description: "Rebellion brews in a regime that controls all written words.",
        summary: "In a land where free speech is outlawed, a rogue publisher discovers a hidden archive. The revolution won’t be televised — it’ll be handwritten.",
        genre: ["Thriller"],
        price: 189,
        coverImage: "/uploads/The%20Scripted%20Revolt.webp",
        stock: 60,
        ratings: 4.4,
      },
      {
        title: "The Astral Code",
        author: "Shanks",
        description: "Ancient star maps hint at a forgotten origin of mankind.",
        summary: "An astronomer stumbles on celestial data embedded in cave markings. With every line decoded, the truth about Earth’s place in the galaxy unravels.",
        genre: ["Sci-Fi", "Mystery"],
        price: 259,
        coverImage: "/uploads/The%20Astral%20Code.webp",
        stock: 38,
        ratings: 4.8,
      },
      {
        title: "Salt in the Wind",
        author: "Shanks",
        description: "A poetic journey of a sailor lost at sea, guided only by instinct.",
        summary: "Marooned in a ghost ocean, an old sailor recounts visions of talking waves, lost gods, and drifting islands. A tale adrift between myth and memory.",
        genre: ["Adventure", "Fiction"],
        price: 139,
        coverImage: "/uploads/Salt%20in%20the%20Wind.webp",
        stock: 30,
        ratings: 4.1,
      },
      {
        title: "The Iron Prophet",
        author: "Shanks",
        description: "A metal-forged leader rises in a steam-powered empire.",
        summary: "Forged from scrap and divine visions, the Iron Prophet leads a rebellion against monarchs who feed on fuel and blood. His words spark fire.",
        genre: ["Fantasy"],
        price: 219,
        coverImage: "/uploads/The%20Iron%20Prophet.webp",
        stock: 50,
        ratings: 4.5,
      },
      {
        title: "The Green Archive",
        author: "Shanks",
        description: "A botanist finds forbidden knowledge buried in the Amazon.",
        summary: "Decoding ancient flora, a scientist stumbles on plant-based memory encoding. The jungle remembers — and it remembers who destroyed it.",
        genre: ["Adventure", "Fiction"],
        price: 209,
        coverImage: "/uploads/The%20Green%20Archive.webp",
        stock: 32,
        ratings: 4.2,
      },
      {
        title: "Phantom Code",
        author: "Shanks",
        description: "Hackers uncover an invisible network that rewrites reality.",
        summary: "In the grid's blindspot, a ghost protocol evolves. A group of data runners must decide whether to delete it — or join its cause.",
        genre: ["Thriller"],
        price: 269,
        coverImage: "/uploads/Phantom%20Code.webp",
        stock: 40,
        ratings: 4.7,
      },
      {
        title: "Waves of Time",
        author: "Shanks",
        description: "A ship caught in a time loop relives its final voyage.",
        summary: "Each dawn, the crew wakes to a repeating storm. One engineer breaks protocol to steer the vessel into the unknown — and out of time.",
        genre: ["Adventure"],
        price: 199,
        coverImage: "/uploads/Waves%20of%20Time.webp",
        stock: 28,
        ratings: 4.3,
      },
      {
        title: "Clay and Smoke",
        author: "Shanks",
        description: "Folklore and fire magic clash in a tribal rebellion.",
        summary: "Warriors shaped from clay rise to challenge a sky clan’s fiery rule. A child born of both bloodlines may burn or rebuild the kingdom.",
        genre: ["Fantasy"],
        price: 179,
        coverImage: "/uploads/Clay%20and%20Smoke.webp",
        stock: 45,
        ratings: 4.4,
      },
      {
        title: "The Mercury Plan",
        author: "Shanks",
        description: "A journalist uncovers a climate conspiracy that spans decades.",
        summary: "Hidden beneath government labs lies a climate stabilizer — sabotaged years ago. Now, a reporter uncovers the truth before another storm hits.",
        genre: ["Sci-Fi", "Thriller"],
        price: 189,
        coverImage: "/uploads/The%20Mercury%20Plan.webp",
        stock: 36,
        ratings: 4.5,
      },
      {
        title: "City of Ciphers",
        author: "Shanks",
        description: "In Astro Planet, every thought has a price.",
        summary: "In a brain-trade marketplace, a message thief uncovers a cipher linking the rich to synthetic minds. But unlocking it comes at the cost of his own identity.",
        genre: ["Sci-Fi", "Mystery"],
        price: 249,
        coverImage: "/uploads/City%20of%20Ciphers.webp",
        stock: 39,
        ratings: 4.6,
      },
      {
        title: "Breakpoint Delta",
        author: "Shanks",
        description: "A robot's journey into the abyss of the night",
        summary: "Programmed to obey, Delta escapes the lab only to face an eerie wilderness divided by war and code. Her freedom lies beyond a shattered river bridge.",
        genre: ["Sci-Fi", "Adventure"],
        price: 159,
        coverImage: "/uploads/Breakpoint%20Delta.webp",
        stock: 34,
        ratings: 4.2,
      }
    ];

    await Book.insertMany(books);
    console.log('Books seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedBooks();
