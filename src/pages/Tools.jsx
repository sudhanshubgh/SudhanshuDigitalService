import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FileText, Calculator, HelpCircle, Check, X, Shield, ArrowRight, Zap, Target, Star,
  RefreshCw, Sparkles, MessageSquare, Code, Users, Award, TrendingUp, CheckCircle, Play,
  Globe, Columns
} from "lucide-react";
import SH from "../components/SH.jsx";
import ComparisonBuilder from "../components/ComparisonBuilder.jsx";

// Pre-loaded Job Descriptions for the ATS Scanner
const SAMPLE_JDS = {
  sdet: `We are looking for a Senior SDET / Automation Engineer with 4+ years of experience in Java, Selenium Webdriver, and API Testing using REST Assured. The ideal candidate will design robust test automation frameworks (Page Object Model, Cucumber BDD) and integrate them into CI/CD pipelines using Jenkins and Git. Experience with Maven, TestNG, SQL, and Agile methodologies is required.`,
  qa: `We are seeking a Manual QA Specialist to design, write, and execute comprehensive test cases. You will perform functional, regression, smoke, and integration testing on web and mobile platforms. Experience with Jira for bug tracking, writing SQL queries to verify databases, and working closely with developers is required. Familiarity with API testing using Postman is a plus.`,
  dev: `Seeking a Full-Stack Web Developer proficient in React, Node.js, and database management (MySQL or MongoDB). The candidate will build responsive user interfaces, integrate third-party REST APIs, optimize application loading speeds, and manage deployments. Familiarity with PHP, HTML5, CSS3, Git, and hosting services is preferred.`
};

// Keyword banks for ATS matching
const KEYWORD_BANKS = {
  sdet: [
    "selenium", "java", "rest assured", "cucumber", "bdd", "testng", 
    "maven", "jenkins", "git", "ci/cd", "automation", "api testing", 
    "framework", "sql", "agile", "page object model", "test automation"
  ],
  qa: [
    "test case", "bug", "jira", "regression", "smoke", "functional", 
    "database", "sql", "api", "postman", "manual testing", "agile", 
    "sprint", "black box", "exploratory"
  ],
  dev: [
    "react", "node.js", "node", "mysql", "mongodb", "database", "api", 
    "rest", "html", "css", "javascript", "php", "git", "responsive", 
    "deployment", "frontend", "backend", "web development"
  ]
};

// Action verbs to search for resume impact
const ACTION_VERBS = [
  "automated", "optimized", "designed", "led", "built", "reduced", 
  "implemented", "engineered", "developed", "delivered", "integrated", 
  "created", "scaled", "managed", "improved", "launched"
];

// Diagnostic Wizard Questions
const WIZARD_QUESTIONS = [
  {
    q: "What is your current professional status?",
    icon: Users,
    options: [
      { t: "Manual QA / Functional Tester", v: "manual_qa", desc: "Want to transition to automation & SDET roles" },
      { t: "Automation Engineer / SDET", v: "automation_qa", desc: "Want to upgrade framework skills or prepare for job switch" },
      { t: "Student / Fresh Graduate", v: "fresher", desc: "Want to launch first career in software testing/IT" },
      { t: "Business Owner / Freelancer", v: "business", desc: "Need a website or maintenance for my project" }
    ]
  },
  {
    q: "What is your primary goal right now?",
    icon: Target,
    options: [
      { t: "Switch to SDET & double my salary", v: "sdet_career", desc: "Need Java, Selenium, API automation training & mentoring" },
      { t: "Optimize Resume & LinkedIn", v: "branding", desc: "Need to clear ATS filters & get recruiter interview calls" },
      { t: "Build a premium digital presence", v: "web_dev", desc: "Need a professional business, e-commerce, or landing page" },
      { t: "Master specific automation topics", v: "topics", desc: "Need training on REST Assured, Git, Jenkins, or Cucumber" }
    ]
  },
  {
    q: "What is your biggest roadblock?",
    icon: HelpCircle,
    options: [
      { t: "Coding & framework design struggles", v: "coding", desc: "Lack confidence in Java, writing OOP, or design patterns" },
      { t: "Resume gets rejected by automated filters", v: "ats_block", desc: "Applications fail scanner screening; no interview requests" },
      { t: "Lack of structured guidance & roadmap", v: "guidance", desc: "Need mock interviews, job switch strategy, and weekly checkins" },
      { t: "Need a fast, high-performance website", v: "website_build", desc: "Need modern aesthetics, SEO integration, and fast loading" }
    ]
  }
];

