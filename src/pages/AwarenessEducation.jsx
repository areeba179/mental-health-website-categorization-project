import { useEffect, useState } from "react";
import "./CategoryPage.css";

function AwarenessEducation() {

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {

    const fetchRepos = async () => {

      const cacheKey = "awarenessEducationRepos";

      // ✅ STEP 1: CHECK CACHE FIRST (VERY IMPORTANT FIX)
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setRepos(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {

        // ✅ STRONG SEARCH QUERY (LESS API CALLS NOW)
        const query =
          "mental health OR psychology OR psychoeducation OR wellness OR therapy education";

        const response = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=15`,
          {
            headers: {
              Authorization: `token ${TOKEN}`
            }
          }
        );

        const data = await response.json();

        // ❌ HANDLE GITHUB LIMIT ERROR
        if (!data.items) {
          setError(data.message || "GitHub API error");
          setLoading(false);
          return;
        }

        // ✅ FORMAT DATA
        const formatted = data.items.map(repo => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description || "No description available",
          stars: repo.stargazers_count,
          language: repo.language || "N/A"
        }));

        // ✅ SAVE TO CACHE (IMPORTANT FIX FOR YOUR ISSUE)
        localStorage.setItem(cacheKey, JSON.stringify(formatted));

        setRepos(formatted);

      } catch (err) {

        console.error(err);
        setError("Failed to fetch repositories");

      } finally {
        setLoading(false);
      }
    };

    fetchRepos();

  }, [TOKEN]);

  return (

    <div className="common-page awarenessandeducation-bg">

      {/* HEADER */}
      <div className="top-section">
        <h1>Awareness & Education</h1>
        <p>
          Find helpful resources designed to educate, inform,
          and increase mental health awareness.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <h2 style={{ color: "white", textAlign: "center" }}>
          Loading repositories...
        </h2>

      ) : error ? (
        <h2 style={{ color: "white", textAlign: "center" }}>
          {error}
        </h2>

      ) : (

        <div className="grid">

          {repos.length === 0 ? (
            <h3 style={{ color: "white", textAlign: "center" }}>
              No repositories found
            </h3>

          ) : (

            repos.map((site, index) => (

              <div className="card" key={index}>

                <div className="card-content">

                  <h2>{site.name}</h2>
                  <p>{site.description}</p>

                  <p style={{ color: "#90caf9", marginTop: "10px" }}>
                    💻 {site.language}
                  </p>

                  <p style={{ color: "#ffd700", marginTop: "10px" }}>
                    ⭐ {site.stars} Stars
                  </p>

                </div>

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Repository
                </a>

              </div>

            ))
          )}

        </div>
      )}

    </div>
  );
}

export default AwarenessEducation;
