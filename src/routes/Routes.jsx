import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Contact from "../pages/Contact"
import Features from "../pages/Features"
import Upcoming from "../pages/Upcoming"
import NavBar from "../components/NavBar"
import InvoiceForm from "../components/invoiceForm"

const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      {/* <Alert /> */}
      <div className='flex items-center justify-center relative pt-20'>
        <div className='artboard min-h-[90vh]'>
          <Routes>
            <Route path="/" element={<InvoiceForm />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/upcoming" element={<Upcoming />} />
          </Routes>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by ExpressBills.</p>
        </aside>
      </footer>
    </Router>
  )
}

export default AppRoutes;