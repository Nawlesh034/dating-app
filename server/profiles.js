const profileRows = [
  ["Maya", 26, "Brooklyn, NY", "Film photos, long walks, and finding the best dumplings in the city.", ["Film photography", "Sunday markets", "Indie movies"], ["Good coffee", "Kindness"], ["Loud bars", "Pineapple pizza"], "Woman", ["English", "Spanish"]],
  ["Jordan", 28, "Queens, NY", "Architect by day, amateur pasta maker by night. Always up for a museum.", ["Architecture", "Cooking", "Museums"], ["Fresh pasta", "Design books"], ["Early alarms", "Small talk"], "Non-binary", ["English"]],
  ["Amara", 25, "Jersey City, NJ", "I collect recipes and passport stamps. Looking for a co-pilot for both.", ["Travel", "Spicy food", "Afrobeats"], ["Big laughs", "New places"], ["Being late", "Cold fries"], "Woman", ["English", "French"]],
  ["Leo", 29, "Brooklyn, NY", "Climber, dog uncle, and firm believer that breakfast is a love language.", ["Rock climbing", "Dogs", "Brunch"], ["The outdoors", "Live music"], ["Traffic", "Overplanning"], "Man", ["English", "Italian"]],
  ["Priya", 27, "Manhattan, NY", "Here for thoughtful conversation and very competitive board games.", ["Board games", "Yoga", "Podcasts"], ["Curiosity", "Chai"], ["Spoilers", "Flaky plans"], "Woman", ["English", "Hindi"]],
  ["Elliot", 30, "Brooklyn, NY", "Musician with a soft spot for rainy days and neighborhood bookstores.", ["Live music", "Reading", "Cycling"], ["Vinyl", "Rainy walks"], ["Crowds", "Waste"], "Man", ["English"]],
  ["Sofia", 24, "Astoria, NY", "Weekend baker. I will absolutely bring too many pastries to the picnic.", ["Baking", "Parks", "Salsa"], ["Fresh bread", "Sunsets"], ["Overly sweet coffee", "Rushing"], "Woman", ["English", "Spanish"]],
  ["Kai", 28, "Long Island City, NY", "A little nerdy, very outdoorsy. Tell me your favorite trail.", ["Hiking", "Gaming", "Science"], ["Nature", "Good playlists"], ["Littering", "Spoilers"], "Non-binary", ["English", "Japanese"]],
  ["Nina", 26, "Brooklyn, NY", "Product designer who never met a plant she didn't want to take home.", ["Plants", "Design", "Thrifting"], ["Slow mornings", "Cats"], ["Fast fashion", "Gossip"], "Woman", ["English", "German"]],
  ["Theo", 31, "Hoboken, NJ", "Weekend cyclist, weekday teacher. Big fan of small adventures.", ["Cycling", "Teaching", "Coffee"], ["Good questions", "The beach"], ["Rudeness", "Overpacked schedules"], "Man", ["English", "Greek"]],
  ["Zara", 27, "Harlem, NY", "I make playlists for every occasion, including the walk to the corner store.", ["Music", "Poetry", "Dancing"], ["Vinyl shops", "Honesty"], ["Unread books", "Bad headphones"], "Woman", ["English", "Arabic"]],
  ["Sam", 29, "Brooklyn, NY", "Community garden volunteer and enthusiastic home cook.", ["Gardening", "Cooking", "Volunteering"], ["Local food", "Good company"], ["Food waste", "One-upping"], "Non-binary", ["English"]],
  ["Lucia", 25, "Manhattan, NY", "Museum hopper, espresso enthusiast, and beginner ceramicist.", ["Ceramics", "Museums", "Espresso"], ["Art", "Slow Sundays"], ["Burnt coffee", "Being unkind"], "Woman", ["English", "Portuguese"]],
  ["Miles", 27, "Queens, NY", "Let's trade favorite albums and find a diner open way too late.", ["Guitar", "Diners", "Basketball"], ["Soul music", "Late-night talks"], ["Cilantro", "Negativity"], "Man", ["English"]],
  ["Aisha", 30, "Jersey City, NJ", "Runner, reader, and collector of tiny joyful moments.", ["Running", "Fiction", "Photography"], ["Morning light", "Podcasts"], ["Litter", "Cold weather"], "Woman", ["English", "Urdu"]],
  ["Rowan", 26, "Brooklyn, NY", "Freelance illustrator. I draw people on the subway (with permission).", ["Drawing", "Animation", "Coffee"], ["Creativity", "Cats"], ["Cruelty", "Overly loud cafes"], "Non-binary", ["English"]],
  ["Diego", 28, "Astoria, NY", "Sunday soccer, family dinners, and trying every taco spot once.", ["Soccer", "Tacos", "Family"], ["Good food", "Big dogs"], ["Rain checks", "Bad salsa"], "Man", ["English", "Spanish"]],
  ["Mei", 25, "Manhattan, NY", "Data analyst who loves dance classes and getting lost in a good story.", ["Dance", "Sci-fi", "Food"], ["Curiosity", "Night walks"], ["Spoilers", "Wastefulness"], "Woman", ["English", "Mandarin"]],
  ["Alex", 32, "Brooklyn, NY", "Social worker, amateur woodworker, and committed beach-day planner.", ["Woodworking", "Swimming", "Cooking"], ["Empathy", "Fresh air"], ["Dishonesty", "Overcrowding"], "Man", ["English"]],
  ["Camila", 26, "Queens, NY", "My ideal first date: a bookshop, a walk, and a snack we share.", ["Reading", "Walking", "Empanadas"], ["Bookshops", "Animals"], ["Littering", "Rushing"], "Woman", ["English", "Spanish"]],
  ["Noah", 27, "Brooklyn, NY", "Science teacher. I can make a surprisingly good homemade pizza.", ["Science", "Pizza", "Hiking"], ["Learning", "Comedy"], ["Waste", "Mean jokes"], "Man", ["English", "French"]],
  ["Rae", 29, "Manhattan, NY", "UX researcher who asks a lot of questions and really listens to the answers.", ["Design", "Theater", "Travel"], ["Honesty", "Good stories"], ["Interrupting", "Tiny portions"], "Non-binary", ["English"]],
  ["Isabel", 28, "Hoboken, NJ", "I run a tiny supper club. Come hungry, leave with leftovers.", ["Cooking", "Hosting", "Sailing"], ["Shared meals", "Ocean air"], ["Food snobbery", "Waste"], "Woman", ["English", "Spanish"]],
  ["Omar", 30, "Queens, NY", "Photographer, basketball fan, and devoted neighborhood explorer.", ["Photography", "Basketball", "Travel"], ["Street food", "Good light"], ["Flakiness", "Bad photos"], "Man", ["English", "Arabic"]],
  ["Grace", 25, "Brooklyn, NY", "Nurse on night shifts; happiest near water or at a tiny comedy show.", ["Comedy", "Swimming", "Plants"], ["Gentleness", "Dark chocolate"], ["Rudeness", "Overplanning"], "Woman", ["English"]],
  ["Ravi", 29, "Jersey City, NJ", "Software engineer who'd rather talk about your favorite place than your job.", ["Tennis", "Travel", "Cooking"], ["Curiosity", "Street food"], ["Cynicism", "Being late"], "Man", ["English", "Hindi"]],
  ["Tess", 27, "Brooklyn, NY", "Thrift-store treasure hunter and beginner at just about everything.", ["Thrifting", "Pottery", "Biking"], ["Secondhand finds", "Laughter"], ["Fast fashion", "Spiders"], "Woman", ["English"]],
  ["Andre", 31, "Harlem, NY", "Jazz drummer, devoted uncle, and fan of a well-planned picnic.", ["Jazz", "Picnics", "History"], ["Family", "Live shows"], ["Cold pizza", "Bad manners"], "Man", ["English", "French"]],
  ["Lina", 24, "Astoria, NY", "Design student. I can recommend a dessert place for any mood.", ["Illustration", "Dessert", "K-pop"], ["Art", "Kindness"], ["Bitter coffee", "Traffic"], "Woman", ["English", "Korean"]],
  ["Finn", 28, "Brooklyn, NY", "Bike mechanic who likes fixing things and learning how things work.", ["Bikes", "Woodworking", "Camping"], ["Repairing things", "Open roads"], ["Waste", "Rush hour"], "Man", ["English", "Irish"]]
];