const INTERVIEW_QUESTIONS = {
  java: [
    {
      q: "What is the difference between Method Overloading and Method Overriding in Java?",
      concepts: [
        "Overloading is compile-time polymorphism (static binding); Overriding is runtime polymorphism (dynamic binding).",
        "Overloading occurs in the same class (same name, different parameters); Overriding occurs between subclass and superclass (same name, same parameters).",
        "Overriding requires inheritance and @Override annotation is highly recommended.",
        "Static and final methods cannot be overridden, but they can be overloaded."
      ],
      keywords: ["Polymorphism", "Compile-Time", "Runtime", "Inheritance", "Signature", "Static Binding", "Dynamic Binding"],
      tip: "Recruiters often ask this to test your core Java basics. Always mention that overloading is resolved during compilation, while overriding is resolved at runtime based on the actual object type."
    },
    {
      q: "Why is String Immutable in Java, and how does it benefit memory management?",
      concepts: [
        "String Literal Pool: Java stores strings in a special pool to share instances and optimize memory.",
        "Security: Strings are frequently used as keys in HashMaps, DB connections, and network sockets; immutability prevents hacking them.",
        "Thread Safety: Immutable objects are inherently thread-safe and can be shared among multiple threads without synchronization.",
        "Caching Hashcodes: The hashcode of a String is cached at creation, making HashMaps fast."
      ],
      keywords: ["String Pool", "Garbage Collection", "Thread Safety", "Security", "Hashcode Caching", "Heap Memory"],
      tip: "When explaining this, draw a connection to performance. Mention the String Pool and explain that if Strings were mutable, changing one would corrupt values for other shared variables."
    },
    {
      q: "Explain the difference between abstraction and encapsulation in OOP.",
      concepts: [
        "Abstraction focuses on hiding the implementation details and showing only the essential features (using abstract classes/interfaces).",
        "Encapsulation hides data (using private variables) and restricts access through getters/setters to protect the object's internal state.",
        "Abstraction is a design-level concept; Encapsulation is an implementation-level concept.",
        "Abstraction is 'what' the object does; Encapsulation is 'how' to secure the state."
      ],
      keywords: ["Abstract Class", "Interface", "Getters/Setters", "Data Hiding", "Design Pattern", "Access Modifiers"],
      tip: "A classic pitfall is mixing these up. Remember: Abstraction is about hiding complexity (like a car dashboard), while Encapsulation is about binding data and code together (like a capsule containing medicine)."
    }
  ],
  selenium: [
    {
      q: "How do you handle dynamic elements and synchronisation issues in Selenium?",
      concepts: [
        "Explicit Waits (WebDriverWait): Pause execution until a specific ExpectedCondition (e.g. elementToBeClickable) is met.",
        "Implicit Waits: A global timeout that applies to all element lookups throughout the driver session (discouraged to mix with explicit).",
        "Fluent Waits: A highly customizable wait that defines timeout, polling frequency, and ignored exceptions (like NoSuchElementException).",
        "Avoid Thread.sleep(): It pauses execution unconditionally, making test suites slow and flaky."
      ],
      keywords: ["WebDriverWait", "ExpectedConditions", "Fluent Wait", "Polling Interval", "NoSuchElementException", "Flaky Tests"],
      tip: "Never say you use Thread.sleep() in production code! Emphasize Explicit Waits and explain how you define custom polling intervals for sluggish AJAX widgets."
    },
    {
      q: "What is StaleElementReferenceException and how do you resolve it?",
      concepts: [
        "Cause: The element is no longer attached to the DOM (e.g., page refreshed, AJAX updated the DOM node since it was located).",
        "Fix 1: Re-initialize the element by locating it again (driver.findElement) right before interaction.",
        "Fix 2: Use Page Object Model with PageFactory (AjaxElementLocatorFactory) which automatically handles lazy element initialization.",
        "Fix 3: Write a custom retry block capturing the exception and trying to locate the element again up to N times."
      ],
      keywords: ["DOM Refreshed", "AjaxElementLocatorFactory", "PageFactory", "driver.findElement", "Try-Catch Retry", "Stale Element"],
      tip: "Explain this exception as 'a reference pointing to a ghost'. If the page DOM is redrawn, even if the element looks identical, its internal reference changes. Re-finding the element is the absolute best fix."
    },
    {
      q: "What is the difference between driver.close() and driver.quit()?",
      concepts: [
        "driver.close() closes only the active browser window or tab that Selenium is currently focusing on.",
        "driver.quit() terminates the entire WebDriver session, closing all open windows, tabs, and shutting down the driver server process.",
        "quit() releases resources from memory; using only close() can lead to orphaned driver processes running in the background.",
        "quit() invalidates the driver session ID; close() does not."
      ],
      keywords: ["Active Window", "WebDriver Session", "Orphaned Processes", "Driver Server", "Session ID", "Memory Leak"],
      tip: "Mention that close() is useful when testing multi-tab switching workflows, but quit() should always be called in the @AfterSuite or teardown hook to clean up memory resources."
    }
  ],
  api: [
    {
      q: "What are the common HTTP status codes and what do they represent in REST APIs?",
      concepts: [
        "2xx (Success): e.g. 200 OK (successful request), 201 Created (resource successfully generated).",
        "3xx (Redirection): e.g. 301 Moved Permanently, 304 Not Modified.",
        "4xx (Client Error): e.g. 400 Bad Request, 401 Unauthorized (unauthenticated), 403 Forbidden (insufficient roles), 404 Not Found.",
        "5xx (Server Error): e.g. 500 Internal Server Error, 503 Service Unavailable, 504 Gateway Timeout."
      ],
      keywords: ["200 OK", "201 Created", "400 Bad Request", "401 Unauthorized", "404 Not Found", "500 Internal Server Error", "HTTP Verb"],
      tip: "Explain that status codes are crucial for contract testing. In API automation, your first assertion should always verify that the status code matches the expected response envelope."
    },
    {
      q: "Explain the difference between POST and PUT HTTP methods.",
      concepts: [
        "POST is used to create a new resource on the server; PUT is used to create or replace an existing resource.",
        "Idempotency: PUT is idempotent (multiple identical requests yield the same state); POST is non-idempotent (creates duplicates).",
        "Resource URI: POST requests target the collection URI (e.g. /users); PUT requests target the specific resource ID (e.g. /users/123).",
        "Partial Updates: PUT replaces the whole payload. For partial updates, PATCH is preferred."
      ],
      keywords: ["Idempotent", "Resource Creation", "Payload Replacement", "PATCH Verb", "Collection URI", "Request Envelope"],
      tip: "Always emphasize 'Idempotency'. If you click a POST button twice, you might buy two shirts. If you click a PUT button twice, you'll update the target resource to the same state twice."
    },
    {
      q: "How do you automate authenticated API requests (Bearer Tokens, OAuth2) in REST Assured?",
      concepts: [
        "Step 1: Send a POST request to the auth endpoint with client credentials / payload.",
        "Step 2: Parse the response JSON and extract the token value (using JsonPath).",
        "Step 3: Inject the token into subsequent requests using the header: `.header(\"Authorization\", \"Bearer \" + token)`.",
        "REST Assured Auth filter: Alternatively, use `.given().auth().oauth2(token)` for built-in injection."
      ],
      keywords: ["Bearer Token", "OAuth2", "JsonPath", "Authorization Header", "Client Credentials", "Auth Filter"],
      tip: "Describe authentication as a two-stage pipeline: extraction and injection. Highlight how you mock or dynamically fetch auth tokens in your TestNG @BeforeMethod setup."
    }
  ],
  framework: [
    {
      q: "What is Page Object Model (POM) and what are its main advantages?",
      concepts: [
        "Design Pattern: Separates test scripts (validation logic) from page structure / element locators.",
        "Page Classes: Each web page has a corresponding class defining elements (By variables) and page methods (actions).",
        "Reusability: Element coordinates are declared in one spot. If a button's XPath changes, you only update it in one file.",
        "Readability: Test code reads like user steps (e.g. `loginPage.login(user, pass)` instead of `driver.findElement...`)."
      ],
      keywords: ["Design Pattern", "Reusability", "Locators Maintenance", "Decoupling", "Clean Code", "Page Factory"],
      tip: "Emphasize maintenance. In automation, the main cost is maintaining tests when UI changes. POM decouples test verification from page locators, reducing maintenance overhead by 80%."
    },
    {
      q: "How do you design a data-driven framework using TestNG or JUnit?",
      concepts: [
        "Separation of Data: Test inputs are removed from Java code and placed in Excel (Apache POI), JSON, CSV, or Database tables.",
        "TestNG @DataProvider: A method that reads raw data source and returns a 2D Object array (`Object[][]`).",
        "Parametrization: Test annotation specifies data provider (`@Test(dataProvider = \"loginData\")`).",
        "Execution: TestNG executes the exact same test method multiple times, injecting one data row per execution."
      ],
      keywords: ["@DataProvider", "Apache POI", "Excel Parsing", "2D Object Array", "Decoupled Data", "Testng.xml"],
      tip: "Explain that data-driven testing lets you run positive, negative, and edge-case inputs in a loop without duplicating code. Mention Apache POI for Excel data parsing."
    },
    {
      q: "What is CI/CD in automation, and how do you configure it using Jenkins and Git?",
      concepts: [
        "Git Hooks/Webhook: Pushing automation code to GitHub triggers a Jenkins build pipeline.",
        "Maven Integration: Jenkins runs testing lifecycle targets (e.g. `mvn clean test`).",
        "Jenkinsfile (Pipeline as Code): Declares stages (Checkout, Execute Tests, Generate ExtentReports, Notify Slack).",
        "Artifact Archiving: HTML reports (ExtentReports/Allure) are archived and hosted inside Jenkins workspace."
      ],
      keywords: ["Jenkins Pipeline", "Maven Goal", "Git Webhook", "ExtentReports", "Allure", "Test Execution Hook", "Slack Alerts"],
      tip: "Describe CI/CD as the 'heartbeat' of automation. Explain that tests are worthless if they only run on a QA's local laptop. They must run in a headless browser container in the cloud on every merge."
    }
  ]
};

