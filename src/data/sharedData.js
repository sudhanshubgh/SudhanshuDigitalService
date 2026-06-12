import {
  Globe, Wrench, FileText, Linkedin, GraduationCap,
  Video, Briefcase, Package, Bot, TrendingUp, Users,
  CheckCircle, Star, Code, Award, Zap, Target, MessageSquare, Shield
} from "lucide-react";

export const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    g: "135deg,#7c3aed,#c026d3",
    c: "#7c3aed",
    priceDisplay: "₹4,999 – ₹69,999",
    basePrice: 4999,
    items: [
      { name: "One Page Landing Page", price: 4999 },
      { name: "Portfolio Website", price: 7999 },
      { name: "Business Website (5-10 Pages)", price: 12999 },
      { name: "Coaching/Institute Website", price: 14999 },
      { name: "Restaurant/Salon Website", price: 9999 },
      { name: "E-Commerce Website", price: 24999 }
    ]
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    g: "135deg,#0891b2,#06b6d4",
    c: "#06b6d4",
    priceDisplay: "₹999 – ₹4,999/mo",
    basePrice: 999,
    items: [
      { name: "Basic Monthly Support", price: 999, isMonthly: true },
      { name: "Standard Maintenance", price: 1999, isMonthly: true },
      { name: "Premium Maintenance", price: 4999, isMonthly: true }
    ]
  },
  {
    icon: FileText,
    title: "Resume Services",
    g: "135deg,#ea580c,#f97316",
    c: "#f97316",
    priceDisplay: "₹799 – ₹2,999",
    basePrice: 799,
    items: [
      { name: "Fresher Resume Creation", price: 799 },
      { name: "Experienced Professional Resume", price: 1499 },
      { name: "Senior Professional Resume", price: 2999 },
      { name: "Basic Resume Review", price: 999 },
      { name: "Detailed Review with Suggestions", price: 1499 },
      { name: "Review + Rewrite", price: 1999 }
    ]
  },
  {
    icon: Linkedin,
    title: "LinkedIn Services",
    g: "135deg,#0369a1,#0ea5e9",
    c: "#0ea5e9",
    priceDisplay: "₹999 – ₹2,999",
    basePrice: 999,
    items: [
      { name: "Headline & About Section Optimization", price: 999 },
      { name: "Complete Profile Optimization", price: 1999 },
      { name: "LinkedIn + Resume Package", price: 2999 }
    ]
  },
  {
    icon: GraduationCap,
    title: "Training Courses",
    g: "135deg,#b45309,#f59e0b",
    c: "#f59e0b",
    priceDisplay: "₹2,999 – ₹9,999",
    basePrice: 2999,
    items: [
      { name: "Java Basics for Automation", price: 2999 },
      { name: "Selenium Automation Masterclass", price: 4999 },
      { name: "API Testing & REST Assured", price: 4999 },
      { name: "Complete Automation Testing Bootcamp", price: 9999 }
    ]
  },
  {
    icon: Video,
    title: "1:1 Mentorship",
    g: "135deg,#be123c,#f43f5e",
    c: "#f43f5e",
    priceDisplay: "₹999 – ₹3,999",
    basePrice: 999,
    items: [
      { name: "30-Minute Career Call", price: 999 },
      { name: "60-Minute Mentorship Session", price: 1999 },
      { name: "Mock Interview Session", price: 2499 },
      { name: "Framework Design Session", price: 3999 }
    ]
  },
  {
    icon: Briefcase,
    title: "Monthly Mentorship",
    g: "135deg,#7c3aed,#8b5cf6",
    c: "#8b5cf6",
    priceDisplay: "₹7,999 – ₹24,999",
    basePrice: 7999,
    items: [
      { name: "Basic (4 sessions/month)", price: 7999, isMonthly: true },
      { name: "Professional (8 sessions/month)", price: 14999, isMonthly: true },
      { name: "Job Switch Accelerator", price: 24999 }
    ]
  },
  {
    icon: Package,
    title: "Premium Packages",
    g: "135deg,#6d28d9,#a78bfa",
    c: "#a78bfa",
    priceDisplay: "₹29,999 – ₹49,999",
    basePrice: 29999,
    items: [
      { name: "QA to SDET Transformation (Basic)", price: 29999 },
      { name: "QA to SDET Transformation (Full)", price: 49999 }
    ]
  },
  {
    icon: Bot,
    title: "AI & Productivity",
    g: "135deg,#059669,#10b981",
    c: "#10b981",
    priceDisplay: "₹1,499 – ₹9,999+",
    basePrice: 1499,
    items: [
      { name: "ChatGPT Training (Individual)", price: 1999 },
      { name: "ChatGPT Training (Corporate)", price: 9999 },
      { name: "Excel Productivity Training (Individual)", price: 1499 },
      { name: "Excel Productivity Training (Corporate/Group)", price: 7999 },
      { name: "Automation Testing Mentorship (Per Session)", price: 1499 }
    ]
  }
];

