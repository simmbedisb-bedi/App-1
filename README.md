# ✨ My Daily Glow — Routine Tracker

A female-friendly daily routine tracking app with gamified checklists and automated SMS notifications.

## Features
- **Daily gamified checklist** with points, streaks, and progress ring
- **Automated SMS notifications** at scheduled times via Twilio
- **Rotating workout plan** — Leg Day, Back Day, HIIT, and more (7-day cycle)
- **Daily breakfast suggestions** — healthy, hormone-balancing options
- **30–60 day progress history**

## Notification Schedule
| Time    | Message                        |
|---------|-------------------------------|
| 7:00 AM | Wake-up motivation message    |
| 7:15 AM | Bathroom / freshen up reminder|
| 7:30 AM | Coffee time                   |
| 7:45 AM | Workout (with day's exercises)|
| 8:00 AM | Shower reminder               |
| 9:00 AM | Breakfast (what to eat)       |

## Setup

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure SMS (Twilio)
```bash
cp server/.env.example server/.env
```
Edit `server/.env` with your Twilio credentials:
- Create a free account at https://twilio.com
- Add your Account SID, Auth Token, and phone numbers

### 3. Run the app
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend:  http://localhost:5000

## Without Twilio
The app works fully without Twilio — SMS messages are printed to the server console as previews. Use the **Test Notifications** panel in the app to preview each message.

## Extending
- Add more tasks in `server/src/data/checklist.js`
- Modify workout schedule in `server/src/data/workouts.js`
- Add more notification times in `server/src/services/smsService.js`
- Change timezone in `server/src/services/schedulerService.js`
