import { useEffect, useState } from "react";
import "./CategoryPage.css";

function Depression() {

  const [depressionWebsites, setDepressionWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDepressionRepositories = async () => {

      try {

        setLoading(true);
        setError("");

        // MULTIPLE STRONG SEARCH TERMS
        const queries = [
          "depression mental health",
          "depression support app",
          "mood disorder therapy",
          "depression treatment system",
          "mental wellness depression",
          "cbt depression app",
          "depression recovery platform"
        ];

        let allRepos = [];

        // FETCH ALL SEARCHES
        const responses = await Promise.all(

          queries.map(async (query) => {

            const response = await fetch(
              `https://api.github.com/search/repositories?q=${encodeURIComponent(
                query
              )}&sort=stars&order=desc&per_page=10`,
              {
                headers: {
                  Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
                }
              }
            );

            if (!response.ok) {
              throw new Error("GitHub API rate limit exceeded");
            }

            return response.json();
          })

        );

        // COMBINE RESULTS
        responses.forEach((data) => {

          if (data.items) {
            allRepos = [...allRepos, ...data.items];
          }

        });

        // REMOVE DUPLICATES
        const uniqueRepos = Array.from(
          new Map(allRepos.map((repo) => [repo.id, repo])).values()
        );

        // FILTER RELEVANT REPOS
        const filteredRepos = uniqueRepos.filter((repo) => {

          const text = `
            ${repo.name}
            ${repo.description || ""}
          `.toLowerCase();

          return (
            text.includes("depression") ||
            text.includes("mental") ||
            text.includes("mood") ||
            text.includes("therapy") ||
            text.includes("cbt") ||
            text.includes("wellness") ||
            text.includes("psychology")
          );
        });

        // SORT BY STARS
        filteredRepos.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );

        // FORMAT DATA
        const formattedRepos = filteredRepos
          .slice(0, 18)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            description:
              repo.description ||
              "No description available for this repository.",
            stars: repo.stargazers_count,
            language: repo.language || "Not specified",
            updated: new Date(
              repo.updated_at
            ).toLocaleDateString(),
            owner: repo.owner.login
          }));

        setDepressionWebsites(formattedRepos);

      } catch (error) {

        console.error("Error fetching repositories:", error);

        setError(
          "GitHub API limit reached or failed to load repositories."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchDepressionRepositories();

  }, []);

  return (

    <div className="common-page depression-bg">

      {/* HEADER */}
      <div className="top-section">

        <h1>
          Helpful Depression Websites
        </h1>

        <p>
          Access supportive platforms, depression recovery tools,
          CBT systems, emotional wellness resources,
          and mental health guidance repositories.
        </p>

      </div>

      {/* LOADING */}
      {loading ? (

        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "40px"
          }}
        >
          Loading depression repositories...
        </h2>

      ) : error ? (

        <h2
          style={{
            color: "#ffb3b3",
            textAlign: "center",
            marginTop: "40px"
          }}
        >
          {error}
        </h2>

      ) : (

        <div className="grid">

          {depressionWebsites.length === 0 ? (

            <h3
              style={{
                color: "white",
                textAlign: "center",
                width: "100%"
              }}
            >
              No depression-related repositories found.
            </h3>

          ) : (

            depressionWebsites.map((site) => (

              <div className="card" key={site.id}>

                <div className="card-content">

                  <h2>{site.name}</h2>

                  <p>{site.description}</p>

                  {/* EXTRA INFO */}
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px"
                    }}
                  >

                    <p
                      style={{
                        color: "#ffd700",
                        fontWeight: "bold"
                      }}
                    >
                      ⭐ {site.stars} Stars
                    </p>

                    <p
                      style={{
                        color: "#d6d6d6",
                        fontSize: "14px"
                      }}
                    >
                      💻 {site.language}
                    </p>

                    <p
                      style={{
                        color: "#d6d6d6",
                        fontSize: "14px"
                      }}
                    >
                      👤 {site.owner}
                    </p>

                    <p
                      style={{
                        color: "#d6d6d6",
                        fontSize: "14px"
                      }}
                    >
                      📅 Updated: {site.updated}
                    </p>

                  </div>

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

export default Depression;
