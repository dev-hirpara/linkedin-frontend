# Mini LinkedIn - Frontend

React-based frontend for the Mini LinkedIn social networking platform.

## Tech Stack

- React 18 with TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router DOM (Routing)
- React Context API (State management)
- Lucide React (Icons)
- React Hot Toast (Notifications)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Auth/               # Authentication components
│   ├── Layout/             # Layout components
│   ├── Posts/              # Post-related components
│   └── ProtectedRoute.tsx  # Route protection
├── context/                # React context providers
├── lib/                    # Utility libraries
├── pages/                  # Page components
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## Features

- User authentication (login/register)
- Protected routes
- Responsive design
- Post creation and viewing
- User profiles
- Real-time notifications
