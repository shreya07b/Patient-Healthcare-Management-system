import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Download,
  FileBarChart2,
  FileText,
  Filter,
  HeartPulse,
  LayoutDashboard,
  Menu,
  Microscope,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import doctorOne from "./assets/D1.png";
import doctorTwo from "./assets/D2.png";
import doctorThree from "./assets/D3.png";
import doctorFour from "./assets/D4.png";

const doctors = [
  {
    id: "D-201",
    name: "Dr. Aanya Menon",
    specialty: "Cardiology",
    department: "Cardiology",
    experience: 14,
    fee: 1600,
    rating: 4.9,
    gender: "Female",
    availability: "Available Today",
    image: doctorOne,
  },
  {
    id: "D-118",
    name: "Dr. Rohan Kapoor",
    specialty: "Neurology",
    department: "Neurology",
    experience: 11,
    fee: 1800,
    rating: 4.8,
    gender: "Male",
    availability: "Next Slot: 3:30 PM",
    image: doctorTwo,
  },
  {
    id: "D-155",
    name: "Dr. Meera Iyer",
    specialty: "Pediatrics",
    department: "Pediatrics",
    experience: 9,
    fee: 1200,
    rating: 4.9,
    gender: "Female",
    availability: "Available Tomorrow",
    image: doctorThree,
  },
  {
    id: "D-304",
    name: "Dr. Kabir Shah",
    specialty: "Orthopedics",
    department: "Orthopedics",
    experience: 13,
    fee: 1500,
    rating: 4.7,
    gender: "Male",
    availability: "Available Today",
    image: doctorFour,
  },
];

const departments = [
  {
    name: "Cardiology",
    description: "Advanced cardiac diagnostics, imaging, and intervention pathways.",
    head: "Dr. Aanya Menon",
    specialists: 18,
    icon: HeartPulse,
  },
  {
    name: "Neurology",
    description: "Specialist support for stroke, neuroimaging, and chronic care planning.",
    head: "Dr. Rohan Kapoor",
    specialists: 14,
    icon: Microscope,
  },
  {
    name: "Pediatrics",
    description: "Child-first care with immunization, nutrition, and neonatal follow-ups.",
    head: "Dr. Meera Iyer",
    specialists: 16,
    icon: ShieldCheck,
  },
  {
    name: "Orthopedics",
    description: "Trauma, rehabilitation, and mobility recovery under one care network.",
    head: "Dr. Kabir Shah",
    specialists: 12,
    icon: Stethoscope,
  },
  {
    name: "Dermatology",
    description: "Cosmetic, clinical, and long-term skin management services.",
    head: "Dr. Nidhi Rao",
    specialists: 8,
    icon: Star,
  },
  {
    name: "General Medicine",
    description: "Primary consultations, preventive screening, and case coordination.",
    head: "Dr. Vihaan Arora",
    specialists: 22,
    icon: Building2,
  },
];

const reviews = [
  {
    name: "Priya S.",
    title: "Patient",
    text: "Booking and follow-ups felt organized for the first time. The reminders and reports were easy to track.",
  },
  {
    name: "Dr. Sameer V.",
    title: "Consultant Physician",
    text: "The doctor workspace is compact and practical. I can review queue status and notes without jumping between screens.",
  },
  {
    name: "Admin Team",
    title: "Operations",
    text: "The dashboard finally feels like an operations tool instead of a classroom demo. Approval queues and load visibility are clear.",
  },
];

const faqItems = [
  {
    question: "Can patients book by department first?",
    answer: "Yes. The flow starts with department selection before narrowing to doctors, dates, and confirmation.",
  },
  {
    question: "Does the admin side support analytics?",
    answer: "The dashboard includes appointment trends, department load, doctor availability, and workflow tables.",
  },
  {
    question: "Can doctors and patients have different UI styles?",
    answer: "Yes. Patients get a calmer, more guided layout, while doctors get a denser workspace optimized for speed.",
  },
];

