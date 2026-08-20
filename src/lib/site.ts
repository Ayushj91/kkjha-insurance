export const site = {
  name: "Kali Kant Jha",
  shortName: "K.K. Jha",
  business: "Insurance & Investments",
  tagline: "Protect what matters. Plan what's next.",
  taglineHi: "जो अनमोल है, उसकी रक्षा करें। आगे की योजना बनाएं।",
  subTagline:
    "Independent insurance & investment guidance for Indian families — in plain language, for the long run.",
  subTaglineHi:
    "आपके परिवार के लिए सही बीमा और निवेश सलाह — आसान हिंदी में, हर कदम पर साथ।",
  phone: "+919911910284",
  phoneDisplay: "+91 99119 10284",
  whatsappBase: "https://wa.me/919911910284",
  years: "25+",
  clients: "500+",
  location: "India",
  languages: "हिंदी · English",
};

export const waLink = (message: string) =>
  `${site.whatsappBase}?text=${encodeURIComponent(message)}`;

// Small bilingual snippets reused across sections — kept in one place so the
// Hindi stays consistent everywhere it appears.
export const hi = {
  trustEyebrow: "प्राधिकृत भागीदार और प्रमाणित सलाहकार",
  hindiNote: "हिंदी में भी बात कर सकते हैं",
  aboutQuote:
    "“ग्राहक का भरोसा ही सबसे बड़ी कमाई है — यही सोच लेकर 25 साल से काम कर रहा हूँ।”",
  aboutQuoteBy: "— काली कांत झा",
  servicesEyebrow: "हर ज़रूरत के लिए एक भरोसेमंद सलाहकार",
  whyUsEyebrow: "परिवारों का भरोसा, हमारी पहचान",
  contactHeading: "आज ही जुड़ें — एक मैसेज दूर।",
  footerLine: "आपके परिवार की सुरक्षा, हमारी ज़िम्मेदारी।",
};

export const credentials = [
  {
    org: "Bajaj Capital Insurance Broking Ltd",
    role: "Authorised Partner",
    code: "510557",
    codeLabel: "Partner Code",
    accent: "brand",
  },
  {
    org: "Policybazaar Insurance Brokers Pvt Ltd",
    role: "Authorised Partner",
    code: "IP369328",
    codeLabel: "Partner Code",
    accent: "gold",
  },
  {
    org: "LIC of India",
    role: "CLIA — Certified Life Insurance Advisor",
    code: "M0028233A",
    codeLabel: "Advisor Code",
    accent: "brand",
  },
  {
    org: "TIIS India Marketing Pvt Ltd",
    role: "Authorised Partner",
    code: "192659",
    codeLabel: "ARN",
    accent: "gold",
  },
] as const;

export const services = [
  {
    title: "Life Insurance",
    desc: "Term plans, child plans & pension plans that protect your family's tomorrow.",
    icon: "shield-heart",
  },
  {
    title: "Health Insurance",
    desc: "Individual, family floater & senior citizen plans for peace of mind.",
    icon: "pulse",
  },
  {
    title: "Mutual Funds",
    desc: "SIPs and wealth-building plans for education, retirement & big goals.",
    icon: "trending-up",
  },
  {
    title: "Motor Insurance",
    desc: "Private car, two-wheeler & commercial vehicle cover, sorted fast.",
    icon: "car",
  },
  {
    title: "Home & Factory Insurance",
    desc: "Protection for the property and assets you've worked hard to build.",
    icon: "home",
  },
  {
    title: "Travel Insurance",
    desc: "Domestic & international trip cover so you can explore worry-free.",
    icon: "plane",
  },
  {
    title: "Group Medical Policy",
    desc: "Health coverage solutions designed for teams & organisations.",
    icon: "users",
  },
  {
    title: "Workmen Compensation",
    desc: "Employer liability cover that keeps your workforce protected.",
    icon: "hard-hat",
  },
  {
    title: "Transit Insurance",
    desc: "Goods-in-transit cover across road, rail, air & sea.",
    icon: "truck",
  },
] as const;

export const whyUs = [
  {
    title: "25+ years in the field",
    desc: "Decades of hands-on experience navigating claims, renewals & fine print — so you don't have to.",
    icon: "history",
  },
  {
    title: "500+ families trust us",
    desc: "A growing community of clients who come back — and send their friends & family too.",
    icon: "users",
  },
  {
    title: "Straight talk, no jargon",
    desc: "Every option explained in plain language, with your goals — not commissions — front and centre.",
    icon: "message",
  },
  {
    title: "Support that outlasts the sale",
    desc: "From documentation to claims, we stay with you well after the policy is issued.",
    icon: "lifebuoy",
  },
];

export const faqs = [
  {
    q: "Is your advice really independent?",
    a: "Yes. As an authorised partner across multiple insurers, brokers and mutual fund distributors, I compare options across companies to find what genuinely fits your needs — not a single company's agenda.",
  },
  {
    q: "What happens after I buy a policy?",
    a: "I stay involved for the life of your policy — reminders for renewals, help with documentation, and hands-on support if you ever need to file a claim.",
  },
  {
    q: "Can I start with a small SIP or a basic health plan?",
    a: "Absolutely. Most people start small. We'll build a plan that fits your current budget and grows as your income and goals do.",
  },
  {
    q: "Do you only serve one city?",
    a: "I work with clients across India — most of our conversation happens over call and WhatsApp, so location is rarely a barrier.",
  },
  {
    q: "How quickly can I get a quote?",
    a: "Message me on WhatsApp with what you're looking for and I'll usually respond with options within the day.",
  },
  {
    q: "क्या मैं हिंदी में बात कर सकता/सकती हूँ? (Can I talk in Hindi?)",
    a: "बिल्कुल! आप हिंदी या अंग्रेज़ी, जिस भाषा में सहज हों उसमें WhatsApp पर बात कर सकते हैं — हर प्लान आसान भाषा में समझाया जाएगा। (Absolutely — chat in Hindi or English on WhatsApp, whichever you're comfortable with, and every plan will be explained in plain language.)",
  },
];
