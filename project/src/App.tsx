import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Analytics } from './components/Analytics';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/dashboard/Clients';
import { ClientDetails } from './pages/dashboard/ClientDetails';
import { Profile } from './pages/dashboard/Profile';
import { MailboxStats } from './pages/dashboard/email/MailboxStats';
import { EmailByClient } from './pages/dashboard/email/EmailByClient';
import { EmailDetails } from './pages/dashboard/email/EmailDetails';
import { AllEmails } from './pages/dashboard/email/AllEmails';
import { CampaignStats } from './pages/dashboard/campaign/CampaignStats';
import { CampaignByClient } from './pages/dashboard/campaign/CampaignByClient';
import { CampaignDetails } from './pages/dashboard/campaign/CampaignDetails';
import { AllCampaigns } from './pages/dashboard/campaign/AllCampaigns';
import { MapMailbox } from './pages/dashboard/map/MapMailbox';
import { MapCampaign } from './pages/dashboard/map/MapCampaign';
import { Others } from './pages/dashboard/Others';
import { ProtectedRoute } from './components/ProtectedRoute';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics />
      <Routes>
        {/* Public routes with Navbar and Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <Navbar />
            <Pricing />
            <Footer />
          </>
        } />
        <Route path="/team" element={
          <>
            <Navbar />
            <Team />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/privacy" element={
          <>
            <Navbar />
            <PrivacyPolicy />
            <Footer />
          </>
        } />
        <Route path="/terms" element={
          <>
            <Navbar />
            <Terms />
            <Footer />
          </>
        } />
        <Route path="/signin" element={
          <>
            <Navbar />
            <SignIn />
            <Footer />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Navbar />
            <SignUp />
            <Footer />
          </>
        } />
        <Route path="/forgot-password" element={
          <>
            <Navbar />
            <ForgotPassword />
            <Footer />
          </>
        } />

        {/* Protected routes */}
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/dashboard/clients/:clientId" element={<ProtectedRoute><ClientDetails /></ProtectedRoute>} />
        <Route path="/dashboard/email/mailbox-stats" element={<ProtectedRoute><MailboxStats /></ProtectedRoute>} />
        <Route path="/dashboard/email/by-client" element={<ProtectedRoute><EmailByClient /></ProtectedRoute>} />
        <Route path="/dashboard/email/all" element={<ProtectedRoute><AllEmails /></ProtectedRoute>} />
        <Route path="/dashboard/email/:email" element={<ProtectedRoute><EmailDetails /></ProtectedRoute>} />
        <Route path="/dashboard/campaign/stats" element={<ProtectedRoute><CampaignStats /></ProtectedRoute>} />
        <Route path="/dashboard/campaign/by-client" element={<ProtectedRoute><CampaignByClient /></ProtectedRoute>} />
        <Route path="/dashboard/campaign/all" element={<ProtectedRoute><AllCampaigns /></ProtectedRoute>} />
        <Route path="/dashboard/campaign/:campaignId" element={<ProtectedRoute><CampaignDetails /></ProtectedRoute>} />
        <Route path="/dashboard/map/mailbox" element={<ProtectedRoute><MapMailbox /></ProtectedRoute>} />
        <Route path="/dashboard/map/campaign" element={<ProtectedRoute><MapCampaign /></ProtectedRoute>} />
        <Route path="/dashboard/others" element={<ProtectedRoute><Others /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}