import express from "express";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { demoUser, profiles } from "./profiles.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const userId = demoUser.id;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(currentDir, "../data");
const storePath = path.join(dataDir, "store.json");
const frontendDir = path.resolve(currentDir, "../dist");

app.use(express.json());

function ageFromDob(dateOfBirth) {
  const dob = new Date(`${dateOfBirth}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const beforeBirthday = today.getMonth() < dob.getMonth()
    || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

function initialStore() {
  return {
    swipes: [
      { fromUserId: "profile-01", toUserId: userId, action: "like", createdAt: new Date().toISOString() },
      { fromUserId: "profile-04", toUserId: userId, action: "like", createdAt: new Date().toISOString() },
      { fromUserId: "profile-09", toUserId: userId, action: "like", createdAt: new Date().toISOString() }
    ],
    matches: []
  };
}

function readStore() {
  mkdirSync(dataDir, { recursive: true });
  try {
    return JSON.parse(readFileSync(storePath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const store = initialStore();
    writeFileSync(storePath, JSON.stringify(store, null, 2));
    return store;
  }
}

function writeStore(store) {
  const temporaryPath = `${storePath}.tmp`;
  writeFileSync(temporaryPath, JSON.stringify(store, null, 2));
  renameSync(temporaryPath, storePath);
}

function normalizedPair(firstId, secondId) {
  return [firstId, secondId].sort((a, b) => a.localeCompare(b));
}

function publicProfile(profile) {
  const { id, name, age, photo, bio, city, interests, likes, dislikes, gender, languages, prompts } = profile;
  return { id, name, age, photo, bio, city, interests, likes, dislikes, gender, languages, prompts };
}

app.get("/api/me", (_request, response) => {
  const { dateOfBirth, ...privateProfile } = demoUser;
  response.json({ ...privateProfile, age: ageFromDob(dateOfBirth) });
});

app.get("/api/feed", (_request, response) => {
  const store = readStore();
  const swipedIds = new Set(
    store.swipes.filter((swipe) => swipe.fromUserId === userId).map((swipe) => swipe.toUserId)
  );
  const feed = profiles.filter((profile) => !swipedIds.has(profile.id));
  response.json(feed.map(publicProfile));
});

app.post("/api/feed/refresh", (_request, response) => {
  const store = readStore();
  const available = profiles.some((profile) => !store.swipes.some(
    (swipe) => swipe.fromUserId === userId && swipe.toUserId === profile.id
  ));

  // Recycle the demo feed only after every profile has been seen. Keep inbound
  // likes and saved matches so refreshing discovery does not erase matches.
  if (!available) {
    store.swipes = store.swipes.filter((swipe) => swipe.fromUserId !== userId);
    writeStore(store);
  }

  const swipedIds = new Set(
    store.swipes.filter((swipe) => swipe.fromUserId === userId).map((swipe) => swipe.toUserId)
  );
  response.json(profiles.filter((profile) => !swipedIds.has(profile.id)).map(publicProfile));
});

app.post("/api/swipe", (request, response) => {
  const { profileId, action } = request.body ?? {};
  const profile = profiles.find((candidate) => candidate.id === profileId);
  if (!profile || !["like", "pass"].includes(action)) {
    return response.status(400).json({ error: "Provide a valid profileId and an action of like or pass." });
  }

  const store = readStore();
  const existingSwipe = store.swipes.find(
    (swipe) => swipe.fromUserId === userId && swipe.toUserId === profileId
  );
  if (existingSwipe) {
    return response.status(409).json({ error: "You have already swiped on this profile." });
  }

  store.swipes.push({
    fromUserId: userId,
    toUserId: profileId,
    action,
    createdAt: new Date().toISOString()
  });

  let match = null;
  if (action === "like") {
    const reciprocated = store.swipes.some(
      (swipe) => swipe.fromUserId === profileId && swipe.toUserId === userId && swipe.action === "like"
    );
    if (reciprocated) {
      const [userA, userB] = normalizedPair(userId, profileId);
      let savedMatch = store.matches.find((item) => item.userA === userA && item.userB === userB);
      if (!savedMatch) {
        savedMatch = { userA, userB, createdAt: new Date().toISOString() };
        store.matches.push(savedMatch);
      }
      match = { ...publicProfile(profile), matchedAt: savedMatch.createdAt };
    }
  }

  writeStore(store);
  return response.json({ matched: Boolean(match), match });
});

app.get("/api/matches", (_request, response) => {
  const store = readStore();
  const matches = store.matches
    .filter((match) => match.userA === userId || match.userB === userId)
    .map((match) => {
      const otherUserId = match.userA === userId ? match.userB : match.userA;
      const profile = profiles.find((candidate) => candidate.id === otherUserId);
      return profile ? { ...publicProfile(profile), matchedAt: match.createdAt } : null;
    })
    .filter(Boolean);
  response.json(matches);
});

app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API route not found." });
});

if (existsSync(frontendDir)) {
  app.use(express.static(frontendDir));
  app.get("*", (_request, response) => {
    response.sendFile(path.join(frontendDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Coy Discover API listening on http://localhost:${port}`);
});
