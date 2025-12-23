# Detroit Fit 313 Admin Dashboard 🏋️‍♂️💪

A modern, feature-rich admin dashboard for managing Detroit Fit 313's fitness platform, including user management, earnings tracking, booking management, and comprehensive analytics.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.3-38B2AC?logo=tailwind-css&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.23.4-0170FE?logo=ant-design&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7.1.5-CA4245?logo=react-router&logoColor=white)

---

## ✨ Features

### 📊 Dashboard & Analytics
- **Real-time Statistics**: Track total users, agents, and revenue at a glance
- **Revenue Growth Chart**: Interactive line chart powered by Chart.js showing revenue trends over time
- **User Distribution**: Visual pie chart displaying the breakdown between users and agents
- **Recent Users Table**: Quick view of the latest user registrations with profile details
- **Year Filtering**: Dynamic year selector to view historical data

### 👥 User Management
- **All Users Page**: Comprehensive user directory with detailed information
- **User Profiles**: View complete user details including contact information and registration dates
- **Role Management**: Distinguish between regular users and agents
- **Search & Filter**: Quickly find users with advanced filtering options

### 💰 Earnings Management
- **Transaction Tracking**: Monitor all financial transactions
- **Revenue Analytics**: Detailed breakdown of earnings by period
- **Payment History**: Complete transaction logs with timestamps
- **Financial Reports**: Generate and export earning reports

### 📅 Booking Management
- **Booking Overview**: View all bookings in a centralized dashboard
- **Booking Details**: Access comprehensive booking information
- **Status Tracking**: Monitor booking statuses (pending, confirmed, completed, cancelled)
- **Customer Information**: Quick access to customer details for each booking

### 🔔 Notifications
- **System Notifications**: Manage platform-wide announcements
- **User Alerts**: Send targeted notifications to specific user groups
- **Real-time Updates**: Instant notification delivery system
- **Notification History**: Track all sent notifications

### ⚙️ Settings & Configuration

#### Profile Management
- **Edit Profile**: Update admin profile information
- **Change Password**: Secure password management with validation
- **Profile Picture**: Upload and manage profile images

#### System Settings
- **General Settings**: Configure platform-wide settings
- **Privacy Policy**: Manage and update privacy policy content
- **Terms & Conditions**: Edit terms and conditions
- **About Us**: Update company information and mission statement

### 🔐 Authentication & Security
- **Secure Sign In**: Protected admin authentication
- **Forgot Password**: Email-based password recovery
- **Verification Code**: Two-step verification process
- **Reset Password**: Secure password reset flow
- **Session Management**: Automatic logout and session timeout

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **Vite 6.0.5** - Lightning-fast build tool and dev server with HMR

