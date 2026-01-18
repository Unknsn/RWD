import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import EducationPage from './pages/EducationPage';
import FoodPage from './pages/FoodPage';
import MedicalPage from './pages/MedicalPage';
import DonationTypePage from './pages/DonationTypePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage';
import ThankYouPage from './pages/ThankYouPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';

function App() {
  return (
    <ThemeProvider>
      <Toast />
      <ScrollToTop />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaign/:id" element={<CampaignDetailPage />} />
          <Route path="/create-campaign" element={<CreateCampaignPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/medical" element={<MedicalPage />} />
          <Route path="/choose" element={<DonationTypePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
