# Authentication Dashboard Documentation

## Overview
This project is a simple authentication dashboard using **Auth0** for authentication. It includes a main dashboard page with three buttons, each leading to a specific form after authentication.

## Project Structure
```
.
├── auth_config.json  # Auth0 configuration
├── index.html        # Main dashboard page
├── package.json      # Project dependencies
├── package-lock.json # Lock file for dependencies
├── public
│   ├── css
│   │   └── main.css  # Stylesheet for forms
│   └── js
│       └── app.js    # JavaScript logic
├── server.js         # Express server
```

## Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the server**
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`

## Authentication Flow
1. User clicks **Button 1, 2, or 3** on the dashboard.
2. The system connects to **Auth0** for authentication.
3. If the user is **authenticated**, a token is generated.
4. The token is used to call a **web service**.
5. The user is redirected to the respective form **(Form 1, 2, or 3)**.
6. The form appears with a **Submit** button.

## Test User Credentials
For testing, you can use the following credentials:
- **Email:** testuser@me.com
- **Password:** Test@1212

## Files Explained
### **index.html** (Dashboard UI)
Contains:
- Three buttons (`Button 1`, `Button 2`, `Button 3`)
- Three hidden forms (`Form 1`, `Form 2`, `Form 3`)
- Loads **Auth0 SPA SDK**
- Includes `app.js` for logic

### **public/js/app.js** (Authentication Logic)
Handles:
- Initializing **Auth0** client
- Authenticating users
- Generating and logging token
- Redirecting to the corresponding form

### **server.js** (Backend Server)
- Uses **Express** to serve static files.
- Provides an endpoint to fetch **auth_config.json**.

## Styling
- `public/css/main.css` contains basic styling.
- Hidden forms are managed using the `.hidden` class.

## Running in Development Mode
For auto-restarting the server during development, use:
```bash
npm run dev
```

## Conclusion
This project demonstrates a simple **Auth0-based authentication system** where users log in before accessing different forms. You can customize it further as needed.