export const STATS = [
  { n: "6+", l: "Years Experience", icon: TrendingUp },
  { n: "5000+", l: "Students Taught", icon: Users },
  { n: "100+", l: "Projects Delivered", icon: CheckCircle },
  { n: "4.8★", l: "Average Rating", icon: Star },
];

export const FEATURES = [
  { icon: Code, title: "Senior Automation Engineer", desc: "6+ years at TCS on NatWest Banking UK — enterprise-grade automation with Selenium, Java, REST Assured & CI/CD.", c: "#7c3aed" },
  { icon: Award, title: "Udemy Instructor", desc: "Teaching 5000+ students worldwide through structured courses on automation testing and software quality.", c: "#0ea5e9" },
  { icon: Zap, title: "Fast Delivery", desc: "Committed to quick turnarounds — resumes in 48 hrs, websites in days, not weeks. No compromises on quality.", c: "#f97316" },
  { icon: Target, title: "Affordable Pricing", desc: "Competitive, transparent packages tailored to individuals, students, and small businesses.", c: "#10b981" },
  { icon: MessageSquare, title: "Personalized Support", desc: "One-on-one attention from requirement to delivery. You'll always speak directly with me.", c: "#8b5cf6" },
  { icon: Shield, title: "Client-Focused Approach", desc: "Your success is the only metric. Every solution is purpose-built for your specific goals.", c: "#06b6d4" },
];

export const PORTFOLIO = [
  { t: "HCE Education Portal", cat: "Web Development", tech: "PHP · MySQL · Hostinger", c: "#7c3aed", img: "/portfolio/hce.png", d: "Multi-portal education platform with LMS, exam portal, attendance & payment systems." },
  { t: "NatWest Automation Suite", cat: "Automation Project", tech: "Selenium · Java · Cucumber", c: "#8b5cf6", img: "/portfolio/natwest.png", d: "Enterprise-grade automation framework for banking applications with 1000+ test cases." },
  { t: "NexMeet Video Calling", cat: "Web Development", tech: "Node.js · Socket.io · WebRTC", c: "#06b6d4", img: "/portfolio/nexmeet.png", d: "Real-time video conferencing app with room creation, chat, and screen sharing." },
  { t: "SMC Broker Platform", cat: "Web Development", tech: "HTML · CSS · JavaScript", c: "#f97316", img: "/portfolio/smc.png", d: "Stock broker website with live market watch, financial calculators & portfolio tracker." },
  { t: "DentCraft Dental Clinic", cat: "Web Development", tech: "HTML · CSS · GSAP", c: "#ef4444", img: "/portfolio/dentcraft.png", d: "Premium dental clinic website with parallax scrolling and elegant micro-interactions." },
  { t: "JobLaunch AI", cat: "AI Application", tech: "React · Claude API · OpenAI", c: "#10b981", img: "/portfolio/joblaunch.png", d: "AI-powered job search assistant with 6 modules: resume builder, LinkedIn optimizer & more." },
  { t: "ATS Resume Package", cat: "Resume Service", tech: "Resume · LinkedIn · Cover Letter", c: "#f59e0b", img: "/portfolio/ats.png", d: "Complete career package for a senior engineer — 3x more interview calls after delivery." },
  { t: "Selenium Masterclass", cat: "Training Program", tech: "Udemy · 5000+ Students", c: "#0ea5e9", img: "/portfolio/selenium.png", d: "Comprehensive automation testing course from zero to hero — top-rated on Udemy." },
];

export const TESTIMONIALS = [
  { name: "Rahul Sharma", role: "Software Engineer, Infosys", r: 5, text: "Sudhanshu completely transformed my career trajectory. His resume service got me 3x more interview calls, and his mock interview prep helped me land a senior role at a top MNC. Absolutely worth every rupee!" },
  { name: "Priya Verma", role: "Junior QA Engineer, TCS", r: 5, text: "As a fresher, I was completely lost about where to begin. Sudhanshu's mentorship program was a genuine game-changer. He guided me step by step from basics to my first job offer in just 3 months!" },
  { name: "Amit Patel", role: "Salon Business Owner, Gujarat", r: 5, text: "The website he built for my salon is outstanding — professional, fast, and mobile-friendly. My online appointment bookings have increased by 40% since launch. Best investment I made for my business!" },
  { name: "Sneha Gupta", role: "QA Engineer, Wipro", r: 5, text: "His Selenium automation course on Udemy is the best I've ever found. The explanations are crystal clear, projects are real-world, and he personally responds to student questions. 5 stars without hesitation!" },
  { name: "Vikram Singh", role: "Startup Founder, Bengaluru", r: 5, text: "Sudhanshu built our entire e-commerce platform from scratch. The quality, delivery speed, and post-launch support exceeded all expectations. He is now our go-to developer for every new project!" },
];