export const profiles = profileRows.map((row, index) => ({
  id: `profile-${String(index + 1).padStart(2, "0")}`,
  name: row[0],
  age: row[1],
  city: row[2],
  bio: row[3],
  interests: row[4],
  likes: row[5],
  dislikes: row[6],
  gender: row[7],
  languages: row[8],
  photo: `https://i.pravatar.cc/900?img=${index + 1}`,
  prompts: [
    { question: "A perfect Sunday looks like…", answer: row[3].split(".")[0] + "." }
  ]
}));

export const demoUser = {
  id: "demo-user",
  name: "Alex",
  photo: "https://i.pravatar.cc/200?img=12",
  dateOfBirth: "1998-04-12",
  gender: "Man",
  languages: ["English", "Hindi"],
  heightCm: 178,
  city: "Brooklyn, NY",
  bio: "Good conversation, new places, and finding the best chai in the city.",
  interests: ["Coffee", "Hiking", "Live music", "Cooking"],
  likes: ["Kindness", "Curiosity", "Good coffee"],
  dislikes: ["Rudeness", "Wastefulness"],
  prompts: [
    { question: "A small thing that makes my day…", answer: "A great song at exactly the right time." },
    { question: "The way to win me over…", answer: "Be kind to the waitstaff." }
  ],
  preferences: {
    ageRange: [23, 35],
    genders: ["Woman", "Man", "Non-binary"],
    languages: ["English", "Hindi", "Spanish"]
  }
};
