import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import { ExchangeRatesPage } from './pages/ExchangeRatesPage'
import { CollectionPage } from './pages/CollectionPage'
import { DisbursementPage } from './pages/DisbursementPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { CareersPage } from './pages/CareersPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rates" element={<ExchangeRatesPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/disbursement" element={<DisbursementPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
