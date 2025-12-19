import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import ForgetPassword from "../pages/auth/ForgetPassword";
import VerificationCode from "../pages/auth/VerificationCode";
import ResetPassword from "../pages/auth/ResetPassword";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PrivacyPolicy from "../pages/Privacy Policy/PrivacyPolicy";
import TermsCondition from "../pages/Terms Condition/TermsCondition";
import UserDetails from "../pages/userDetails/UserDetails";
import CreateUser from "../pages/userDetails/CreateUser";
import ProfilePage from "../pages/profile/ProfilePage";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";
import ChangePass from "../pages/profile/ChangePass";
import AboutUs from "../pages/optional/AboutUs";
import EditProfile from "../pages/profile/EditProfile";
import CreateAdmin from "../pages/Create Admin/CreateAdmin";
import AddAdmin from "../pages/Add Admin/AddAdmin"
import Earnings from "../pages/Earnings/Earnings";
import Bookings from "../pages/Bookings/Bookings";
import Notifications from "../pages/Notifications/Notifications";
import Vehicles from "../pages/Vehicles/Vehicles";
import Reviews from "../pages/Reviews/Reviews";
import FAQ from "../pages/FAQ/FAQ";
import Content from "../pages/Content/Content";
import PrivateTransfers from "../pages/Content/PrivateTransfers";
import PopularDayTrips from "../pages/Content/PopularDayTrips";
import PopularMultiDayTours from "../pages/Content/PopularMultiDayTours";
import DayTrips from "../pages/Content/DayTrips";
import PopularTransferRoutes from "../pages/Content/PopularTransferRoutes";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verification-code",
    element: <VerificationCode />,
  },
  {
    path: "/new-password",
    element: <ResetPassword />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/user-details",
        element: <UserDetails />,
      },



      {
        path: "/create-user",
        element: <CreateUser />,
      },

      // settings
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsCondition />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePass />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/faq",
        element: <FAQ />
      },
      {
        path: "/create-admin",
        element: <CreateAdmin />,
      },
      {
        path: "/content",
        element: <Content />
      },
      {
        path: "/content/private-transfers",
        element: <PrivateTransfers />
      },
      {
        path: "/content/popular-day-trips",
        element: <PopularDayTrips />
      },
      {
        path: "/content/popular-multi-day-tours",
        element: <PopularMultiDayTours />
      },
      {
        path: "/content/popular-transfer-routes",
        element: <PopularTransferRoutes />
      },
      {
        path: "/content/day-trips",
        element: <DayTrips />
      },
      {
        path: "/add-admin",
        element: <AddAdmin />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/earnings",
        element: <Earnings />
      },
      {
        path: "/bookings",
        element: <Bookings />
      },
      {
        path: "/vehicles",
        element: <Vehicles />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      }
    ],
  },
]);

export default router;
