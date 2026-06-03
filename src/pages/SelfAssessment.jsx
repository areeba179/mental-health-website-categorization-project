import { useEffect, useState } from "react";
import "./CategoryPage.css";

function SelfAssessment() {

  const [selfAssessmentWebsites, setSelfAssessmentWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GITHUB TOKEN
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {

    const fetchRepositories = async () => {

      // CACHE KEY
      const cacheKey = "selfAssessmentRepositories";

      // CHECK CACHE FIRST
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {

        setSelfAssessmentWebsites(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {

        // STRONGER SEARCH TERMS
        const queries = [
          "mental health self assessment",
          "depression anxiety test",
          "mood tracker mental health",
          "psychology self assessment app",
          "mental wellness quiz",
          "stress assessment system",
          "mental health questionnaire",
          "therapy self evaluation"
        ];

        let allRepos = [];

        // FETCH ALL QUERIES
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

        // FILTER RELEVANT REPOS ONLY
        const filteredRepos = uniqueRepos.filter(repo => {

          const text = `
            ${repo.name}
            ${repo.description}
          `.toLowerCase();

          return (
            text.includes("mental") ||
            text.includes("assessment") ||
            text.includes("quiz") ||
            text.includes("therapy") ||
            text.includes("depression") ||
            text.includes("anxiety") ||
            text.includes("stress") ||
            text.includes("mood") ||
            text.includes("psychology")
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

        setSelfAssessmentWebsites(formattedRepos);

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

    <div className="common-page self-assessment-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Know Your Mental Wellness
        </h1>

        <p>
          Browse self-assessment platforms,
          psychology tools,
          mental wellness trackers,
          and emotional health evaluation systems.
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

          {selfAssessmentWebsites.length === 0 ? (

            <h2
              style={{
                color: "white",
                textAlign: "center"
              }}
            >
              No repositories found.
            </h2>

          ) : (

            selfAssessmentWebsites.map((site, index) => (

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

export default SelfAssessment;
