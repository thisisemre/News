# News App

A modern news application built with React and Capacitor that provides real-time news updates with category-based filtering and notifications.

## Features

- 📱 Cross-platform (Web + Android)
- 🔄 Real-time news updates
- 📊 Publication timeline statistics
- 🔔 Category-based notifications
- 📱 Mobile-responsive design
- 🎯 Category-based filtering
- 📈 Visual data representation

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Vite**: Modern build tool for faster development
- **Capacitor**: Cross-platform native runtime for web apps
- **Chart.js**: For interactive publication statistics
- **NewsAPI**: Real-time news data provider
- **Local Storage**: For persisting user preferences

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Android Studio (for Android development)
- NewsAPI key

## Installation


### **1. Clone the Repository**
First, clone the project repository from your version control system:
```bash
git clone <repository-url>
```
Replace `<repository-url>` with the actual URL of the repository.

---

### **2. Navigate to the Project Directory**
Move into the project directory:
```bash
cd news-app
```

---

### **3. Install Dependencies**
Install all the required dependencies using `npm` or `yarn`:
```bash
npm install
# OR
yarn install
```

---

### **4. Configure Environment Variables**
Create a `.env` file in the root of the project to set up the environment variables:
```bash
touch .env
```

Add the following to the `.env` file (replace `your-news-api-key` with your actual NewsAPI key):
```bash
VITE_NEWS_API_KEY=your-news-api-key
```

---

### **5. Run the App Locally**
Start the development server:
```bash
npm run dev
# OR
yarn dev
```

This will start the app, and you can view it in your browser at:
```
http://localhost:5173
```

---

### **6. Run on Android**
If you want to run the app on Android using Capacitor:
1. Build the project:
   ```bash
   npm run build
   ```
2. Add the Android platform:
   ```bash
   npx cap add android
   ```
3. Sync the project with Capacitor:
   ```bash
   npx cap sync
   ```
4. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```
5. Build and run the app on an Android device or emulator.

---


The optimized files will be in the `dist` directory. You can serve these files using a static server.
