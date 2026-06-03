import { useEffect, useState } from "react";
import "./CategoryPage.css";

function SuicidePrevention() {

  const [suicideWebsites, setSuicideWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GITHUB TOKEN
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {

    const fetchRepositories = async () => {

      // CACHE KEY
      const cacheKey = "suicidePreventionRepositories";

      // CHECK CACHE FIRST
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {

        setSuicideWebsites(JSON.parse(cachedData));
        setLoading(false);

        return;
      }

      try {

        // BETTER SEARCH QUERIES
        const queries = [
          "suicide prevention mental health",
          "crisis support chatbot",
          "mental health emergency app",
          "suicidal ideation detection",
          "emotional support system",
          "mental health support platform",
          "depression crisis management",
          "suicide detection AI"
        ];

        let allRepos = [];

        // FETCH MULTIPLE SEARCHES
        for (const query of queries) {

          const response = await fetch(
            `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`,
            {
              headers: {
                Authorization: `token ${TOKEN}`
              }
            }
          );

          const data = await response.json();

          if (data.items) {
            allRepos = [...allRepos, ...data.items];
          }
        }

        // REMOVE DUPLICATES
        const uniqueRepos = Array.from(
          new Map(allRepos.map(repo => [repo.id, repo])).values()
        );

        // FILTER RELEVANT REPOSITORIES
        const filteredRepos = uniqueRepos.filter(repo => {

          const text = `
            ${repo.name}
            ${repo.description}
          `.toLowerCase();

          return (
            text.includes("suicide") ||
            text.includes("crisis") ||
            text.includes("mental") ||
            text.includes("therapy") ||
            text.includes("depression") ||
            text.includes("support") ||
            text.includes("emotion") ||
            text.includes("chatbot") ||
            text.includes("stress")
          );
        });

        // FORMAT DATA
        const formattedRepos = filteredRepos
          .slice(0, 15)
          .map(repo => ({
            name: repo.name,
            url: repo.html_url,
            description:
              repo.description ||
              "No description available for this repository.",
            stars: repo.stargazers_count,
            language: repo.language || "Not specified"
          }));

        // SAVE CACHE
        localStorage.setItem(
          cacheKey,
          JSON.stringify(formattedRepos)
        );

        setSuicideWebsites(formattedRepos);

      } catch (error) {

        console.error("Error fetching repositories:", error);

        setError(
          "Failed to load repositories. Please try again later."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchRepositories();

  }, [TOKEN]);

  return (

    <div className="common-page SuicidePrevention-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Suicide Prevention & Crisis Support
        </h1>

        <p>
          Explore crisis support systems,
          emotional wellness tools,
          suicide prevention platforms,
          AI detection systems,
          and mental health support repositories.
        </p>

      </div>

      {/* LOADING */}

      {loading ? (

        <h2
          style={{
            color: "white",
            textAlign: "center"
          }}
        >
          Loading repositories...
        </h2>

      ) : error ? (

        <h2
          style={{
            color: "white",
            textAlign: "center"
          }}
        >
          {error}
        </h2>

      ) : (

        <div className="grid">

          {suicideWebsites.length === 0 ? (

            <h2
              style={{
                color: "white",
                textAlign: "center"
              }}
            >
              No repositories found.
            </h2>

          ) : (

            suicideWebsites.map((site, index) => (

              <div className="card" key={index}>

                <div className="card-content">

                  <h2>{site.name}</h2>

                  <p>{site.description}</p>

                  {/* LANGUAGE */}

                  <p
                    style={{
                      marginTop: "10px",
                      color: "#90caf9",
                      fontWeight: "bold"
                    }}
                  >
                    💻 {site.language}
                  </p>

                  {/* STARS */}

                  <p
                    style={{
                      marginTop: "10px",
                      color: "#ffd700",
                      fontWeight: "bold"
                    }}
                  >
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

export default SuicidePrevention;
