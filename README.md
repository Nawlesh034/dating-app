# Coy Discover

A standalone, mobile-first swipe discovery demo built with React, Tailwind CSS, Express, and a local JSON store. The app includes a blank Home tab, Discover, and a Matches view. No external authentication is used.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal. The Express API runs on port 4000 and Vite proxies `/api` requests to it. For a production-style local run, use `npm run build` followed by `npm start`; Express then serves the built app and API together on port 4000.

The first API request creates `data/store.json`. It keeps swipes and matches across restarts. Remove that specific file to reset the demo and restore the seeded incoming likes.

## API

- `GET /api/feed` returns profiles the demo user has not swiped on.
- `POST /api/swipe` accepts `{ "profileId": "profile-01", "action": "like" }` (or `"pass"`) and returns `{ "matched": boolean, "match": profile | null }`.
- `GET /api/matches` returns mutual matches only.
- `GET /api/me` returns the demo user's public profile fields. It never returns their date of birth.

Three sample profiles have already liked the demo user. Those likes are never exposed by the feed or a separate likes endpoint.

## Demo user data points

- **Identity:** unique user ID and name.
- **Private account data:** date of birth, stored privately and used to calculate age. The exact date of birth is not sent by the API.
- **Profile details:** name, profile photo, age, optional gender, language preferences, optional height in centimeters, city, short bio, interests, personal likes/dislikes, and optional question-and-answer prompts.
- **Discovery preferences:** preferred age range, genders, and languages.

The user's personal likes/dislikes and interests describe their profile; they are separate from swipe actions. Incoming one-way likes are never returned. Only fields intended for a dating profile are returned for other profiles. For a real service, location and sensitive profile details should be optional, user-controlled, and covered by an appropriate privacy policy.