const patientTimeline = [
  { time: "09:30", title: "Cardiology follow-up", meta: "Confirmed with Dr. Aanya Menon", status: "Confirmed" },
  { time: "12:15", title: "Lab report uploaded", meta: "CBC and lipid panel available", status: "Completed" },
  { time: "18:00", title: "Medication reminder", meta: "Take evening beta blocker dose", status: "Pending" },
];

const doctorQueue = [
  { patient: "Ritika Jain", concern: "Chest discomfort", slot: "09:00", status: "Confirmed" },
  { patient: "Arjun Das", concern: "Follow-up review", slot: "09:30", status: "Pending" },
  { patient: "Mohan Lal", concern: "Post-op check", slot: "10:15", status: "Confirmed" },
  { patient: "Anita Roy", concern: "ECG discussion", slot: "11:00", status: "Cancelled" },
];

const adminRows = [
  { name: "Ritika Jain", type: "Patient", department: "Cardiology", status: "Approved", date: "Mar 19, 2026" },
  { name: "Dr. Aarav Sen", type: "Doctor", department: "Neurology", status: "Pending", date: "Mar 18, 2026" },
  { name: "Kiran Sharma", type: "Patient", department: "Orthopedics", status: "Approved", date: "Mar 18, 2026" },
  { name: "Dr. Sara Khan", type: "Doctor", department: "Pediatrics", status: "Review", date: "Mar 17, 2026" },
  { name: "Neha Kapoor", type: "Patient", department: "Dermatology", status: "Pending", date: "Mar 17, 2026" },
  { name: "Ravi Mehta", type: "Patient", department: "General Medicine", status: "Approved", date: "Mar 16, 2026" },
];

const navItems = [
  { label: "Home", to: "/" },
  { label: "Departments", to: "/departments" },
  { label: "Doctors", to: "/doctors" },
  { label: "Appointments", to: "/appointments" },
  { label: "Contact", to: "/contact" },
];