export const PRICING_CAREER = [
  {
    name: "Starter Career Package",
    price: "₹1,499",
    note: "",
    desc: "Perfect for freshers & entry-level job seekers",
    features: [
      "ATS Resume Creation",
      "Detailed Resume Review",
      "LinkedIn Headline Optimization",
      "2 Revision Rounds",
      "48-Hour Delivery",
      "Email Support"
    ]
  },
  {
    name: "Professional Career Package",
    price: "₹3,499",
    note: "🔥 Most Popular",
    desc: "Complete package for experienced professionals",
    features: [
      "ATS Resume Creation",
      "Complete LinkedIn Profile Optimization",
      "1 Mock Interview (60 mins) & Feedback",
      "1 Career Guidance Session (30 mins)",
      "Unlimited Revisions (7 days)",
      "Priority WhatsApp Support"
    ]
  },
  {
    name: "Premium Job Switch Package",
    price: "₹6,999",
    note: "⭐ Best Value",
    desc: "Ultimate end-to-end job transition guidance",
    features: [
      "Premium ATS Resume Rewrite & Creation",
      "Full LinkedIn Optimization + Branding Strategy",
      "3 Mock Interviews (60 mins each) with Video Reviews",
      "Salary Negotiation Coaching & Script",
      "Customized Job Switch Roadmap",
      "1-on-1 Mentorship (3 months support)"
    ]
  }
];

export const PRICING_BUSINESS = [
  {
    name: "Business Starter",
    price: "₹9,999",
    note: "",
    desc: "Ideal for startups, portfolios & landing pages",
    features: [
      "One Page High-Converting Landing Page",
      "WhatsApp Chat & Call Integration",
      "Contact Form Integration",
      "Basic SEO Setup & Search Submission",
      "Google Analytics & Search Console Setup",
      "1 Month Free Support & Maintenance",
      "Responsive Mobile Design",
      "5 Days Delivery"
    ]
  },
  {
    name: "Business Professional",
    price: "₹19,999",
    note: "🔥 Most Popular",
    desc: "Perfect for growing small & medium businesses",
    features: [
      "Full Business Website (5-10 Pages)",
      "Advanced SEO Optimization Setup",
      "Google Analytics & Search Console Integration",
      "WhatsApp Chat & Contact Form Integration",
      "1 Month Free Premium Support",
      "High Performance & Loading Speed Optimization",
      "10 Days Delivery"
    ]
  },
  {
    name: "Business Advanced",
    price: "₹29,999",
    note: "⭐ Best Value",
    desc: "Comprehensive solution for established brands",
    features: [
      "Custom Business Website (10–20 Pages)",
      "Full Blog or CMS Integration",
      "Advanced Dynamic Forms & Lead Generation",
      "Complete SEO Optimization & Setup",
      "Google Analytics & Search Console Setup",
      "High-Performance Speed Optimization",
      "WhatsApp Chat & Social Integrations",
      "2 Months Free Support & Maintenance"
    ]
  },
  {
    name: "Business Premium",
    price: "₹39,999+",
    note: "👑 Ultimate Growth",
    desc: "Complete custom web solution for growing businesses",
    features: [
      "Advanced Custom Website (Unlimited Pages)",
      "Integrated Blog or Content Management System (CMS)",
      "Custom AI Chatbot Integration for Lead Gen",
      "E-commerce or Booking System Integration",
      "Payment Gateway Integration",
      "3 Months Premium Support & Security Updates",
      "2 Weeks Delivery"
    ]
  }
];

export const FAQS = [
  { q: "What is your typical project delivery timeline?", a: "Simple resumes in 2–3 days, LinkedIn optimization in 1–2 days, basic websites in 5–7 days, and complex multi-page websites in 2–4 weeks. I always provide a clear timeline before starting any project." },
  { q: "Do you provide post-delivery support?", a: "Yes! Support is included with all packages to make sure you have everything you need. I'm always available for questions." },
  { q: "Can I see examples of your previous work?", a: "Absolutely! You can view my portfolio section on this website. During our free consultation call, I can share specific samples most relevant to your project type and industry." },
  { q: "How do I make payment? Is it secure?", a: "Payments are accepted via UPI (PhonePe/GPay/Paytm), NEFT/IMPS bank transfer, or Razorpay. I follow a 50% advance, 50% on completion model for larger projects to keep things transparent for both parties." },
  { q: "Do you offer discounts for students or bulk projects?", a: "Yes! I offer 20% student discounts (with valid ID), and special pricing for bulk projects or ongoing monthly retainers. Just reach out to discuss a custom package for your needs." },
  { q: "What technologies do you use for websites?", a: "HTML/CSS/JavaScript for frontend, PHP/MySQL for backend, WordPress for CMS-based sites, and React/Node.js for modern web applications. I choose the best fit for your project's requirements and budget." },
  { q: "Can you help with job placement after career services?", a: "While I can't guarantee placement, my services significantly improve your chances. Resume writing, LinkedIn optimization, and mock interview prep together have helped 100+ clients land jobs at top companies." },
  { q: "Is there a free consultation available?", a: "Yes! I offer a free 30-minute consultation where we discuss your requirements, I understand your goals, and give honest advice on the best solution. Click 'Get Free Consultation' to book your slot today." },
];
