/* ==========================================================
   এই ফাইলে আপনার সব তথ্য আছে। শুধু এখানকার লেখা বদলান,
   HTML / CSS / JS ফাইলে হাত দিতে হবে না।
   ছবিগুলো "images" ফোল্ডারে রাখুন এবং নিচে ফাইলের নাম লিখুন।
   ========================================================== */
const PORTFOLIO = {
  // ---------- মূল পরিচিতি ----------
  name: "আপনার নাম",
  brand: "আমার পোর্টফোলিও",
  tagline: "ওয়েব ডেভেলপার ও ডিজাইনার",
  profileImage: "images/profile.jpg",
  bio: "এখানে আপনার সম্পর্কে ২-৩ লাইন লিখুন। আপনি কী করেন, কী ভালোবাসেন, কোন কাজে সবচেয়ে ভালো।",

  // ---------- সোশ্যাল মিডিয়া (লিঙ্ক না থাকলে লাইনটি মুছে দিন) ----------
  socials: [
    { label: "Facebook", url: "https://facebook.com/yourname" },
    { label: "TikTok",   url: "https://tiktok.com/@yourname" },
    { label: "Bluesky",  url: "https://bsky.app/profile/yourname.bsky.social" },
    { label: "Mastodon", url: "https://mastodon.social/@yourname" },
    { label: "GitHub",   url: "https://github.com/yourname" }
  ],

  // ---------- হাইলাইট (স্লাইডিং কার্ড) ----------
  highlights: [
    { title: "প্রথম প্রজেক্ট", text: "এই প্রজেক্টে কী করেছেন তা সংক্ষেপে লিখুন।", image: "images/highlight-1.jpg", link: "" },
    { title: "দ্বিতীয় প্রজেক্ট", text: "আরেকটি গুরুত্বপূর্ণ কাজের বিবরণ।", image: "images/highlight-2.jpg", link: "" },
    { title: "তৃতীয় প্রজেক্ট", text: "যেকোনো অর্জন, পুরস্কার বা অভিজ্ঞতা।", image: "images/highlight-3.jpg", link: "" },
    { title: "চতুর্থ প্রজেক্ট", text: "আরও কার্ড যোগ করতে এই লাইনটি কপি করুন।", image: "images/highlight-4.jpg", link: "" }
  ],

  // ---------- গ্যালারি ----------
  gallery: [
    { image: "images/gallery-1.jpg", caption: "ছবির নাম ১" },
    { image: "images/gallery-2.jpg", caption: "ছবির নাম ২" },
    { image: "images/gallery-3.jpg", caption: "ছবির নাম ৩" },
    { image: "images/gallery-4.jpg", caption: "ছবির নাম ৪" },
    { image: "images/gallery-5.jpg", caption: "ছবির নাম ৫" },
    { image: "images/gallery-6.jpg", caption: "ছবির নাম ৬" }
  ],

  // ---------- সার্টিফিকেট ----------
  certificates: [
    { title: "সার্টিফিকেটের নাম ১", issuer: "প্রতিষ্ঠানের নাম", year: "২০২৫", image: "images/cert-1.jpg" },
    { title: "সার্টিফিকেটের নাম ২", issuer: "প্রতিষ্ঠানের নাম", year: "২০২৪", image: "images/cert-2.jpg" },
    { title: "সার্টিফিকেটের নাম ৩", issuer: "প্রতিষ্ঠানের নাম", year: "২০২৩", image: "images/cert-3.jpg" }
  ],

  // ---------- যোগাযোগ ----------
  contact: {
    phone: "+8801XXXXXXXXX",
    email: "you@example.com",
    address: "গ্রাম/রাস্তা, উপজেলা, জেলা, দেশ",
    mapLink: "" // গুগল ম্যাপের লিঙ্ক চাইলে এখানে দিন
  },

  // ---------- ফুটার ----------
  footerText: "Design by Nihab"
};