export default function Tools({ dark }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("scanner");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["scanner", "roi", "wizard", "interview", "audit", "comparison"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  /* ─────────────────────────────────────────────────────
     WEBSITE SPEED & SEO AUDITOR STATE & LOGIC
  ───────────────────────────────────────────────────── */
  const [auditUrl, setAuditUrl] = useState("");
  const [auditApiKey, setAuditApiKey] = useState(() => localStorage.getItem("pagespeed_api_key") || "");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStep, setAuditStep] = useState("");
  const [auditResult, setAuditResult] = useState(null);
  const [auditError, setAuditError] = useState(null);

  const auditSteps = [
    "Resolving host and performing DNS handshake...",
    "Retrieving site HTML and headers...",
    "Running Lighthouse Performance audit rules...",
    "Evaluating SEO meta tags and link structures...",
    "Computing Largest Contentful Paint (LCP) and Cumulative Layout Shift...",
    "Compiling audit reports and recommendations..."
  ];

  const handleRunAudit = async (e) => {
    if (e) e.preventDefault();
    if (!auditUrl.trim()) return;

    let targetUrl = auditUrl.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    // Save API key
    localStorage.setItem("pagespeed_api_key", auditApiKey.trim());

    setAuditLoading(true);
    setAuditProgress(10);
    setAuditStep(auditSteps[0]);
    setAuditResult(null);
    setAuditError(null);

    const interval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        const nextStepIdx = Math.min(Math.floor(prev / 18), auditSteps.length - 1);
        setAuditStep(auditSteps[nextStepIdx]);
        return prev + 5;
      });
    }, 400);

    try {
      let url = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        targetUrl
      )}&category=PERFORMANCE&category=SEO`;

      if (auditApiKey.trim()) {
        url += `&key=${encodeURIComponent(auditApiKey.trim())}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        const msg = errorJson.error?.message || `HTTP error ${response.status}`;
        throw new Error(msg);
      }

      const json = await response.json();
      clearInterval(interval);
      setAuditProgress(100);

      const lh = json.lighthouseResult;
      const perfScore = Math.round((lh.categories.performance?.score || 0) * 100);
      const seoScore = Math.round((lh.categories.seo?.score || 0) * 100);

      const audits = lh.audits;
      
      const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";
      const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
      const tti = audits["interactive"]?.displayValue || "N/A";
      const cls = audits["cumulative-layout-shift"]?.displayValue || "N/A";
      const speedIndex = audits["speed-index"]?.displayValue || "N/A";

      const opps = [];
      const opportunitiesToCollect = [
        "render-blocking-resources",
        "modern-image-formats",
        "uses-optimized-images",
        "offscreen-images",
        "unminified-css",
        "unminified-javascript",
        "unused-css-rules",
        "unused-javascript",
      ];

      opportunitiesToCollect.forEach(id => {
        const audit = audits[id];
        if (audit && audit.score !== null && audit.score < 0.9) {
          opps.push({
            title: audit.title,
            desc: audit.description?.replace(/\[Learn more\]\((.*?)\)\.?/g, "") || "",
            savings: audit.displayValue || "Potential savings"
          });
        }
      });

      if (opps.length === 0) {
        if (perfScore < 90) {
          opps.push({
            title: "Eliminate render-blocking resources",
            desc: "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.",
            savings: "Est savings: 0.5s - 1.2s"
          });
          opps.push({
            title: "Serve images in next-gen formats",
            desc: "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption.",
            savings: "Est savings: 250ms - 800ms"
          });
        }
        if (seoScore < 90) {
          opps.push({
            title: "Optimize Crawlability & Indexing",
            desc: "Ensure your page has a valid meta description, heading structure, and alt tags for search engines to properly rank your content.",
            savings: "High Impact"
          });
        }
      }

      setAuditResult({
        url: targetUrl,
        performance: perfScore,
        seo: seoScore,
        metrics: { fcp, lcp, tti, cls, speedIndex },
        opportunities: opps.slice(0, 4)
      });
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      
      let errMsg = err.message || "Request failed";
      if (errMsg.includes("API key not valid")) {
        errMsg = "Invalid API Key. Please verify your Google Cloud credentials.";
      } else if (errMsg.includes("Quota exceeded") || errMsg.includes("429")) {
        errMsg = "Google API Rate Limit Exceeded (429). Google PageSpeed requires an API Key for keyless queries from busy networks.";
      }
      setAuditError(errMsg);
    } finally {
      setAuditLoading(false);
    }
  };

  const handleLoadMockReport = () => {
    let targetUrl = auditUrl.trim() || "mywebsite.com";
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }
    const mockPerf = Math.floor(Math.random() * 20) + 70;
    const mockSeo = Math.floor(Math.random() * 15) + 80;
    
    setAuditError(null);
    setAuditResult({
      url: targetUrl,
      performance: mockPerf,
      seo: mockSeo,
      isDemoData: true,
      metrics: {
        fcp: "1.2 s",
        lcp: "2.5 s",
        tti: "3.1 s",
        cls: "0.08",
        speedIndex: "1.9 s"
      },
      opportunities: [
        {
          title: "Eliminate render-blocking resources",
          desc: "Some Javascript files and CSS stylesheets are blocking your page's initial paint. Defer script loading or bundle styles.",
          savings: "Est savings: ~0.8s"
        },
        {
          title: "Serve images in next-gen formats",
          desc: "Convert older JPEG/PNG images to WebP to reduce payload size without losing quality.",
          savings: "Est savings: ~60% reduction"
        },
        {
          title: "Add missing alt attributes on images",
          desc: "Alternative text improves accessibility and helps search engines understand image context.",
          savings: "SEO Boost"
        }
      ]
    });
  };

  /* ─────────────────────────────────────────────────────
     ATS RESUME SCANNER STATE & LOGIC
  ───────────────────────────────────────────────────── */
  const [targetRole, setTargetRole] = useState("sdet");
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [scanResult, setScanResult] = useState(null);

  const scanSteps = [
    "Analyzing document format and spacing...",
    "Parsing contact details and sections...",
    "Scanning tech-stack keywords and tools...",
    "Verifying action-verb density and impact metrics...",
    "Evaluating compliance with the job description...",
    "Generating final ATS compatibility report..."
  ];

  const handleLoadSampleJD = () => {
    setJdText(SAMPLE_JDS[targetRole]);
  };

  const handleRunScan = (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;

    setScanning(true);
    setScanProgress(0);
    setScanStepIndex(0);
    setScanResult(null);

    // Scan progress animation logic
    const duration = 2000; // 2 seconds
    const intervalTime = 50;
    const stepWeight = duration / scanSteps.length;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const progress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setScanProgress(progress);

      const stepIdx = Math.min(Math.floor(elapsed / stepWeight), scanSteps.length - 1);
      setScanStepIndex(stepIdx);

      if (elapsed >= duration) {
        clearInterval(timer);
        
        // Run parser logic
        const resumeLower = resumeText.toLowerCase();
        const jdLowe = jdText.toLowerCase();
        
        const roleKeywords = KEYWORD_BANKS[targetRole];
        
        // Find matched vs missing keywords
        const matchedKeywords = [];
        const missingKeywords = [];

        roleKeywords.forEach(kw => {
          if (resumeLower.includes(kw)) {
            matchedKeywords.push(kw);
          } else {
            missingKeywords.push(kw);
          }
        });

        // Find action verbs
        const foundVerbs = [];
        ACTION_VERBS.forEach(verb => {
          if (resumeLower.includes(verb)) {
            foundVerbs.push(verb);
          }
        });

        // Formats check (simulated rules based on actual text characteristics)
        const formatChecks = [
          { name: "Document Length Check", pass: resumeText.split(/\s+/).length >= 180, desc: "Resume text contains a robust word count (180+ words)." },
          { name: "Sections Structure", pass: resumeLower.includes("experience") || resumeLower.includes("work") || resumeLower.includes("education"), desc: "Standard header divisions found (Experience, Education)." },
          { name: "Table / Text Box Risk", pass: !resumeLower.includes("canva") && !resumeLower.includes("template"), desc: "No critical template identifiers or complex layout triggers detected." },
          { name: "Contact details", pass: resumeLower.includes("@") || resumeLower.includes("linkedin") || resumeLower.includes("phone"), desc: "Presence of essential contact identifiers (email, links)." }
        ];

        const passedChecksCount = formatChecks.filter(c => c.pass).length;

        // Scoring Formula
        // Keywords match: 50% max (ratio of matched keywords)
        // Action verbs: 30% max (5 or more action verbs = 30 points, otherwise proportional)
        // Format/Structure: 20% max (passed checks / total * 20)
        const keywordScore = Math.round((matchedKeywords.length / roleKeywords.length) * 50);
        const verbScore = Math.min(Math.round((foundVerbs.length / 5) * 30), 30);
        const formatScore = Math.round((passedChecksCount / formatChecks.length) * 20);
        const finalScore = Math.max(keywordScore + verbScore + formatScore, 15); // min score is 15

        setScanResult({
          score: finalScore,
          matchedKeywords,
          missingKeywords,
          foundVerbs,
          formatChecks,
          keywordScore,
          verbScore,
          formatScore
        });
        setScanning(false);
      }
    }, intervalTime);
  };

  const handleBookWithScanResult = () => {
    if (!scanResult) return;
    const roleLabel = targetRole === "sdet" ? "SDET / Automation" : targetRole === "qa" ? "Manual QA" : "Web Developer";
    const msg = `Hi Sudhanshu! I scanned my resume for the target role: ${roleLabel} on your Client Tools page.\n\n` + 
      `Result Details:\n` + 
      `- Overall ATS Score: ${scanResult.score}/100\n` + 
      `- Key Tech Match: ${scanResult.matchedKeywords.length} found, ${scanResult.missingKeywords.length} missing\n` +
      `- Action Verb Count: ${scanResult.foundVerbs.length} found\n\n` +
      `I want to book a professional rewrite to optimize my resume and clear ATS checks. Let's connect!`;
      
    navigate("/contact", {
      state: {
        service: "Resume Services",
        msg: msg
      }
    });
  };

  /* ─────────────────────────────────────────────────────
     ROI CALCULATOR STATE & LOGIC
  ───────────────────────────────────────────────────── */
  const [currentSalary, setCurrentSalary] = useState(600000); // 6 LPA
  const [expectedHike, setExpectedHike] = useState(70); // 70% hike
  const [packageCost, setPackageCost] = useState(29999); // SDET Full Package

  const monthlyCurrent = Math.round(currentSalary / 14);
  const targetSalary = Math.round(currentSalary * (1 + expectedHike / 100));
  const monthlyTarget = Math.round(targetSalary / 14);
  const monthlyIncrease = monthlyTarget - monthlyCurrent;
  
  // Payback period in months
  const paybackPeriod = monthlyIncrease > 0 ? (packageCost / monthlyIncrease).toFixed(1) : "0.0";
  // 3-Year gains
  const threeYearGain = (monthlyIncrease * 36) - packageCost;
  // ROI percentage
  const roiPercentage = packageCost > 0 ? Math.round((threeYearGain / packageCost) * 100) : 0;

  const handleBookROIPackage = () => {
    const msg = `Hi Sudhanshu! I checked the SDET Mentorship ROI Calculator on your site.\n\n` + 
      `My Stats:\n` + 
      `- Current Salary: ₹${currentSalary.toLocaleString('en-IN')}/yr\n` + 
      `- Target Salary (${expectedHike}% hike): ₹${targetSalary.toLocaleString('en-IN')}/yr\n` + 
      `- Estimated payback period for the program: ${paybackPeriod} months\n` + 
      `- Expected 3-year net career gain: ₹${threeYearGain.toLocaleString('en-IN')}\n\n` + 
      `I'm interested in enrolling in the QA to SDET Transformation Program to accelerate this shift. Let's discuss!`;

    navigate("/contact", {
      state: {
        service: "Premium Packages",
        msg: msg
      }
    });
  };


  /* ─────────────────────────────────────────────────────
     CAREER DIAGNOSTIC WIZARD STATE & LOGIC
  ───────────────────────────────────────────────────── */
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAnswers, setWizardAnswers] = useState({});
  const [wizardRecommendation, setWizardRecommendation] = useState(null);

  const handleSelectWizardOption = (qIndex, value) => {
    const nextAnswers = { ...wizardAnswers, [qIndex]: value };
    setWizardAnswers(nextAnswers);
    
    if (qIndex < WIZARD_QUESTIONS.length - 1) {
      setWizardStep(qIndex + 2); // go to next question (1-indexed representation)
    } else {
      // Analyze answers to give exact recommendation
      setWizardStep(WIZARD_QUESTIONS.length + 1); // go to result step
      computeRecommendation(nextAnswers);
    }
  };

  const computeRecommendation = (answers) => {
    const role = answers[0];
    const goal = answers[1];
    const block = answers[2];

    let title = "";
    let price = "";
    let desc = "";
    let score = 95;
    let perks = [];
    let stateSvc = "";

    // Logical recommendations mapping
    if (role === "business" || goal === "web_dev" || block === "website_build") {
      title = "Business Professional Website Development";
      price = "₹9,999 – ₹19,999";
      desc = "Since you want to build or maintain a professional, high-performance website to launch your digital brand, this business-tier web design package is perfect. Includes mobile responsive layouts, Google Analytics, SEO tags, and contact forms.";
      perks = ["Free 1 Month Maintenance support", "Full SEO optimization & console submissions", "WhatsApp Chat integration", "Delivery in 5 to 10 days"];
      stateSvc = "Website Development";
      score = 98;
    } else if (goal === "branding" || block === "ats_block") {
      title = "Complete LinkedIn + Resume Optimization Package";
      price = "₹2,999";
      desc = "Since your primary bottleneck is clearing the ATS screening filters and securing interview requests, we recommend this complete branding package. We rewrite your resume using an ATS-optimized single-column layout, optimize your LinkedIn headline/about sections, and structure your profile to stand out to recruiters.";
      perks = ["ATS Compatibility Audit & Rewrite", "LinkedIn Branding Playbook", "Unlimited revisions (7 days)", "Priority WhatsApp support"];
      stateSvc = "LinkedIn Services";
      score = 97;
    } else if (role === "manual_qa" && goal === "sdet_career") {
      title = "QA to SDET Transformation (Full Mentorship)";
      price = "₹49,999 (Installment options available)";
      desc = "Since you want to switch from Manual QA to SDET and unlock 70%+ salary hikes, the Job Switch Accelerator and SDET mentorship is the perfect program. We guide you step-by-step from Core Java to TestNG, designing Selenium frameworks, writing API mocks (REST Assured), CI/CD pipelines, and conducting mock interviews.";
      perks = ["1-on-1 personalized weekly sessions", "Real-world banking framework design project", "Resume rewrite + LinkedIn optimization included", "Salary negotiation scripts & mock interviews"];
      stateSvc = "Premium Packages";
      score = 99;
    } else if (goal === "topics" || block === "coding") {
      title = "Selenium Automation + API Testing Bootcamp";
      price = "₹4,999 – ₹9,999";
      desc = "To target specific technical bottlenecks like Java coding, Selenium WebDriver framework design, or API testing, our specialized training courses provide the ideal structure. You'll master the logic behind frameworks and build production-grade tests.";
      perks = ["Complete Selenium Webdriver & REST Assured curriculum", "Hands-on coding exercises and solutions", "Direct Q&A support with Sudhanshu", "Certificate of completion"];
      stateSvc = "Training Courses";
      score = 96;
    } else {
      // Fallback: Professional Career Package
      title = "Professional Career Package";
      price = "₹3,499";
      desc = "An all-in-one preparation package designed to accelerate your job switch. Includes custom ATS resume rewrite, complete LinkedIn optimization, 60-minute mock interview with detailed analytical feedback, and career guidance roadmap.";
      perks = ["ATS Resume Rewrite", "Full LinkedIn Profile Optimization", "1 Mock Interview (60 mins) & Feedback session", "1-on-1 Switch Roadmap"];
      stateSvc = "Resume Services";
      score = 95;
    }

    setWizardRecommendation({ title, price, desc, perks, score, stateSvc });
  };

  const handleBookWizardRecommendation = () => {
    if (!wizardRecommendation) return;
    const msg = `Hi Sudhanshu! I completed the Career Diagnostic Wizard on your website and got matched with:\n\n` + 
      `Matched Service: ${wizardRecommendation.title}\n` +
      `Diagnostic Match Score: ${wizardRecommendation.score}%\n\n` +
      `I would like to claim my diagnostic consultation session and discuss starting this service. Let's connect!`;

    navigate("/contact", {
      state: {
        service: wizardRecommendation.stateSvc,
        msg: msg
      }
    });
  };

  /* ─────────────────────────────────────────────────────
     MOCK INTERVIEW SIMULATOR STATE & LOGIC
  ───────────────────────────────────────────────────── */
  const [interviewCategory, setInterviewCategory] = useState("java");
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [selfAssessChecked, setSelfAssessChecked] = useState({});

  const handleNextQuestion = () => {
    const totalQs = INTERVIEW_QUESTIONS[interviewCategory].length;
    setCurrentQIdx(prev => (prev + 1) % totalQs);
    setAnswerRevealed(false);
    setSelfAssessChecked({});
  };

  const handleToggleAssessChecked = (idx) => {
    setSelfAssessChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBookMockInterview = (questionText) => {
    const catLabel = interviewCategory === "java" ? "Core Java" : interviewCategory === "selenium" ? "Selenium WebDriver" : interviewCategory === "api" ? "API Testing" : "Automation Framework Design";
    const msg = `Hi Sudhanshu! I was practicing mock interviews on your Client Tools page.\n\n` +
      `I was reviewing the ${catLabel} question:\n` +
      `"${questionText}"\n\n` +
      `I want to book a 1-on-1 mock interview session to assess my performance, work on gaps, and improve my switch preparation. Let's connect!`;

    navigate("/contact", {
      state: {
        service: "Resume Services",
        msg: msg
      }
    });
  };

  return (
    <div style={{ padding: "24px 24px 80px", position: "relative", minHeight: "90vh" }}>
      <div className="orb orb1" style={{ top: "10%", left: "-15%", opacity: 0.08 }} />
      <div className="orb orb2" style={{ bottom: "5%", right: "-10%", opacity: 0.07 }} />
      <div className="dotGrid" />
      <div className="noiseBg" />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SH 
          tag="Interactive Hub" 
          tagIcon={Sparkles} 
          h1="Modern Client" 
          h2="Workspace & Tools" 
          sub="Test your resume strength, calculate your career transition ROI, run a diagnostic wizard, or practice mock interview questions in real-time." 
        />

        {/* Tab Controls */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 12, 
          flexWrap: "wrap", 
          marginBottom: 44,
          padding: 6,
          borderRadius: 8,
          background: "var(--cgl)",
          border: "1px solid var(--cgb)",
          maxWidth: 820,
          margin: "0 auto 44px"
        }}>
          {[
            { id: "scanner", label: "ATS Resume Scanner", icon: FileText },
            { id: "roi", label: "Career Hike ROI Calculator", icon: Calculator },
            { id: "wizard", label: "Diagnostic Service Wizard", icon: HelpCircle },
            { id: "interview", label: "Mock Interview Prep", icon: MessageSquare },
            { id: "audit", label: "Website Speed & SEO Auditor", icon: Globe },
            { id: "comparison", label: "Service Comparison Builder", icon: Columns }
          ].map(tab => {
            const TabIcon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  borderRadius: 6,
                  border: "1px solid transparent",
                  background: active ? "var(--cs)" : "transparent",
                  borderColor: active ? "var(--cgb)" : "transparent",
                  color: active ? "var(--ct)" : "var(--cm)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter',sans-serif",
                  transition: "all .2s cubic-bezier(.16,1,.3,1)",
                  flex: "1 1 auto",
                  justifyContent: "center"
                }}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ATS RESUME SCANNER & KEYWORD MATCHER */}
        {activeTab === "scanner" && (
          <div className="reveal vis" style={{ animation: "shimIn .5s cubic-bezier(.16,1,.3,1)" }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* INPUT PANEL */}
              <div className="gcard gradBorder" style={{ flex: "1 1 500px", padding: 32, background: "var(--cgl)" }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <FileText size={20} color="var(--cp)" />
                  Pasted Resume Analyzer
                </h3>
                
                <form onSubmit={handleRunScan}>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Target Job Profile</label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[
                        { id: "sdet", label: "SDET / Automation Engineer" },
                        { id: "qa", label: "Manual QA Specialist" },
                        { id: "dev", label: "Full-Stack Web Developer" }
                      ].map(r => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            setTargetRole(r.id);
                            // Auto reset result when role changes
                            setScanResult(null);
                          }}
                          style={{
                            padding: "8px 16px",
                            borderRadius: 6,
                            border: targetRole === r.id ? "1px solid var(--cp-brand)" : "1px solid var(--cgb)",
                            background: targetRole === r.id ? "rgba(129,140,248,.12)" : "transparent",
                            color: targetRole === r.id ? "var(--cp-brand)" : "var(--cm)",
                            fontSize: 12.5,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all .2s"
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Job Description (JD)</label>
                      <button
                        type="button"
                        onClick={handleLoadSampleJD}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--cp)",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontFamily: "'Inter',sans-serif"
                        }}
                      >
                        ⚡ Load Sample JD
                      </button>
                    </div>
                    <textarea
                      className="finput"
                      rows={4}
                      placeholder="Paste the target job description here, or click 'Load Sample JD' to autofill a standard specification..."
                      value={jdText}
                      onChange={e => { setJdText(e.target.value); setScanResult(null); }}
                      style={{ fontSize: 13.5, lineHeight: 1.6 }}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Paste Resume Text</label>
                    <textarea
                      className="finput"
                      rows={8}
                      placeholder="Copy and paste the plain text of your resume here to verify compatibility..."
                      value={resumeText}
                      onChange={e => { setResumeText(e.target.value); setScanResult(null); }}
                      style={{ fontSize: 13.5, lineHeight: 1.6 }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btnP"
                    disabled={!resumeText.trim() || scanning}
                    style={{
                      width: "100%",
                      padding: "14px",
                      fontSize: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      opacity: resumeText.trim() ? 1 : 0.5,
                      cursor: resumeText.trim() ? "pointer" : "not-allowed"
                    }}
                  >
                    {scanning ? (
                      <>
                        <RefreshCw className="spinSlow" size={16} style={{ animation: "spinSlow 2s linear infinite" }} />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Play size={15} />
                        Run Free ATS Scan
                      </>
                    )}
                  </button>
                </form>

                {scanning && (
                  <div style={{ marginTop: 24, padding: "18px 20px", borderRadius: 6, background: "rgba(129,140,248,.06)", border: "1px dashed var(--cgb)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                      <span style={{ color: "var(--cm)" }}>{scanSteps[scanStepIndex]}</span>
                      <span style={{ color: "var(--cp)" }}>{scanProgress}%</span>
                    </div>
                    <div style={{ height: 4, background: "var(--cgb)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${scanProgress}%`, background: "var(--cp-brand)", borderRadius: 2, transition: "width .15s ease" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* RESULTS PANEL */}
              <div style={{ flex: "1 1 400px", minWidth: 320, position: "sticky", top: 90 }}>
                {scanResult ? (
                  <div className="gcard gradBorder" style={{ padding: 32, background: "var(--cgl)", boxShadow: "0 20px 48px rgba(0,0,0,.08)" }}>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: "1px" }}>Overall Match Rate</span>
                      
                      {/* Circular Progress Gauge */}
                      <div style={{ position: "relative", width: 130, height: 130, margin: "16px auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="130" height="130" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                          <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--cgb)" strokeWidth="7" />
                          <circle cx="50" cy="50" r="42" fill="transparent" 
                            stroke={scanResult.score >= 80 ? "#10b981" : scanResult.score >= 50 ? "#f59e0b" : "#ef4444"} 
                            strokeWidth="7" 
                            strokeDasharray={263.89} 
                            strokeDashoffset={263.89 - (263.89 * scanResult.score) / 100}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 0.8s ease" }}
                          />
                        </svg>
                        <div style={{ position: "absolute", textAlign: "center" }}>
                          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, color: scanResult.score >= 80 ? "#10b981" : scanResult.score >= 50 ? "#f59e0b" : "#ef4444" }}>
                            {scanResult.score}%
                          </div>
                          <div style={{ fontSize: 9, color: "var(--cm)", fontWeight: 700, letterSpacing: ".5px" }}>COMPATIBLE</div>
                        </div>
                      </div>

                      <span style={{
                        display: "inline-flex",
                        padding: "4px 10px",
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        background: scanResult.score >= 80 ? "rgba(16,185,129,.1)" : scanResult.score >= 50 ? "rgba(245,158,11,.1)" : "rgba(239,68,68,.1)",
                        color: scanResult.score >= 80 ? "#10b981" : scanResult.score >= 50 ? "#f59e0b" : "#ef4444",
                        border: `1px solid ${scanResult.score >= 80 ? "#10b981" : scanResult.score >= 50 ? "#f59e0b" : "#ef4444"}28`
                      }}>
                        {scanResult.score >= 80 ? "Great Resume Match" : scanResult.score >= 50 ? "Improvement Recommended" : "Critical Gaps Detected"}
                      </span>
                    </div>

                    {/* Breakdown Accordeon */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                      {/* Keyword Check */}
                      <div style={{ padding: "16px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>
                          <span>Target Keyword Coverage</span>
                          <span style={{ color: "var(--cp)" }}>{scanResult.matchedKeywords.length}/{KEYWORD_BANKS[targetRole].length} matched</span>
                        </div>
                        
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                          {scanResult.matchedKeywords.map((kw, i) => (
                            <span key={i} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "rgba(16,185,129,.1)", color: "#10b981", border: "1px solid rgba(16,185,129,.2)" }}>
                              ✓ {kw}
                            </span>
                          ))}
                        </div>

                        {scanResult.missingKeywords.length > 0 && (
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--cm)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".3px" }}>Missing Critical Keywords:</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {scanResult.missingKeywords.slice(0, 7).map((kw, i) => (
                                <span key={i} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "rgba(239,68,68,.05)", color: "#ef4444", border: "1px dashed rgba(239,68,68,.2)" }}>
                                  + {kw}
                                </span>
                              ))}
                              {scanResult.missingKeywords.length > 7 && (
                                <span style={{ fontSize: 10.5, color: "var(--cm)", fontWeight: 500, alignSelf: "center" }}>
                                  +{scanResult.missingKeywords.length - 7} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Verbs Check */}
                      <div style={{ padding: "16px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, fontWeight: 700, marginBottom: 6 }}>
                          <span>Action Verbs & Impact</span>
                          <span style={{ color: "var(--cp)" }}>{scanResult.foundVerbs.length} found</span>
                        </div>
                        <p style={{ fontSize: 12, color: "var(--cm)", lineHeight: 1.5, marginBottom: 8 }}>
                          ATS scanners prioritize action verbs that highlight quantifiable impacts. (e.g. 'automated', 'optimized').
                        </p>
                        {scanResult.foundVerbs.length > 0 ? (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {scanResult.foundVerbs.map((v, i) => (
                              <span key={i} style={{ fontSize: 11, fontWeight: 500, color: "var(--ct)" }}>• {v}</span>
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 600 }}>⚠️ Add action verbs like 'designed', 'reduced' or 'led'</span>
                        )}
                      </div>

                      {/* Formatting Checklist */}
                      <div style={{ padding: "16px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)" }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>ATS Structure Compatibility</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {scanResult.formatChecks.map((check, i) => (
                            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12 }}>
                              <div style={{ 
                                width: 16, height: 16, borderRadius: 3, 
                                background: check.pass ? "rgba(16,185,129,.15)" : "rgba(239,68,68,.15)",
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1
                              }}>
                                {check.pass ? <Check size={10} color="#10b981" strokeWidth={3} /> : <X size={10} color="#ef4444" strokeWidth={3} />}
                              </div>
                              <div style={{ flex: 1 }}>
                                <span style={{ fontWeight: 600, color: "var(--ct)" }}>{check.name}:</span>{" "}
                                <span style={{ color: "var(--cm)" }}>{check.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA Banner */}
                    <div style={{ padding: "16px", borderRadius: 6, background: "rgba(129,140,248,.06)", border: "1px dashed var(--cgb)", marginBottom: 18 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--cp)", marginBottom: 4 }}>Fix Your Resume Gaps Today</div>
                      <p style={{ fontSize: 11.5, color: "var(--cm)", lineHeight: 1.5 }}>
                        Get a custom ATS-ready resume write-up & LinkedIn redesign matching your target description. 98% of clients secure interviews in 30 days.
                      </p>
                    </div>

                    <button onClick={handleBookWithScanResult} className="btnP" style={{ width: "100%", padding: "12px", fontSize: 14, fontWeight: 600 }}>
                      Consult on Fixing Gaps
                    </button>
                  </div>
                ) : (
                  <div className="gcard" style={{ padding: "48px 32px", textAlign: "center", background: "var(--cgl)", border: "1px dashed var(--cgb)" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Scan Results Dashboard</h4>
                    <p style={{ color: "var(--cm)", fontSize: 13, lineHeight: 1.7 }}>
                      Pasted text is analyzed locally. Your results report (keyword check, action verbs, and structure compatibility) will render here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QA-TO-SDET CAREER TRANSITION ROI CALCULATOR */}
        {activeTab === "roi" && (
          <div className="reveal vis" style={{ animation: "shimIn .5s cubic-bezier(.16,1,.3,1)" }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* SLIDERS PANEL */}
              <div className="gcard gradBorder" style={{ flex: "1 1 500px", padding: 32, background: "var(--cgl)" }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                  <Calculator size={20} color="var(--cp)" />
                  Hike & Mentorship ROI Slider
                </h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6, marginBottom: 28 }}>
                  Analyze the financial feasibility and payback schedule of enrolling in professional SDET bootcamp training relative to expected salary hikes.
                </p>

                {/* Slider 1: Current Salary */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ct)" }}>Current Annual Salary (LPA)</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--cp-brand)" }}>
                      ₹{(currentSalary / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="5000000"
                    step="50000"
                    value={currentSalary}
                    onChange={e => setCurrentSalary(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "var(--cp-brand)",
                      cursor: "pointer",
                      height: 4,
                      borderRadius: 2,
                      background: "var(--cgb)"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--cm)", marginTop: 6 }}>
                    <span>₹3L (Fresher)</span>
                    <span>₹25L (Lead)</span>
                    <span>₹50L (Principal)</span>
                  </div>
                </div>

                {/* Slider 2: Hike Percentage */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ct)" }}>Expected Hike Percentage</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--cp-brand)" }}>
                      {expectedHike}% Hike
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={expectedHike}
                    onChange={e => setExpectedHike(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "var(--cp-brand)",
                      cursor: "pointer",
                      height: 4,
                      borderRadius: 2,
                      background: "var(--cgb)"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--cm)", marginTop: 6 }}>
                    <span>30% (Conservative)</span>
                    <span>80% (Avg SDET switch)</span>
                    <span>150% (High Transition)</span>
                  </div>
                </div>

                {/* Slider 3: Package Cost */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ct)" }}>Mentorship / Training Program Cost</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--cp-brand)" }}>
                      ₹{packageCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4999"
                    max="49999"
                    step="1000"
                    value={packageCost}
                    onChange={e => setPackageCost(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "var(--cp-brand)",
                      cursor: "pointer",
                      height: 4,
                      borderRadius: 2,
                      background: "var(--cgb)"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--cm)", marginTop: 6 }}>
                    <span>₹4,999 (Course)</span>
                    <span>₹29,999 (SDET Bundle)</span>
                    <span>₹49,999 (Full Accelerator)</span>
                  </div>
                </div>

                {/* ROI Badge */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 14, 
                  background: "rgba(16,185,129,.04)", 
                  border: "1px solid rgba(16,185,129,.15)", 
                  padding: "16px 20px", 
                  borderRadius: 6 
                }}>
                  <div style={{ 
                    width: 38, height: 38, borderRadius: 6, background: "rgba(16,185,129,.1)", 
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 
                  }}>💰</div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--cm)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".3px" }}>Estimated 3-Year Return On Investment (ROI)</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#10b981", marginTop: 2 }}>
                      +{roiPercentage.toLocaleString('en-IN')}% Net ROI
                    </div>
                  </div>
                </div>
              </div>

              {/* CALCULATED TRAJECTORY SUMMARY */}
              <div style={{ flex: "1 1 400px", minWidth: 320, position: "sticky", top: 90 }}>
                <div className="gcard gradBorder" style={{ padding: 32, background: "var(--cgl)", boxShadow: "0 20px 48px rgba(0,0,0,.08)" }}>
                  <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Financial Switch Projection</h4>
                  
                  {/* Stats Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
                    <div style={{ padding: "14px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)" }}>
                      <div style={{ fontSize: 11, color: "var(--cm)", fontWeight: 600, textTransform: "uppercase" }}>Monthly Increase</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "#10b981", marginTop: 4 }}>
                        +~₹{monthlyIncrease.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ padding: "14px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)" }}>
                      <div style={{ fontSize: 11, color: "var(--cm)", fontWeight: 600, textTransform: "uppercase" }}>Payback Duration</div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--cp-brand)", marginTop: 4 }}>
                        {paybackPeriod} {parseFloat(paybackPeriod) === 1.0 ? "Month" : "Months"}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "16px 20px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)", marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--cm)" }}>
                      <span>Current Monthly Salary:</span>
                      <span style={{ fontWeight: 600, color: "var(--ct)" }}>~₹{monthlyCurrent.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--cm)", marginTop: 8 }}>
                      <span>Expected Target Monthly:</span>
                      <span style={{ fontWeight: 600, color: "#10b981" }}>~₹{monthlyTarget.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--cm)", marginTop: 6, fontStyle: "italic", textAlign: "right" }}>
                      * Divided by 14 (varies from company to company)
                    </div>
                    <div style={{ height: 1, background: "var(--cgb)", margin: "12px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700 }}>
                      <span>Net 3-Year Earnings hike:</span>
                      <span style={{ color: "#10b981" }}>₹{threeYearGain.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Comparative Visual Chart */}
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 14 }}>
                      3-Year Cumulative Income Comparison
                    </div>
                    
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-end", height: 160, paddingBottom: 10 }}>
                      {/* Left Bar (No Switch) */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ 
                          width: "100%", 
                          height: 60, // base height ratio
                          background: "var(--cgb)", 
                          borderRadius: "4px 4px 0 0",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          paddingBottom: 8,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--cm)"
                        }}>
                          ₹{(currentSalary * 3 / 100000).toFixed(1)}L
                        </div>
                        <span style={{ fontSize: 10.5, color: "var(--cm)", fontWeight: 600, marginTop: 8, textAlign: "center" }}>No Switch (Standard)</span>
                      </div>

                      {/* Right Bar (With SDET Mentorship Switch) */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ 
                          width: "100%", 
                          height: `${Math.min(60 * (1 + expectedHike / 100), 150)}px`, // scaled height ratio
                          background: "var(--cp-brand)", 
                          borderRadius: "4px 4px 0 0",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          paddingBottom: 8,
                          fontSize: 12.5,
                          fontWeight: 800,
                          color: "#fff"
                        }}>
                          ₹{((targetSalary * 3 - packageCost) / 100000).toFixed(1)}L
                        </div>
                        <span style={{ fontSize: 10.5, color: "var(--cp-brand)", fontWeight: 700, marginTop: 8, textAlign: "center" }}>With Mentorship Switch</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleBookROIPackage} className="btnP" style={{ width: "100%", padding: "12px", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    Start SDET Career Mentorship <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CAREER DIAGNOSTIC & SERVICE WIZARD */}
        {activeTab === "wizard" && (
          <div className="reveal vis" style={{ animation: "shimIn .5s cubic-bezier(.16,1,.3,1)" }}>
            <div className="gcard gradBorder" style={{ borderRadius: 12, padding: "40px 32px", maxWidth: 780, margin: "0 auto", background: "var(--cgl)" }}>
              
              {/* INTRO SCREEN */}
              {wizardStep === 0 && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 8, background: "rgba(124,58,237,.12)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
                    border: "1px solid rgba(124,58,237,.25)"
                  }}>
                    <HelpCircle size={30} color="var(--cp)" />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Find Your Perfect Career Path</h3>
                  <p style={{ color: "var(--cm)", fontSize: 15, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
                    Answer 3 quick questions about your current role, goals, and struggles to receive a personalized learning roadmap and custom service recommendation.
                  </p>
                  <button onClick={() => setWizardStep(1)} className="btnP" style={{ padding: "12px 32px", borderRadius: 6, fontSize: 14, fontWeight: 600 }}>
                    Start Diagnostic Quiz
                  </button>
                </div>
              )}

              {/* QUESTIONS STEPS */}
              {wizardStep >= 1 && wizardStep <= WIZARD_QUESTIONS.length && (
                <div>
                  {/* Step counter */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Step {wizardStep} of {WIZARD_QUESTIONS.length}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cp)" }}>{Math.round((wizardStep / WIZARD_QUESTIONS.length) * 100)}% Complete</span>
                  </div>
                  <div style={{ height: 4, background: "var(--cgb)", borderRadius: 2, overflow: "hidden", marginBottom: 36 }}>
                    <div style={{ height: "100%", width: `${(wizardStep / WIZARD_QUESTIONS.length) * 100}%`, background: "var(--cp)", borderRadius: 2, transition: "width .4s ease" }} />
                  </div>

                  {(() => {
                    const qData = WIZARD_QUESTIONS[wizardStep - 1];
                    const Icon = qData.icon;
                    return (
                      <div>
                        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 24 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 6, background: "rgba(124,58,237,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cp)", flexShrink: 0 }}>
                            <Icon size={18} />
                          </div>
                          <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, margin: 0 }}>{qData.q}</h4>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                          {qData.options.map((opt, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectWizardOption(wizardStep - 1, opt.v)}
                              className="glass gradBorder"
                              style={{
                                borderRadius: 6,
                                padding: "16px 20px",
                                cursor: "pointer",
                                transition: "all .2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 16
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "var(--cgb)"}
                              onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                              <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 3 }}>{opt.t}</div>
                                <div style={{ fontSize: 12, color: "var(--cm)" }}>{opt.desc}</div>
                              </div>
                              <div style={{
                                width: 22, height: 22, borderRadius: "50%", border: "2px solid var(--cgb)",
                                display: "flex", alignItems: "center", justifyContent: "center"
                              }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: "var(--cm)" }}>{idx + 1}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {wizardStep > 1 && (
                          <button
                            onClick={() => setWizardStep(prev => prev - 1)}
                            style={{ display: "block", margin: "24px auto 0", background: "none", border: "none", fontSize: 12, color: "var(--cm)", cursor: "pointer", textDecoration: "underline" }}
                          >
                            Go Back
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* RESULT RECOMMENDATION SCREEN */}
              {wizardStep === WIZARD_QUESTIONS.length + 1 && wizardRecommendation && (
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: "1px" }}>Diagnostic Assessment Profile</span>
                  
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, margin: "12px 0 6px" }}>
                    Your Best Match Recommendation
                  </h3>
                  <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 24 }}>
                    <span style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 6, fontSize: 11.5, fontWeight: 700, background: "rgba(16,185,129,.1)", color: "#10b981", border: "1px solid rgba(16,185,129,.2)" }}>
                      🎯 {wizardRecommendation.score}% Compatibility Score
                    </span>
                    <span style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 6, fontSize: 11.5, fontWeight: 700, background: "rgba(124,58,237,.1)", color: "var(--cp)", border: "1px solid rgba(124,58,237,.2)" }}>
                      ✨ Special Promo Active
                    </span>
                  </div>

                  <div className="glass gradBorder" style={{ borderRadius: 8, padding: 28, background: "var(--cs)", textAlign: "left", marginBottom: 28 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                      <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800, color: "var(--cp)" }}>
                        {wizardRecommendation.title}
                      </h4>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--cm)" }}>
                        Est. Cost: <span style={{ color: "var(--ct)" }}>{wizardRecommendation.price}</span>
                      </span>
                    </div>

                    <p style={{ fontSize: 13.5, color: "var(--cm)", lineHeight: 1.65, marginBottom: 20 }}>
                      {wizardRecommendation.desc}
                    </p>

                    <div style={{ height: 1, background: "var(--cgb)", marginBottom: 16 }} />

                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ct)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".3px" }}>What's Included / Key Benefits:</div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                      {wizardRecommendation.perks.map((p, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--cm)" }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: 4, background: "rgba(16,185,129,.12)",
                            border: "1px solid rgba(16,185,129,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                          }}>
                            <Check size={9} color="#10b981" strokeWidth={3} />
                          </div>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Promo Callout */}
                  <div style={{ 
                    padding: "14px 20px", 
                    borderRadius: 6, 
                    background: "var(--cs)", 
                    border: "1px dashed var(--cgb-hover)", 
                    marginBottom: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    fontSize: 13
                  }}>
                    <span>🎁 <strong>Diagnostic Bonus:</strong> Mention this assessment to get a free <strong>30-Minute Career Strategy Session</strong> worth ₹999!</span>
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={handleBookWizardRecommendation} className="btnP" style={{ padding: "12px 28px", borderRadius: 6, fontSize: 14, fontWeight: 600 }}>
                      Claim Matches & Consult
                    </button>
                    <button 
                      onClick={() => {
                        setWizardStep(0);
                        setWizardAnswers({});
                        setWizardRecommendation(null);
                      }} 
                      className="btnS" 
                      style={{ padding: "12px 28px", borderRadius: 6, fontSize: 14, fontWeight: 600 }}
                    >
                      Retake Diagnostic Quiz
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 5: WEBSITE SPEED & SEO AUDITOR */}
        {activeTab === "audit" && (
          <div className="reveal vis" style={{ animation: "shimIn .5s cubic-bezier(.16,1,.3,1)" }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
              {/* Left Column: Form & Settings */}
              <div style={{ flex: "1 1 500px" }}>
                <div className="gcard gradBorder" style={{ borderRadius: 12, padding: 32, background: "var(--cgl)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                      <Globe size={20} color="var(--cp)" />
                      Real-Time Performance Auditor
                    </h3>
                    <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6, marginBottom: 28 }}>
                      Enter a URL below to run a live Lighthouse Speed and SEO audit. We'll run performance rules, calculate web vitals, and diagnose SEO gaps in real-time.
                    </p>

                    <form onSubmit={handleRunAudit}>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Website URL</label>
                        <div style={{ display: "flex", gap: 10 }}>
                          <input
                            type="text"
                            className="finput"
                            placeholder="e.g. google.com or mybusiness.com"
                            value={auditUrl}
                            onChange={e => setAuditUrl(e.target.value)}
                            style={{ flex: 1 }}
                          />
                          <button
                            type="submit"
                            className="btnP"
                            disabled={!auditUrl.trim() || auditLoading}
                            style={{
                              padding: "0 28px",
                              borderRadius: 6,
                              fontSize: 14.5,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              opacity: auditUrl.trim() && !auditLoading ? 1 : 0.6
                            }}
                          >
                            {auditLoading ? (
                              <RefreshCw className="spinSlow" size={16} style={{ animation: "spinSlow 2s linear infinite" }} />
                            ) : (
                              "Run Audit"
                            )}
                          </button>
                        </div>
                      </div>

                      <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>
                          <span>Google PageSpeed API Key (Optional)</span>
                          <a href="https://developers.google.com/speed/docs/insights/v5/get-started" target="_blank" rel="noopener noreferrer" style={{ textTransform: "none", fontSize: 11, color: "var(--cp)", textDecoration: "underline", fontWeight: 600 }}>Get Free Key</a>
                        </label>
                        <input
                          type="password"
                          className="finput"
                          placeholder="Paste API Key to prevent rate limits..."
                          value={auditApiKey}
                          onChange={e => setAuditApiKey(e.target.value)}
                          style={{ fontSize: 12.5 }}
                        />
                        <span style={{ display: "block", fontSize: 11, color: "var(--cm)", marginTop: 6, lineHeight: 1.4 }}>
                          🔑 Saved locally in your browser. Highly recommended to prevent rate limiting (429 errors) on shared IP networks.
                        </span>
                      </div>
                    </form>

                    {auditLoading && (
                      <div style={{ marginTop: 24, padding: "20px", borderRadius: 6, background: "rgba(124,58,237,.05)", border: "1px dashed var(--cgb)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                          <span style={{ color: "var(--cm)" }}>{auditStep}</span>
                          <span style={{ color: "var(--cp)" }}>{auditProgress}%</span>
                        </div>
                        <div style={{ height: 4, background: "var(--cgb)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${auditProgress}%`, background: "var(--cp)", borderRadius: 2, transition: "width .3s ease" }} />
                        </div>
                      </div>
                    )}

                    {auditError && (
                      <div style={{ marginTop: 20, padding: "18px", borderRadius: 6, background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.18)" }}>
                        <div style={{ color: "#f87171", fontSize: 13, fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                          <span>⚠️ Audit Failed: Rate Limit (429)</span>
                        </div>
                        <p style={{ color: "var(--cm)", fontSize: 11.5, lineHeight: 1.5, marginBottom: 14 }}>
                          {auditError.includes("Rate Limit") ? "Google rate-limits keyless API calls. You can get a free developer key or generate a simulated audit report below." : auditError}
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                          <a href="https://developers.google.com/speed/docs/insights/v5/get-started" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <button className="btnS" type="button" style={{ padding: "8px 14px", fontSize: 11, height: "auto" }}>Get Free API Key</button>
                          </a>
                          <button className="btnP" type="button" onClick={handleLoadMockReport} style={{ padding: "8px 14px", fontSize: 11, borderRadius: 6 }}>
                            Simulate Report
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {!auditResult && !auditLoading && !auditError && (
                    <div style={{ marginTop: 32, padding: "20px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 20 }}>💡</div>
                      <p style={{ fontSize: 12.5, color: "var(--cm)", lineHeight: 1.6, margin: 0 }}>
                        <strong>How this works:</strong> This tool contacts the PageSpeed API directly. It evaluates your site using Google Lighthouse rules. Make sure the site is public and doesn't block automated bots!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Reports Dashboard */}
              <div style={{ flex: "1 1 500px" }}>
                {auditResult ? (
                  <div className="gcard gradBorder" style={{ borderRadius: 12, padding: 32, background: "var(--cgl)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      {/* Scores summary */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 800, margin: 0 }}>
                          📋 Audit Report: <span style={{ color: "var(--cp)", fontSize: 14.5 }}>{auditResult.url}</span>
                        </h4>
                        {auditResult.isDemoData && (
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "rgba(249,115,22,.1)", color: "#f97316", border: "1px solid rgba(249,115,22,.2)" }}>
                            Local Check (Demo Report)
                          </span>
                        )}
                      </div>

                      {/* Circles */}
                      <div style={{ display: "flex", gap: 40, justifySelf: "center", justifyContent: "center", marginBottom: 28 }}>
                        {/* Performance Score */}
                        <div style={{ textAlign: "center" }}>
                          <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                              <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--cgb)" strokeWidth="6" />
                              <circle cx="50" cy="50" r="42" fill="transparent" 
                                stroke={auditResult.performance >= 90 ? "#10b981" : auditResult.performance >= 50 ? "#f59e0b" : "#ef4444"} 
                                strokeWidth="6" 
                                strokeDasharray={263.89} 
                                strokeDashoffset={263.89 - (263.89 * auditResult.performance) / 100}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 0.8s ease" }}
                              />
                            </svg>
                            <div style={{ position: "absolute", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: auditResult.performance >= 90 ? "#10b981" : auditResult.performance >= 50 ? "#f59e0b" : "#ef4444" }}>
                              {auditResult.performance}
                            </div>
                          </div>
                          <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--ct)", marginTop: 8 }}>Performance</span>
                        </div>

                        {/* SEO Score */}
                        <div style={{ textAlign: "center" }}>
                          <div style={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                              <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--cgb)" strokeWidth="6" />
                              <circle cx="50" cy="50" r="42" fill="transparent" 
                                stroke={auditResult.seo >= 90 ? "#10b981" : auditResult.seo >= 50 ? "#f59e0b" : "#ef4444"} 
                                strokeWidth="6" 
                                strokeDasharray={263.89} 
                                strokeDashoffset={263.89 - (263.89 * auditResult.seo) / 100}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 0.8s ease" }}
                              />
                            </svg>
                            <div style={{ position: "absolute", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: auditResult.seo >= 90 ? "#10b981" : auditResult.seo >= 50 ? "#f59e0b" : "#ef4444" }}>
                              {auditResult.seo}
                            </div>
                          </div>
                          <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--ct)", marginTop: 8 }}>SEO Score</span>
                        </div>
                      </div>

                      {/* Vitals Grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                        {[
                          { name: "First Contentful Paint (FCP)", value: auditResult.metrics.fcp, desc: "Time taken to render initial layout elements." },
                          { name: "Largest Contentful Paint (LCP)", value: auditResult.metrics.lcp, desc: "Time taken to display primary visible content." },
                          { name: "Time to Interactive (TTI)", value: auditResult.metrics.tti, desc: "Time when page becomes fully interactive." },
                          { name: "Cumulative Layout Shift (CLS)", value: auditResult.metrics.cls, desc: "Visual stability metric for dynamic changes." }
                        ].map((m, i) => (
                          <div key={i} style={{ padding: "12px 14px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cm)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{m.name}</span>
                              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--cp)" }}>{m.value}</span>
                            </div>
                            <span style={{ display: "block", fontSize: 10.5, color: "var(--cm)", lineHeight: 1.3 }}>{m.desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Recommendations */}
                      <h5 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 800, color: "var(--ct)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".3px" }}>
                        🛠️ Top Performance & SEO Gaps
                      </h5>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                        {auditResult.opportunities.map((opp, idx) => (
                          <div key={idx} style={{ padding: "12px 14px", borderRadius: 6, background: "rgba(124,58,237,.03)", border: "1px dashed var(--cgb)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>
                              <span style={{ color: "var(--ct)" }}>{opp.title}</span>
                              <span style={{ color: "var(--cp)" }}>{opp.savings}</span>
                            </div>
                            <p style={{ fontSize: 11.5, color: "var(--cm)", lineHeight: 1.45, margin: 0 }}>
                              {opp.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Card */}
                    {(auditResult.performance < 90 || auditResult.seo < 90) && (
                      <div style={{ padding: "18px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
                        <div style={{ flex: "1 1 240px" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--cp)", marginBottom: 4 }}>Optimise Your Website Speed</div>
                          <p style={{ fontSize: 11.5, color: "var(--cm)", lineHeight: 1.5, margin: 0 }}>
                            Low page scores harm search rankings and cost visitors. Book a speed & SEO audit service to optimize core web vitals and resolve performance gaps.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const msg = `Hi Sudhanshu! I audited my website: ${auditResult.url} on your Website Speed & SEO Auditor page.\n\n` +
                              `My Results:\n` +
                              `- Performance Score: ${auditResult.performance}/100\n` +
                              `- SEO Score: ${auditResult.seo}/100\n\n` +
                              `I would like to book a professional optimization consultation to improve my site speed and resolve these SEO warning alerts. Let's connect!`;
                            navigate("/contact", { state: { service: "Website Maintenance", msg } });
                          }}
                          className="btnP"
                          style={{ padding: "10px 18px", borderRadius: 6, fontSize: 12.5 }}
                        >
                          Book Performance Optimization
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="gcard" style={{ borderRadius: 12, padding: "48px 32px", textAlign: "center", background: "var(--cgl)", border: "1px dashed var(--cgb)", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 54, marginBottom: 20 }}>📊</div>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8, color: "var(--ct)" }}>
                      Audit Report Dashboard
                    </h4>
                    <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>
                      Enter a URL on the left and click **"Run Audit"** to see live Google Lighthouse metrics, loading times, and SEO health recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MOCK INTERVIEW SIMULATOR */}
        {activeTab === "interview" && (
          <div className="reveal vis" style={{ animation: "shimIn .5s cubic-bezier(.16,1,.3,1)" }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
              {/* Left Column: Questions Card */}
              <div style={{ flex: "1 1 500px" }}>
                <div className="gcard gradBorder" style={{ borderRadius: 12, padding: 32, background: "var(--cgl)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    {/* Header info */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                        🎭 Prep Simulator
                      </h3>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--cp)", background: "rgba(124,58,237,.1)", padding: "4px 12px", borderRadius: 6 }}>
                        Question {currentQIdx + 1} of {INTERVIEW_QUESTIONS[interviewCategory].length}
                      </span>
                    </div>

                    {/* Category tabs */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, borderBottom: "1px solid var(--cgb)", paddingBottom: 16 }}>
                      {[
                        { id: "java", label: "☕ Core Java & OOP" },
                        { id: "selenium", label: "🌐 Selenium WebDriver" },
                        { id: "api", label: "📡 API Testing" },
                        { id: "framework", label: "🏗️ Framework Design" }
                      ].map(cat => {
                        const active = interviewCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setInterviewCategory(cat.id);
                              setCurrentQIdx(0);
                              setAnswerRevealed(false);
                              setSelfAssessChecked({});
                            }}
                            style={{
                              padding: "8px 16px",
                              borderRadius: 6,
                              border: active ? "1.5px solid var(--cp)" : "1.5px solid transparent",
                              background: active ? "rgba(124,58,237,.08)" : "transparent",
                              color: active ? "var(--cp)" : "var(--cm)",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all .2s"
                            }}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Question text box */}
                    <div className="glass" style={{ borderRadius: 6, padding: 24, background: "var(--cs)", border: "1px solid var(--cgb)", marginBottom: 28, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16.5, fontWeight: 700, lineHeight: 1.6, textAlign: "center", color: "var(--ct)", margin: 0 }}>
                        "{INTERVIEW_QUESTIONS[interviewCategory][currentQIdx].q}"
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                    <button
                      onClick={() => setAnswerRevealed(prev => !prev)}
                      className="btnP"
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: 6,
                        fontSize: 14.5,
                        fontWeight: 600
                      }}
                    >
                      {answerRevealed ? "🙈 Hide Answer" : "💡 Reveal Expert Answer"}
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className="btnS"
                      style={{
                        padding: "12px 24px",
                        borderRadius: 6,
                        fontSize: 14.5,
                        fontWeight: 600
                      }}
                    >
                      Next Question ➔
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Expert Checkpoints & Keywords */}
              <div style={{ flex: "1 1 400px", minWidth: 320 }}>
                {answerRevealed ? (
                  <div className="gcard gradBorder" style={{ borderRadius: 12, padding: 32, background: "var(--cgl)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      {/* Checkpoints */}
                      <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14.5, fontWeight: 800, color: "var(--ct)", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".3px" }}>
                        🎯 Expert Concept Checklist
                      </h4>
                      <p style={{ fontSize: 12, color: "var(--cm)", marginBottom: 16 }}>
                        A strong answer should touch upon these core concepts:
                      </p>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                        {INTERVIEW_QUESTIONS[interviewCategory][currentQIdx].concepts.map((concept, idx) => {
                          const checked = !!selfAssessChecked[idx];
                          return (
                            <div
                              key={idx}
                              onClick={() => handleToggleAssessChecked(idx)}
                              style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                                cursor: "pointer",
                                padding: "8px 12px",
                                borderRadius: 6,
                                background: checked ? "rgba(16,185,129,.05)" : "transparent",
                                border: checked ? "1px solid rgba(16,185,129,.15)" : "1px solid transparent",
                                transition: "all .15s"
                              }}
                            >
                              <div style={{
                                width: 18,
                                height: 18,
                                borderRadius: 4,
                                border: checked ? "none" : "2px solid var(--cgb)",
                                background: checked ? "#10b981" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: 1
                              }}>
                                {checked && <Check size={11} color="#fff" strokeWidth={3} />}
                              </div>
                              <span style={{ fontSize: 13, color: checked ? "var(--ct)" : "var(--cm)", lineHeight: 1.5 }}>
                                {concept}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Recruiter Alert Keywords */}
                      <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14.5, fontWeight: 800, color: "var(--ct)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".3px" }}>
                        💬 Recruiter Alert Keywords
                      </h4>
                      <p style={{ fontSize: 12, color: "var(--cm)", marginBottom: 12 }}>
                        Recruiters look for these specific industry terms during screening calls:
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                        {INTERVIEW_QUESTIONS[interviewCategory][currentQIdx].keywords.map((tag, idx) => (
                          <span key={idx} style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: "rgba(124,58,237,.08)",
                            color: "var(--cp)",
                            border: "1px solid rgba(124,58,237,.18)"
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Coaching Tip */}
                      <div style={{ padding: "16px 20px", borderRadius: 6, background: "rgba(249,115,22,.05)", border: "1px dashed rgba(249,115,22,.3)", marginBottom: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#f97316", marginBottom: 6 }}>
                          <span>💡 Sudhanshu's Coaching Tip</span>
                        </div>
                        <p style={{ fontSize: 12.5, color: "var(--cm)", lineHeight: 1.6, margin: 0 }}>
                          {INTERVIEW_QUESTIONS[interviewCategory][currentQIdx].tip}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookMockInterview(INTERVIEW_QUESTIONS[interviewCategory][currentQIdx].q)}
                      className="btnP"
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 600
                      }}
                    >
                      Book 1-on-1 Mock Assessment
                    </button>
                  </div>
                ) : (
                  <div className="gcard" style={{ borderRadius: 12, padding: "48px 32px", textAlign: "center", background: "var(--cgl)", border: "1px dashed var(--cgb)", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 54, marginBottom: 20 }}>🎯</div>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8, color: "var(--ct)" }}>
                      Evaluation Dashboard
                    </h4>
                    <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>
                      Formulate your verbal answer, then click **"Reveal Expert Answer"** on the left to show concepts checklist, recruiter tags, and coaching insights.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "comparison" && (
          <ComparisonBuilder dark={dark} />
        )}

        {/* Global Security / Compliance banner */}
        <div style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--cm)" }}>
            <Shield size={13} color="var(--cp)" />
            No personal information is uploaded or stored. Calculations and text parsing are performed entirely client-side.
          </div>
        </div>

      </div>
    </div>
  );
}
