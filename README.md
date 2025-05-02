# 🎁 Gift Idea Tracker

A mobile application built with **React Native + Redux + Supabase**, designed to help users organize and track gift ideas for their friends, family, and special occasions — all in one place.

> 📆 Plan ahead. 🎁 Stay thoughtful. 💡 Never forget a gift again.

---

## ✨ Features

- 🧠 AI-assisted wireframes for fast UI prototyping
- 📋 Manage gift ideas with title, image, notes, and tags
- 👥 Add & manage recipients and event dates
- 💰 Track budgets for each recipient and overall spending
- 📊 Visual charts for budget analysis
- ⏰ Reminder & calendar sync for upcoming events
- 🔔 Push notifications (optional)
- ☁️ Data stored securely using Supabase

---
<!-- 
## 📱 Screenshots

| Home Screen | Budget Overview | Add Gift Idea |
|-------------|------------------|----------------|
| ![Home](screenshots/home.png) | ![Budget](screenshots/budget.png) | ![Add](screenshots/add.png) | -->

---

## 🛠️ Tech Stack

| Layer        | Tools/Tech                                   |
|--------------|----------------------------------------------|
| Frontend     | React Native, Redux Toolkit, TypeScript      |
| Backend      | Supabase (PostgreSQL, Auth, Storage)         |
| Design       | Figma, Uizard                                |
| Testing      | Jest, React Native Testing Library, Detox    |
| Build/Deploy | Expo, EAS Build, Google Play, TestFlight     |

---

## 🧪 Testing Strategy

| Test Type     | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| Unit Test     | Validate functions, reducers, small components (e.g., `NoteCard`, `noteSlice`) |
| Integration   | Test flow across Redux + UI + Service (e.g., add/delete note flows)         |
| UI Test       | Ensure components render correctly with given state                         |
| E2E Test      | Simulate real user interactions via Detox                                   |
| API/Service   | Mock Supabase API calls and validate service logic                          |

📦 Full testing report included in `/__tests__` folder.

---

## 🚀 Deployment

- Built and deployed via **EAS Build** (Expo Application Services)
- Internal Testing with **Expo Go**
- ✅ Android `.apk` ready for distribution
- ✅ iOS `.ipa` tested via TestFlight

### Deployment Tools

- Expo CLI / EAS CLI
- Google Play Console
- Apple Developer Console
- OTA updates with `eas update`
