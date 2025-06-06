# 🎁 Gift Idea Tracker

A mobile application built with **React Native + Redux + Supabase**, designed to help users organize and track gift ideas for their friends, family, and special occasions — all in one place.

> 📆 Plan ahead. 🎁 Stay thoughtful. 💡 Never forget a gift again.

---

<img src="https://raw.githubusercontent.com/fptqnk17/.github/refs/heads/main/images/banner-bao-thu.png" alt="Advertisement" />

## 💡 AI-Powered Development Workflow

We leveraged **cutting-edge AI tools** throughout the entire software development lifecycle to accelerate productivity, improve quality, and stay creative:

| Phase                    | Tools Used                                                                                                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📋 Requirement Gathering | [ChatGPT](https://chat.openai.com) – Assist in defining user stories and features                                                                                                                                         |
| 🎨 UI/UX Design          | [Uizard](https://uizard.io) + Autodesigner 1.5 for AI wireframes and flows<br>[Figma](https://figma.com) + Codia AI plugin for auto-generating UI components                                                              |
| 💻 Development           | [a0.dev](https://a0.dev) to generate boilerplate code from designs<br>[VSCode](https://code.visualstudio.com) with [GitHub Copilot](https://github.com/features/copilot) for live coding, bug fixes, and code suggestions |
| 🧪 Testing               | Combination of **GitHub Copilot** and **ChatGPT** for writing test cases and debugging<br>Manual & automated testing via Jest + React Native Testing Library                                                              |

<br/>

## ✨ Features

- 🧠 AI-assisted wireframes for fast UI prototyping
- 📋 Manage gift ideas with title, image, notes, and tags
- 👥 Add & manage recipients and event dates
- 💰 Track budgets for each recipient and overall spending
- 📊 Visual charts for budget analysis
- ⏰ Reminder & calendar sync for upcoming events
- 🔔 Push notifications (optional)
- ☁️ Data stored securely using Supabase

<br/>

## 🛠️ Tech Stack

| Layer        | Tools/Tech                                |
| ------------ | ----------------------------------------- |
| Frontend     | React Native, Redux Toolkit, TypeScript   |
| Backend      | Supabase (PostgreSQL, Auth, Storage)      |
| Design       | Uizard, Figma (with Codia AI)             |
| AI Assistant | ChatGPT, GitHub Copilot, a0.dev           |
| Testing      | Jest, React Native Testing Library, Detox |
| Build/Deploy | Expo, EAS Build, Google Play, TestFlight  |

<br/>

## 🧩 Installation & Running App

- Clone the repository:

  ```bash
  git clone https://github.com/your-username/gift-idea-tracker.git
  cd gift-idea-tracker
  ```

- Install dependencies using Bun:

  ```bash
  bun install
  ```

- Start Expo development server

  ```bash
  bun run start
  ```

- Run unit and integration tests
  ```bash
  bun x jest
  ```

<br/>

## ⚙️ Configuration

Create a `.env` file there and add the following environment variables:

| #   | Variable Name           | Description                        | Example                        |
| --- | ----------------------- | ---------------------------------- | ------------------------------ |
| 1   | SUPABASE_URL            | The URL of your Supabase project   | https://xyzcompany.supabase.co |
| 2   | SUPABASE_KEY            | The API key for accessing Supabase | your-supabase-api-key          |
| 3   | EXPO_ROUTER_IMPORT_MODE | The import mode for Expo Router    | static                         |
