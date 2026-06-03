import { useEffect, useState } from "react";
import "./CategoryPage.css";

function Anxiety() {

  const [anxietyWebsites, setAnxietyWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GITHUB TOKEN FROM .env
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {

    const fetchAnxietyRepositories = async () => {

      // CACHE KEY
      const cacheKey = "anxietyRepositories";

      // CHECK CACHE FIRST
      const cachedRepos = localStorage.getItem(cacheKey);

      if (cachedRepos) {

        setAnxietyWebsites(JSON.parse(cachedRepos));
        setLoading(false);

        return;
      }

      try {

        // ONLY ONE API REQUEST
        const response = await fetch(
          "https://api.github.com/search/repositories?q=mental-health+anxiety&sort=stars&order=desc&per_page=12",
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

        setAnxietyWebsites(formattedRepos);

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

    fetchAnxietyRepositories();

  }, [TOKEN]);

  return (

    <div className="common-page anxiety-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Explore Anxiety Guides
        </h1>

        <p>
          Explore trusted mental health platforms,
          coping resources, emotional support,
          and anxiety management tools.
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

          {anxietyWebsites.map((site, index) => (

            <div className="card" key={index}>

              <div className="card-content">

                {/* REPOSITORY NAME */}

                <h2>{site.name}</h2>

                {/* DESCRIPTION */}

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

              {/* BUTTON */}

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

export default Anxiety;