const adminNav = [
  "Overview",
  "Patients",
  "Doctors",
  "Appointments",
  "Departments",
  "Billing",
  "Staff",
  "Reports",
  "Settings",
];

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app-shell">
      <SiteNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} isHome={isHome} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <SiteFooter />
      <button
        className={`scroll-top ${showScroll ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ChevronRight className="scroll-top__icon" />
      </button>
    </div>
  );
}

function SiteNavbar({ menuOpen, setMenuOpen, isHome }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled || !isHome ? "site-nav--solid" : "site-nav--transparent"}`}>
      <div className="container site-nav__inner">
        <Link to="/" className="brand">
          <span className="brand__mark">M</span>
          <span>
            <strong>Healix</strong>
            <small>Hospital Cloud</small>
          </span>
        </Link>

        <nav className="site-nav__links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `site-nav__link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-nav__actions">
          <Link to="/login" className="button button--ghost">
            Login
          </Link>
          <Link to="/admin-dashboard" className="button button--primary">
            Get Started
          </Link>
          <button className="site-nav__menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-drawer__panel">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={`mobile-drawer__link ${location.pathname === item.to ? "is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/login" className="button button--ghost button--block">
            Login
          </Link>
          <Link to="/admin-dashboard" className="button button--primary button--block">
            Explore Admin Portal
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Private hospital SaaS dashboard</span>
            <h1>One platform for hospital operations, patient care, and appointment workflows.</h1>
            <p>
              Built for admin teams, doctors, and patients who need one calm system to manage care delivery, approvals,
              reporting, and bookings.
            </p>
            <div className="hero__actions">
              <Link to="/appointments" className="button button--primary">
                Book Appointment
              </Link>
              <Link to="/admin-dashboard" className="button button--secondary">
                Explore Admin Portal
              </Link>
            </div>
            <div className="hero__trust">
              <span><ShieldCheck size={16} /> Secure patient workflows</span>
              <span><FileBarChart2 size={16} /> Real-time operations insight</span>
            </div>
          </div>

          <div className="dashboard-preview">
            <div className="dashboard-preview__top">
              <span>Operations Snapshot</span>
              <span>Mar 19, 2026</span>
            </div>
            <div className="dashboard-preview__headline">
              <strong>247</strong>
              <span>appointments managed today</span>
            </div>
            <div className="dashboard-preview__grid">
              <MetricCard label="Today's Appointments" value="247" accent="teal" />
              <MetricCard label="Bed Occupancy" value="84%" accent="blue" />
              <MetricCard label="Available Doctors" value="38" accent="green" />
              <MetricCard label="Pending Approvals" value="12" accent="amber" />
            </div>
            <div className="mini-chart">
              {[52, 68, 61, 77, 70, 88, 82].map((value, index) => (
                <div key={index} className="mini-chart__bar-wrap">
                  <div className="mini-chart__bar" style={{ height: `${value}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip__grid">
          <StatTile label="Patients Managed" value="2,500+" />
          <StatTile label="Doctors" value="120+" />
          <StatTile label="Departments" value="18" />
          <StatTile label="Appointment Accuracy" value="99.9%" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why Choose Healix"
            title="A premium healthcare system designed for operations clarity"
            body="The product balances trust, speed, and clarity across every user role."
          />
          <div className="feature-grid">
            <FeatureCard icon={ShieldCheck} title="Trustworthy" text="Structured workflows, status chips, and clean records make every state easy to understand." />
            <FeatureCard icon={LayoutDashboard} title="Efficient" text="Role-specific dashboards reduce clutter for admins, doctors, and patients." />
            <FeatureCard icon={HeartPulse} title="Calm" text="Soft surfaces, neutral spacing, and clear information hierarchy lower anxiety for patients." />
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeading
            eyebrow="Key Modules"
            title="Everything important is grouped into clear product modules"
            body="No generic app shell. Each module reinforces a more serious hospital product identity."
          />
          <div className="module-grid">
            <InfoPanel title="Patient Experience" text="Bookings, reports, prescriptions, reminders, and activity timelines in one calm dashboard." />
            <InfoPanel title="Doctor Workspace" text="Today's queue, notes, follow-ups, and quick actions arranged for denser operational use." />
            <InfoPanel title="Admin Operations" text="KPIs, analytics, approvals, utilization, staffing, and reporting in a proper control center." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Department Highlights" title="Department cards with clearer structure and credibility" />
          <div className="department-grid">
            {departments.slice(0, 4).map((department) => (
              <DepartmentCard key={department.name} department={department} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <SectionHeading eyebrow="Patient Reviews" title="Presentation-ready testimonials that feel grounded in real use" />
          <div className="review-grid">
            {reviews.map((review) => (
              <article key={review.name} className="review-card">
                <div className="review-card__stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
                <span>{review.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq">
          <SectionHeading eyebrow="FAQ" title="Common questions around the workflow redesign" />
          <div className="faq__list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq__item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DepartmentsPage() {
  return (
    <section className="section section--top-gap">
      <div className="container">
        <SectionHeading
          eyebrow="Departments"
          title="Structured department discovery instead of a plain list"
          body="Each department surfaces leadership, specialist count, and a clearer path to browsing doctors."
        />
        <div className="department-grid department-grid--full">
          {departments.map((department) => (
            <DepartmentCard key={department.name} department={department} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DoctorsPage() {
  const [filters, setFilters] = useState({
    department: "All",
    gender: "All",
    experience: "All",
    availability: "All",
    rating: "All",
  });

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      if (filters.department !== "All" && doctor.department !== filters.department) return false;
      if (filters.gender !== "All" && doctor.gender !== filters.gender) return false;
      if (filters.experience === "10+" && doctor.experience < 10) return false;
      if (filters.experience === "15+" && doctor.experience < 15) return false;
      if (filters.availability === "Today" && !doctor.availability.includes("Today")) return false;
      if (filters.rating === "4.8+" && doctor.rating < 4.8) return false;
      return true;
    });
  }, [filters]);

  return (
    <section className="section section--top-gap">
      <div className="container">
        <SectionHeading
          eyebrow="Doctor Directory"
          title="Card-based doctor discovery with stronger demo value"
          body="Filters, pricing, availability, and specialties are visible up front so the listing feels complete."
        />

        <div className="filters">
          <FilterSelect label="Department" value={filters.department} onChange={(value) => setFilters((prev) => ({ ...prev, department: value }))} options={["All", ...departments.map((d) => d.name)]} />
          <FilterSelect label="Gender" value={filters.gender} onChange={(value) => setFilters((prev) => ({ ...prev, gender: value }))} options={["All", "Female", "Male"]} />
          <FilterSelect label="Experience" value={filters.experience} onChange={(value) => setFilters((prev) => ({ ...prev, experience: value }))} options={["All", "10+", "15+"]} />
          <FilterSelect label="Availability" value={filters.availability} onChange={(value) => setFilters((prev) => ({ ...prev, availability: value }))} options={["All", "Today"]} />
          <FilterSelect label="Rating" value={filters.rating} onChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))} options={["All", "4.8+"]} />
        </div>

        <div className="doctor-grid">
          {filteredDoctors.map((doctor) => (
            <article key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} className="doctor-card__image" />
              <div className="doctor-card__content">
                <div className="doctor-card__topline">
                  <span className="status-chip status-chip--teal">{doctor.availability}</span>
                  <span className="doctor-card__rating"><Star size={14} fill="currentColor" /> {doctor.rating}</span>
                </div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <div className="doctor-card__meta">
                  <span>{doctor.experience} years</span>
                  <span>Consultation fee Rs. {doctor.fee}</span>
                </div>
                <Link to="/appointments" className="button button--primary button--block">
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingPage() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    department: "Cardiology",
    doctor: doctors[0].id,
    date: "2026-03-22",
    time: "10:30 AM",
    patient: "Priya Sharma",
    mobile: "+91 98765 43210",
  });

  const selectedDoctor = doctors.find((doctor) => doctor.id === booking.doctor) || doctors[0];
  const slotOptions = ["09:30 AM", "10:30 AM", "12:00 PM", "03:30 PM"];
  const departmentDoctors = doctors.filter((doctor) => doctor.department === booking.department);

  return (
    <section className="section section--top-gap">
      <div className="container booking-layout">
        <div>
          <SectionHeading
            eyebrow="Appointment Booking"
            title="A guided four-step flow instead of one long form"
            body="The booking experience stays structured, premium, and easy to scan from selection through confirmation."
          />

          <div className="stepper">
            {["Choose Department", "Select Doctor", "Pick Date & Time", "Confirm Details"].map((label, index) => (
              <button
                key={label}
                className={`stepper__item ${step === index + 1 ? "is-active" : ""} ${step > index + 1 ? "is-done" : ""}`}
                onClick={() => setStep(index + 1)}
              >
                <span>{index + 1}</span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>

          <div className="booking-card">
            {step === 1 && (
              <div className="selection-grid">
                {departments.map((department) => (
                  <button
                    key={department.name}
                    className={`selection-card ${booking.department === department.name ? "is-selected" : ""}`}
                    onClick={() => {
                      const firstDoctor = doctors.find((doctor) => doctor.department === department.name) || doctors[0];
                      setBooking((prev) => ({ ...prev, department: department.name, doctor: firstDoctor.id }));
                      setStep(2);
                    }}
                  >
                    <department.icon size={20} />
                    <strong>{department.name}</strong>
                    <span>{department.specialists} specialists</span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="selection-grid">
                {departmentDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    className={`doctor-select ${booking.doctor === doctor.id ? "is-selected" : ""}`}
                    onClick={() => {
                      setBooking((prev) => ({ ...prev, doctor: doctor.id }));
                      setStep(3);
                    }}
                  >
                    <img src={doctor.image} alt={doctor.name} />
                    <div>
                      <strong>{doctor.name}</strong>
                      <span>{doctor.specialty}</span>
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <span className="status-chip status-chip--blue">{doctor.availability}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="date-slot-grid">
                <div className="calendar-card">
                  <label className="field">
                    <span>Date</span>
                    <input
                      type="date"
                      value={booking.date}
                      onChange={(event) => setBooking((prev) => ({ ...prev, date: event.target.value }))}
                    />
                  </label>
                </div>
                <div className="slot-list">
                  {slotOptions.map((slot) => (
                    <button
                      key={slot}
                      className={`slot ${booking.time === slot ? "is-selected" : ""}`}
                      onClick={() => {
                        setBooking((prev) => ({ ...prev, time: slot }));
                        setStep(4);
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-grid">
                <label className="field">
                  <span>Patient Name</span>
                  <input value={booking.patient} onChange={(event) => setBooking((prev) => ({ ...prev, patient: event.target.value }))} />
                </label>
                <label className="field">
                  <span>Mobile Number</span>
                  <input value={booking.mobile} onChange={(event) => setBooking((prev) => ({ ...prev, mobile: event.target.value }))} />
                </label>
                <label className="field field--full">
                  <span>Visit Notes</span>
                  <textarea rows="4" defaultValue="Routine consultation and previous report review." />
                </label>
                <div className="booking-actions">
                  <button className="button button--secondary" onClick={() => setStep(3)}>
                    Back
                  </button>
                  <button className="button button--primary">Confirm Appointment</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="summary-card">
          <h3>Confirmation Summary</h3>
          <div className="summary-card__doctor">
            <img src={selectedDoctor.image} alt={selectedDoctor.name} />
            <div>
              <strong>{selectedDoctor.name}</strong>
              <span>{selectedDoctor.specialty}</span>
            </div>
          </div>
          <ul className="summary-card__list">
            <li><span>Department</span><strong>{booking.department}</strong></li>
            <li><span>Date</span><strong>{booking.date}</strong></li>
            <li><span>Time</span><strong>{booking.time}</strong></li>
            <li><span>Fee</span><strong>Rs. {selectedDoctor.fee}</strong></li>
            <li><span>Availability</span><strong>{selectedDoctor.availability}</strong></li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="section section--top-gap">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Clear contact paths for patient support and hospital teams"
            body="The contact surface keeps the same serious visual language with larger whitespace and cleaner form structure."
          />
          <div className="contact-panels">
            <InfoPanel title="Patient Support" text="+91 1800 120 9988  |  support@healixcloud.com" />
            <InfoPanel title="Hospital Operations" text="ops@healixcloud.com  |  Live dashboard assistance for admin teams" />
            <InfoPanel title="Location" text="Healix Central Campus, Bengaluru 560001" />
          </div>
        </div>

        <form className="booking-card">
          <label className="field">
            <span>Full Name</span>
            <input placeholder="Enter your name" />
          </label>
          <label className="field">
            <span>Email Address</span>
            <input placeholder="Enter your email" />
          </label>
          <label className="field">
            <span>Department</span>
            <select defaultValue="General">
              <option>General</option>
              <option>Appointments</option>
              <option>Billing</option>
              <option>Operations</option>
            </select>
          </label>
          <label className="field field--full">
            <span>Message</span>
            <textarea rows="5" placeholder="How can we help?" />
          </label>
          <button type="button" className="button button--primary">Send Message</button>
        </form>
      </div>
    </section>
  );
}

function AuthPage() {
  const [role, setRole] = useState("Patient");

  return (
    <section className="auth-screen">
      <div className="container auth-screen__grid">
        <div className="auth-screen__branding">
          <span className="eyebrow">Secure Access</span>
          <h1>Hospital operations, care coordination, and patient access in one place.</h1>
          <p>Use a cleaner authentication experience with stronger branding and a clearer role context for the demo.</p>
          <div className="illustration-card">
            <div className="illustration-card__row">
              <div className="illustration-card__dot" />
              <div className="illustration-card__line" />
            </div>
            <div className="illustration-card__row">
              <div className="illustration-card__dot illustration-card__dot--blue" />
              <div className="illustration-card__line" />
            </div>
            <div className="illustration-card__row">
              <div className="illustration-card__dot illustration-card__dot--green" />
              <div className="illustration-card__line" />
            </div>
          </div>
        </div>

        <div className="auth-card">
          <h2>Sign In</h2>
          <div className="role-switch">
            {["Patient", "Doctor", "Admin"].map((item) => (
              <button key={item} className={role === item ? "is-active" : ""} onClick={() => setRole(item)}>
                {item}
              </button>
            ))}
          </div>
          <label className="field">
            <span>{role} Email</span>
            <input placeholder={`Enter ${role.toLowerCase()} email`} />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" placeholder="Enter password" />
          </label>
          <button className="button button--primary button--block">Continue as {role}</button>
          <p className="auth-card__caption">This layout is ready to wrap around Clerk components when credentials are configured.</p>
        </div>
      </div>
    </section>
  );
}

function PatientDashboard() {
  return (
    <section className="dashboard dashboard--patient">
      <div className="container">
        <SectionHeading eyebrow="Patient Dashboard" title="A calmer, more personal patient workspace" />
        <div className="summary-grid">
          <DashboardStat title="Upcoming Appointment" value="Mar 22, 10:30 AM" detail="Cardiology consult" />
          <DashboardStat title="Assigned Doctor" value="Dr. Aanya Menon" detail="Cardiology" />
          <DashboardStat title="Prescriptions" value="03 Active" detail="1 refill due" />
          <DashboardStat title="Reports Available" value="05 Reports" detail="2 new uploads" />
        </div>

        <div className="dashboard-columns">
          <div className="dashboard-stack">
            <Panel title="Health Profile">
              <div className="profile-card">
                <div className="profile-card__avatar">PS</div>
                <div>
                  <strong>Priya Sharma</strong>
                  <p>Blood Group O+ | Allergies: None reported</p>
                </div>
              </div>
            </Panel>
            <Panel title="Recent Activity">
              <ul className="activity-list">
                <li>Prescription updated by Dr. Aanya Menon</li>
                <li>Report uploaded to your profile</li>
                <li>Appointment payment confirmed online</li>
              </ul>
            </Panel>
            <Panel title="Medication Reminders">
              <div className="chip-row">
                <span className="status-chip status-chip--teal">08:00 AM</span>
                <span className="status-chip status-chip--blue">02:00 PM</span>
                <span className="status-chip status-chip--amber">08:00 PM</span>
              </div>
            </Panel>
          </div>

          <div className="dashboard-stack">
            <Panel title="Appointment Timeline">
              <div className="timeline">
                {patientTimeline.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="timeline__item">
                    <div className="timeline__time">{item.time}</div>
                    <div className="timeline__content">
                      <strong>{item.title}</strong>
                      <p>{item.meta}</p>
                    </div>
                    <span className={`status-chip ${chipClass(item.status)}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Notifications">
              <EmptyState icon={Bell} title="2 pending reminders" text="Your next appointment and medication reminder are scheduled for tomorrow." />
            </Panel>
            <Panel title="Quick Actions">
              <div className="quick-actions">
                <Link to="/appointments" className="button button--primary">Book Follow-up</Link>
                <button className="button button--secondary">Download Reports</button>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoctorDashboard() {
  return (
    <section className="dashboard dashboard--doctor">
      <div className="container">
        <SectionHeading eyebrow="Doctor Dashboard" title="A denser workspace built for clinical efficiency" />
        <div className="summary-grid summary-grid--dense">
          <DashboardStat title="Today's Appointments" value="18" detail="6 pending reviews" />
          <DashboardStat title="Pending Consultations" value="04" detail="2 urgent flags" />
          <DashboardStat title="Active Patients" value="126" detail="Across 3 follow-up programs" />
          <DashboardStat title="Avg Consultation Time" value="17 min" detail="Improved by 9%" />
        </div>

        <div className="doctor-layout">
          <Panel title="Today's Queue">
            <div className="queue-table">
              {doctorQueue.map((item) => (
                <div key={`${item.patient}-${item.slot}`} className="queue-table__row">
                  <strong>{item.patient}</strong>
                  <span>{item.concern}</span>
                  <span>{item.slot}</span>
                  <span className={`status-chip ${chipClass(item.status)}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Patient Notes">
            <div className="compact-note">
              <strong>Ritika Jain</strong>
              <p>Monitor post-medication response and review ECG trends in the next consultation.</p>
            </div>
          </Panel>
          <Panel title="Upcoming Follow-ups">
            <div className="compact-note">
              <strong>3 follow-ups scheduled</strong>
              <p>Cardiology reviews across Mar 20 to Mar 24 with one high-risk case pending confirmation.</p>
            </div>
          </Panel>
          <Panel title="Quick Diagnosis Shortcuts">
            <div className="chip-row">
              <span className="status-chip status-chip--slate">ECG Review</span>
              <span className="status-chip status-chip--slate">Prescription</span>
              <span className="status-chip status-chip--slate">Lab Order</span>
            </div>
          </Panel>
          <Panel title="Department Announcements">
            <EmptyState icon={CircleAlert} title="One operational update" text="Cath lab maintenance window scheduled for Saturday 8:00 PM." />
          </Panel>
        </div>
      </div>
    </section>
  );
}

function AdminDashboard() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    return adminRows.filter((row) => {
      const matchesQuery = [row.name, row.type, row.department].some((value) =>
        value.toLowerCase().includes(query.toLowerCase()),
      );
      const matchesStatus = status === "All" || row.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const rowsPerPage = 4;
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const paginated = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    setPage(1);
  }, [query, status]);

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand brand--admin">
          <span className="brand__mark">M</span>
          <span>
            <strong>Healix</strong>
            <small>Ops Console</small>
          </span>
        </div>
        <nav className="admin-sidebar__nav">
          {adminNav.map((item, index) => (
            <button key={item} className={`admin-sidebar__item ${index === 0 ? "is-active" : ""}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <label className="searchbox">
            <Search size={16} />
            <input placeholder="Search patients, doctors, approvals..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <div className="admin-topbar__actions">
            <button className="icon-button"><Bell size={18} /></button>
            <button className="icon-button"><Building2 size={18} /></button>
            <button className="profile-pill"><UserRound size={16} /> Central Hospital</button>
          </div>
        </div>

        <div className="admin-header">
          <div>
            <span className="eyebrow">Admin Dashboard</span>
            <h1>Serious hospital operations visibility</h1>
            <p>KPIs, approvals, analytics, and doctor utilization arranged like a real ops product.</p>
          </div>
          <div className="header-actions">
            <button className="button button--secondary">Export PDF</button>
            <button className="button button--primary">Export CSV</button>
          </div>
        </div>

        <div className="summary-grid summary-grid--admin">
          <DashboardStat title="Total Patients" value="2,540" detail="+12% this month" />
          <DashboardStat title="Doctors On Duty" value="38" detail="Across 18 departments" />
          <DashboardStat title="Appointments Today" value="247" detail="87% confirmation rate" />
          <DashboardStat title="Revenue This Month" value="Rs. 18.4L" detail="Billing reconciled" />
        </div>

        <div className="analytics-grid">
          <Panel title="Appointments by Day">
            <BarChart values={[48, 65, 59, 72, 84, 76, 91]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} />
          </Panel>
          <Panel title="Patient Registrations by Month">
            <BarChart values={[28, 34, 42, 47, 56, 61]} labels={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]} compact />
          </Panel>
          <Panel title="Department Load">
            <ProgressList items={[
              { label: "Cardiology", value: 88 },
              { label: "Neurology", value: 74 },
              { label: "Pediatrics", value: 66 },
              { label: "Orthopedics", value: 58 },
            ]} />
          </Panel>
          <Panel title="Doctor Availability">
            <ProgressList items={[
              { label: "Available", value: 76, tone: "green" },
              { label: "In Consultation", value: 48, tone: "blue" },
              { label: "Off Duty", value: 22, tone: "amber" },
            ]} />
          </Panel>
        </div>

        <div className="workflow-grid">
          <Panel title="Approval Queue">
            <div className="approval-list">
              <div className="approval-list__item"><strong>12</strong><span>Pending document checks</span></div>
              <div className="approval-list__item"><strong>04</strong><span>Doctor onboarding reviews</span></div>
              <div className="approval-list__item"><strong>09</strong><span>Billing verifications</span></div>
            </div>
          </Panel>
          <Panel title="Recent Registrations">
            <div className="table-toolbar">
              <div className="table-toolbar__filters">
                <label className="searchbox searchbox--small">
                  <Search size={14} />
                  <input placeholder="Search table" value={query} onChange={(event) => setQuery(event.target.value)} />
                </label>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                  <option>All</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Review</option>
                </select>
                <select defaultValue="Newest">
                  <option>Newest</option>
                  <option>Name</option>
                  <option>Department</option>
                </select>
              </div>
              <div className="table-toolbar__actions">
                <button className="icon-button"><Filter size={16} /></button>
                <button className="icon-button"><Download size={16} /></button>
              </div>
            </div>

            <div className="data-table">
              <div className="data-table__head">
                <span>Name</span>
                <span>Type</span>
                <span>Department</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {paginated.map((row, index) => (
                <div key={`${row.name}-${row.date}`} className={`data-table__row ${index % 2 === 0 ? "is-even" : ""}`}>
                  <span>{row.name}</span>
                  <span>{row.type}</span>
                  <span>{row.department}</span>
                  <span className={`status-chip ${chipClass(row.status)}`}>{row.status}</span>
                  <span>{row.date}</span>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button className="icon-button" onClick={() => setPage((value) => Math.max(1, value - 1))}>
                <ChevronLeft size={16} />
              </button>
              <span>Page {page} of {pageCount}</span>
              <button className="icon-button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
                <ChevronRight size={16} />
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <div className="brand">
            <span className="brand__mark">M</span>
            <span>
              <strong>Healix</strong>
              <small>Hospital Cloud</small>
            </span>
          </div>
          <p>Private hospital operations, patient engagement, and appointment workflows in one premium interface.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/doctors">Doctors</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+9118001209988"><Phone size={14} /> +91 1800 120 9988</a>
          <a href="mailto:support@healixcloud.com"><FileText size={14} /> support@healixcloud.com</a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="section-heading">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function MetricCard({ label, value, accent }) {
  return (
    <div className={`metric-card metric-card--${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function StatTile({ label, value }) {
  return (
    <article className="stat-tile">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function FeatureCard({ icon, title, text }) {
  const Icon = icon;

  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <Icon size={18} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function InfoPanel({ title, text }) {
  return (
    <article className="info-panel">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function DepartmentCard({ department }) {
  const Icon = department.icon;

  return (
    <article className="department-card">
      <div className="department-card__icon">
        <Icon size={20} />
      </div>
      <h3>{department.name}</h3>
      <p>{department.description}</p>
      <ul>
        <li>Head: {department.head}</li>
        <li>{department.specialists} specialists</li>
      </ul>
      <Link to="/doctors" className="button button--secondary button--block">View Doctors</Link>
    </article>
  );
}

function FilterSelect({ label, options, value, onChange }) {
  return (
    <label className="filter-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DashboardStat({ title, value, detail }) {
  return (
    <article className="dashboard-stat">
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <div className="panel__header">
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function EmptyState({ icon, title, text }) {
  const Icon = icon;

  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon size={18} />
      </div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function BarChart({ values, labels, compact = false }) {
  return (
    <div className={`bar-chart ${compact ? "bar-chart--compact" : ""}`}>
      {values.map((value, index) => (
        <div key={`${labels[index]}-${value}`} className="bar-chart__item">
          <div className="bar-chart__track">
            <div className="bar-chart__value" style={{ height: `${value}%` }} />
          </div>
          <span>{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressList({ items }) {
  return (
    <div className="progress-list">
      {items.map((item) => (
        <div key={item.label} className="progress-list__item">
          <div className="progress-list__top">
            <span>{item.label}</span>
            <strong>{item.value}%</strong>
          </div>
          <div className="progress-list__track">
            <div className={`progress-list__value progress-list__value--${item.tone || "teal"}`} style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function chipClass(status) {
  const normalized = String(status).toLowerCase();
  if (normalized.includes("confirmed") || normalized.includes("approved")) return "status-chip--teal";
  if (normalized.includes("pending") || normalized.includes("review")) return "status-chip--amber";
  if (normalized.includes("cancelled")) return "status-chip--red";
  if (normalized.includes("completed")) return "status-chip--green";
  return "status-chip--slate";
}

export default function App() {
  return <AppShell />;
}
