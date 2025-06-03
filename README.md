# Discord XP Bot Dashboard

A beautiful, responsive web dashboard for tracking Discord XP bot statistics, user levels, and server leaderboards.

## 🎮 Features

- **Real-time Bot Stats** - View bot status and server count
- **Server Leaderboards** - See top users by XP and level  
- **User Stats Lookup** - Check individual user progress
- **Beautiful UI** - Glassmorphism design with gradient backgrounds
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Role Progression** - Visual representation of XP role system

## 🏆 XP Bot Role System

- **Noob Chatter** (Level 1-9)
- **Better Chatter** (Level 10-24)  
- **Extreme Chatter** (Level 25-49)
- **King Bob Chatter** (Level 50+)

## 🚀 Bot Commands

- `!level` - Show your current level and XP
- `!level @user` - Show another user's level
- `!leaderboard` - Display server leaderboard
- `!fixroles` - Fix role assignments (admin only)

## 🛠 How XP Works

- **1 word = 1 XP** - Real words count toward experience
- **Exponential leveling** - Higher levels require more XP
- **Spam filtering** - Repeated characters and gibberish filtered out
- **Auto role assignment** - Roles update automatically on level up

## 📱 Dashboard Usage

1. Enter your **Discord Server ID** to view leaderboards
2. Enter **User IDs** to look up individual stats
3. Monitor bot status and server count in real-time

## 🔧 Setup

This dashboard connects to a Discord XP bot backend. Make sure your bot is properly configured with:

- MESSAGE_CONTENT intent enabled
- Manage Roles permission
- Proper role hierarchy in Discord server

## 🎨 Built With

- React 19
- Tailwind CSS
- Glassmorphism UI design
- Responsive layouts

---

**Made with ❤️ for Discord communities**