import { useEffect, useState } from "react";
import "./CategoryPage.css";

function Therapy() {

  const [therapyWebsites, setTherapyWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GITHUB TOKEN
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {

    const fetchRepositories = async () => {

      // CACHE KEY
      const cacheKey = "therapyRepositories";

      // CHECK CACHE FIRST
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {

        setTherapyWebsites(JSON.parse(cachedData));
        setLoading(false);

        return;
      }

      try {

        // BETTER SEARCH QUERIES
        const queries = [
          "therapy counseling mental health",
          "mental health chatbot",
          "psychology therapy app",
          "online counseling system",
          "mental wellness platform",
          "cbt therapy application",
          "teletherapy mental health",
          "emotional support platform"
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

        // FILTER ONLY THERAPY RELATED REPOS
        const filteredRepos = uniqueRepos.filter(repo => {

          const text = `
            ${repo.name}
            ${repo.description}
          `.toLowerCase();

          return (
            text.includes("therapy") ||
            text.includes("counsel") ||
            text.includes("mental") ||
            text.includes("psychology") ||
            text.includes("wellness") ||
            text.includes("support") ||
            text.includes("cbt") ||
            text.includes("chatbot")
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

        setTherapyWebsites(formattedRepos);

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

    <div className="common-page TherapyCounseling-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Online Therapy & Counseling
        </h1>

        <p>
          Discover therapy systems,
          counseling platforms,
          CBT applications,
          emotional wellness tools,
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

          {therapyWebsites.length === 0 ? (

            <h2
              style={{
                color: "white",
                textAlign: "center"
              }}
            >
              No repositories found.
            </h2>

          ) : (

            therapyWebsites.map((site, index) => (

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

export default Therapy;
