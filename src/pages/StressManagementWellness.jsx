import { useEffect, useState } from "react";
import "./CategoryPage.css";

function StressManagementWellness() {

  const [stressManagementWebsites, setStressManagementWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GITHUB TOKEN FROM .env
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {

    const fetchStressRepositories = async () => {

      // CACHE KEY
      const cacheKey = "stressManagementRepos";

      // CHECK CACHE FIRST
      const cachedRepos = localStorage.getItem(cacheKey);

      if (cachedRepos) {

        setStressManagementWebsites(
          JSON.parse(cachedRepos)
        );

        setLoading(false);
        return;
      }

      try {

        // BETTER QUERY + LIMITED RESULTS
        const response = await fetch(
          "https://api.github.com/search/repositories?q=mental-health+wellness+stress&sort=stars&order=desc&per_page=12",
          {
            headers: {
              Authorization: `token ${TOKEN}`
            }
          }
        );

        const data = await response.json();

        console.log(data);

        // HANDLE API ERRORS
        if (data.message) {
          setError(data.message);
          setLoading(false);
          return;
        }

        // FORMAT REPOSITORIES
        const formattedRepos = data.items.map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          description:
            repo.description ||
            "No description available for this repository.",
          stars: repo.stargazers_count,
          language: repo.language || "Not specified"
        }));

        // SAVE TO CACHE
        localStorage.setItem(
          cacheKey,
          JSON.stringify(formattedRepos)
        );

        setStressManagementWebsites(formattedRepos);

      } catch (error) {

        console.error(
          "Error fetching repositories:",
          error
        );

        setError(
          "Failed to load repositories."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchStressRepositories();

  }, [TOKEN]);

  return (

    <div className="common-page stressManagementWellness-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Stress Management & Wellbeing
        </h1>

        <p>
          Browse platforms that encourage mindfulness,
          relaxation, emotional balance,
          and stress-free living.
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

          {stressManagementWebsites.map((site, index) => (

            <div className="card" key={index}>

              <div className="card-content">

                <h2>{site.name}</h2>

                <p>{site.description}</p>

                {/* LANGUAGE */}

                <p
                  style={{
                    color: "#90caf9",
                    marginBottom: "10px",
                    fontWeight: "bold"
                  }}
                >
                  💻 {site.language}
                </p>

                {/* STARS */}

                <p
                  style={{
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

          ))}

        </div>

      )}

    </div>

  );
}

export default StressManagementWellness;
