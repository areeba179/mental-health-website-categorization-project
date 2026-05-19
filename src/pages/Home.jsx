import { useState, useEffect } from "react"import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import websites from "../data/websites.json";
import "./Home.css";

function Home() {

  const navigate = useNavigate();
  const categories = Object.keys(websites);

  const heroImages = [
    "https://www.meer.com/attachments/d6ee70fcf42aaa580e2d3a7a39c60f21bbf1ed10/store/fill/1090/613/a0c078af227c173a81d2a936b2867bc4922b0c071fd56bc5b385aac64fd2/Digital-art-illustration-that-highlights-Mental-Health-Day-awareness-emphasizing-the-importance.jpg",
    "https://cuhkintouch.cpr.cuhk.edu.hk/wp-content/uploads/Cover_202409_inTouch_depression.jpg",
    "https://magazine.medlineplus.gov/images/uploads/main_images/Teens_are_talking.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("category");
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);

 const mentalHealthRepositories = {
  depression: [
    "https://github.com/topics/depression-detection",
    "https://github.com/topics/mental-health",
  ],

  anxiety: [
    "https://github.com/topics/anxiety-detection",
    "https://github.com/topics/stress-detection",
  ],

  ocd: [
    "https://github.com/topics/ocd",
  ],

  ptsd: [
    "https://github.com/topics/ptsd",
  ],

  stress: [
    "https://github.com/topics/stress-detection",
  ],

  therapy: [
    "https://github.com/topics/mental-health-chatbot",
  ],
};

  // ERROR FUNCTION
  const showError = (msg) => {
    setError(msg);
    setErrorKey(prev => prev + 1);

    setTimeout(() => {
      setError("");
    }, 2500);
  };

  // HERO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // SEARCH SECTION SCROLL ANIMATION
  useEffect(() => {
    const section = document.querySelector(".search-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // CATEGORIES SCROLL ANIMATION (✔ ADDED FIX)
  useEffect(() => {
    const section = document.querySelector(".categories-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // CATEGORY NAVIGATION
  const handleCategoryClick = (category) => {
    if (category === "OCD") navigate("/ocd");
    else if (category === "Crisis Support & Suicide Prevention")
      navigate("/suicide-prevention");
    else if (category === "Therapy & Counseling")
      navigate("/therapy");
    else if (category === "Self Assessment")
      navigate("/selfassessment");
    else if (category === "Awareness & Education")
      navigate("/AwarenessEducation");
    else if (category === "Stress Management & Wellness")
      navigate("/stress-management-wellness");
    else if (category === "Anxiety")
      navigate("/Anxiety");
     else if (category === "Depression")
      navigate("/Depression");
     else if (category === "PTSD")
      navigate("/PTSD");
  };

  // SEARCH
  const handleSearch = () => {

    const query = searchQuery.toLowerCase().trim();
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

    if (!query) return showError("Please enter something.");

    if (searchType === "category") {

      if (urlPattern.test(query))
        return showError("Category cannot be a URL.");

      if (/^\d+$/.test(query))
        return showError("Invalid category.");

    const q = query.toLowerCase();

if (q.includes("depression")) navigate("/depression");
else if (q.includes("anxiety")) navigate("/anxiety");
else if (q.includes("ocd")) navigate("/ocd");
else if (q.includes("ptsd")) navigate("/ptsd");

else if (q.includes("therapy") || q.includes("counseling"))
  navigate("/Therapy");

else if (q.includes("self")) navigate("/SelfAssessment");

else if (q.includes("awareness") || q.includes("education"))
  navigate("/AwarenessEducation");

else if (q.includes("crisis") || q.includes("suicide"))
  navigate("/suicide-prevention");

else if (q.includes("stress"))
  navigate("/stress-management-wellness");
      else showError("Category not found.");
    }
else if (searchType === "name") {

  const repos = mentalHealthRepositories[query];

  // ERROR HANDLING
  if (!repos) {
    return showError("Repositories not found.");
  }

  // OPEN ALL REPOSITORIES
  repos.forEach((repo) => {
    window.open(repo, "_blank");
  });
}
    else if (searchType === "url") {

      let url = searchQuery.trim();

      if (!urlPattern.test(url))
        return showError("Invalid URL format.");

      if (!url.startsWith("http"))
        url = "https://" + url;

      window.open(url, "_blank");
    }
  };

  return (
    <div>

      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`
        }}
      >
        <div className="overlay">
          <h1>MindCare Directory</h1>
          <p>Awareness is the first step toward healing, and every story deserves to be heard.</p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="search-options">

            <button
              className={searchType === "category" ? "active" : ""}
              onClick={() => setSearchType("category")}
            >
              Category
            </button>

            <button
              className={searchType === "name" ? "active" : ""}
              onClick={() => setSearchType("name")}
            >
              Repositories
            </button>

            <button
              className={searchType === "url" ? "active" : ""}
              onClick={() => setSearchType("url")}
            >
              URL
            </button>

          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          {error && (
            <div key={errorKey} className="error">
              {error}
            </div>
          )}

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories-section">

        <h2>Categories</h2>

        <div className="categories-grid">

          {categories.map((category) => (
            <div
              key={category}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;
import { useNavigate } from "react-router-dom";
import websites from "../data/websites.json";
import "./Home.css";

function Home() {

  const navigate = useNavigate();
  const categories = Object.keys(websites);

  const heroImages = [
    "https://www.meer.com/attachments/d6ee70fcf42aaa580e2d3a7a39c60f21bbf1ed10/store/fill/1090/613/a0c078af227c173a81d2a936b2867bc4922b0c071fd56bc5b385aac64fd2/Digital-art-illustration-that-highlights-Mental-Health-Day-awareness-emphasizing-the-importance.jpg",
    "https://cuhkintouch.cpr.cuhk.edu.hk/wp-content/uploads/Cover_202409_inTouch_depression.jpg",
    "https://magazine.medlineplus.gov/images/uploads/main_images/Teens_are_talking.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("category");
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);

  const mentalHealthWebsites = {
    betterhelp: "https://www.betterhelp.com",
    calm: "https://www.calm.com",
    headspace: "https://www.headspace.com",
    mind: "https://www.mind.org.uk",
    nami: "https://www.nami.org",
    psychologytoday: "https://www.psychologytoday.com",
    talkspace: "https://www.talkspace.com",
    mentalhealth: "https://www.mentalhealth.org",
    verywellmind: "https://www.verywellmind.com",
  };

  // ERROR FUNCTION
  const showError = (msg) => {
    setError(msg);
    setErrorKey(prev => prev + 1);

    setTimeout(() => {
      setError("");
    }, 2500);
  };

  // HERO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // SEARCH SECTION SCROLL ANIMATION
  useEffect(() => {
    const section = document.querySelector(".search-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // CATEGORIES SCROLL ANIMATION (✔ ADDED FIX)
  useEffect(() => {
    const section = document.querySelector(".categories-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // CATEGORY NAVIGATION
  const handleCategoryClick = (category) => {
    if (category === "OCD") navigate("/ocd");
    else if (category === "Crisis Support & Suicide Prevention")
      navigate("/suicide-prevention");
    else if (category === "Therapy & Counseling")
      navigate("/therapy");
    else if (category === "Self Assessment")
      navigate("/selfassessment");
    else if (category === "Awareness & Education")
      navigate("/AwarenessEducation");
    else if (category === "Stress Management & Wellness")
      navigate("/stress-management-wellness");
    else if (category === "Anxiety")
      navigate("/Anxiety");
     else if (category === "Depression")
      navigate("/Depression");
     else if (category === "PTSD")
      navigate("/PTSD");
  };

  // SEARCH
  const handleSearch = () => {

    const query = searchQuery.toLowerCase().trim();
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

    if (!query) return showError("Please enter something.");

    if (searchType === "category") {

      if (urlPattern.test(query))
        return showError("Category cannot be a URL.");

      if (/^\d+$/.test(query))
        return showError("Invalid category.");

    const q = query.toLowerCase();

if (q.includes("depression")) navigate("/depression");
else if (q.includes("anxiety")) navigate("/anxiety");
else if (q.includes("ocd")) navigate("/ocd");
else if (q.includes("ptsd")) navigate("/ptsd");

else if (q.includes("therapy") || q.includes("counseling"))
  navigate("/Therapy");

else if (q.includes("self")) navigate("/SelfAssessment");

else if (q.includes("awareness") || q.includes("education"))
  navigate("/AwarenessEducation");

else if (q.includes("crisis") || q.includes("suicide"))
  navigate("/suicide-prevention");

else if (q.includes("stress"))
  navigate("/stress-management-wellness");
      else showError("Category not found.");
    }

    else if (searchType === "name") {

      if (mentalHealthWebsites[query]) {
        window.open(mentalHealthWebsites[query], "_blank");
      } else {
        showError("Website not found.");
      }
    }

    else if (searchType === "url") {

      let url = searchQuery.trim();

      if (!urlPattern.test(url))
        return showError("Invalid URL format.");

      if (!url.startsWith("http"))
        url = "https://" + url;

      window.open(url, "_blank");
    }
  };

  return (
    <div>

      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`
        }}
      >
        <div className="overlay">
          <h1>MindCare Directory</h1>
          <p>Awareness is the first step toward healing, and every story deserves to be heard.</p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="search-options">

            <button
              className={searchType === "category" ? "active" : ""}
              onClick={() => setSearchType("category")}
            >
              Category
            </button>

            <button
              className={searchType === "name" ? "active" : ""}
              onClick={() => setSearchType("name")}
            >
              Website
            </button>

            <button
              className={searchType === "url" ? "active" : ""}
              onClick={() => setSearchType("url")}
            >
              URL
            </button>

          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          {error && (
            <div key={errorKey} className="error">
              {error}
            </div>
          )}

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories-section">

        <h2>Categories</h2>

        <div className="categories-grid">

          {categories.map((category) => (
            <div
              key={category}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;