### Styling & UI
- **TailwindCSS 4.0.3** - Utility-first CSS framework with custom configuration
- **Ant Design 5.23.4** - Enterprise-level UI component library
- **Custom Gradients** - Amber to orange gradient theme (#F3AB0C → #F96803)
- **Glassmorphism Effects** - Modern frosted glass UI elements

### Data Visualization
- **Chart.js 4.5.1** - Powerful charting library for analytics
- **React Chart.js 2 (5.3.1)** - React wrapper for Chart.js
- **Recharts 2.15.4** - Composable charting library built on React components

### Routing & Navigation
- **React Router DOM 7.1.5** - Declarative routing for React applications

### Icons
- **React Icons 5.5.0** - Comprehensive icon library including:
  - Feather Icons (Fi)
  - Ionicons (Io)
  - Font Awesome (Fa)
  - Material Design (Md)
  - Bootstrap Icons (Bs)
  - Heroicons (Hi)
  - Tabler Icons (Tb)
  - Lucide Icons (Lu)

### Utilities
- **Day.js 1.11.13** - Lightweight date manipulation library
- **html2pdf.js 0.12.1** - Client-side PDF generation
- **React Quill 2.0.0** - Rich text editor for content management

### Development Tools
- **ESLint 9.17.0** - Code quality and consistency
- **Vite Plugin React 4.3.4** - Fast Refresh and JSX support

---

## 📁 Project Structure

```
detroit-fit-313-dashboard/
├── public/
│   ├── logo.png                    # Application logo
│   ├── mar.jpg                     # Marketing image
│   └── userimg.png                 # Default user avatar
├── src/
│   ├── assets/                     # Static assets
│   ├── components/                 # Reusable components
│   ├── layout/
│   │   └── MainLayout.jsx          # Main application layout with sidebar
│   ├── pages/
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── SignInPage.jsx      # Login page
│   │   │   ├── ForgetPassword.jsx  # Password recovery
│   │   │   ├── VerificationCode.jsx # Code verification
│   │   │   └── ResetPassword.jsx   # Password reset
│   │   ├── dashboard/              # Dashboard & analytics
│   │   │   ├── DashboardPage.jsx   # Main dashboard
│   │   │   ├── RevenueChart.jsx    # Revenue analytics chart
│   │   │   ├── UserAgentChart.jsx  # User distribution chart
│   │   │   └── RecentUsers.jsx     # Recent users table
│   │   ├── Bookings/
│   │   │   └── Bookings.jsx        # Booking management
│   │   ├── Earnings/
│   │   │   └── Earnings.jsx        # Financial tracking
│   │   ├── Notifications/
│   │   │   └── Notifications.jsx   # Notification center
│   │   ├── userDetails/
│   │   │   └── UserDetails.jsx     # User management
│   │   ├── profile/                # Profile management
│   │   │   ├── ProfilePage.jsx     # Profile view
│   │   │   ├── EditProfile.jsx     # Profile editing
│   │   │   └── ChangePass.jsx      # Password change
│   │   ├── Settings/
│   │   │   └── Settings.jsx        # System settings
│   │   ├── Privacy Policy/
│   │   │   └── PrivacyPolicy.jsx   # Privacy policy management
│   │   ├── Terms Condition/
│   │   │   └── TermsCondition.jsx  # Terms management
│   │   └── optional/
│   │       └── AboutUs.jsx         # About page
│   ├── shared/
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx         # Navigation sidebar
│   │   └── MainHeader/
│   │       └── MainHeader.jsx      # Application header
│   ├── routes/
│   │   └── Routes.jsx              # Route configuration
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── vercel.json                     # Vercel deployment config
└── README.md                       # This file
```

---

## 🎨 Design System

### Color Palette
The dashboard features a vibrant, energetic color scheme perfect for a fitness brand:

- **Primary Gradient**: `#F3AB0C` (Amber) → `#F96803` (Orange)
- **Background**: Slate with amber/orange accents
- **Text**: Slate-700 for body, gradient for headings
- **Success**: Green tones for positive actions
- **Danger**: Red-500 to Rose-600 for destructive actions

### UI Components

#### Sidebar Navigation
- **Gradient Background**: Slate to amber/orange gradient
- **Active States**: Full gradient background with shadow effects
- **Hover Effects**: Subtle scale animations and background changes
- **Responsive**: Slide-in drawer on mobile, fixed on desktop
- **Sections**:
  - Main Menu (Dashboard, All Users, Earnings, Bookings)
  - Administration (Settings)
  - Logout (Fixed at bottom)

#### Dashboard Cards
- **Stat Cards**: Gradient backgrounds with icons
- **Charts**: Interactive Chart.js visualizations
- **Tables**: Ant Design tables with custom amber/orange headers
- **Glassmorphism**: Frosted glass effects on overlays

#### Buttons & Actions
- **Primary**: Amber to orange gradient
- **View**: Amber accent color
- **Edit**: Green for modifications
- **Delete**: Red for destructive actions
- **Hover**: Scale animations and shadow enhancements

### Responsive Design
Fully responsive across all devices:
- **Desktop**: 1920px+ (Full sidebar, expanded charts)
- **Laptop**: 1024px - 1919px (Standard layout)
- **Tablet**: 768px - 1023px (Collapsible sidebar)
- **Mobile**: 320px - 767px (Drawer navigation, stacked layout)

### Animations & Transitions
- **Smooth Transitions**: 300ms ease-in-out for all interactions
- **Hover Effects**: Scale transforms (1.01-1.02)
- **Active Indicators**: Pulsing dots on active menu items
- **Loading States**: Skeleton screens and spinners

---

## 📊 Dashboard Features

### Statistics Cards
- **Total Users**: Count of all registered users
- **Total Agents**: Count of registered agents
- **Total Revenue**: Sum of all earnings

### Charts
1. **Revenue Growth Chart** (Line Chart)
   - Monthly revenue trends
   - Interactive tooltips
   - Year-based filtering
   - Gradient fill under line

2. **User vs Agent Chart** (Pie Chart)
   - Visual distribution
   - Percentage breakdown
   - Color-coded segments

### Recent Users Table
- User profile pictures
- Name and email
- Registration date
- User type (User/Agent)
- Quick actions

---


### Best Practices
- Keep components focused and single-purpose
- Use custom hooks for shared logic
- Implement proper error boundaries
- Add loading states for async operations
- Ensure accessibility (ARIA labels, keyboard navigation)

---


## 📄 License

This project is private and proprietary to Detroit Fit 313.



**Built with ❤️ for Detroit Fit 313** 🏋️‍♂️💪

