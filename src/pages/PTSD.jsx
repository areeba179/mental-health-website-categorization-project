import { useEffect, useState } from "react";
import "./CategoryPage.css";

function PTSD() {

  const [ptsdWebsites, setPtsdWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);
        setError("");

        // PTSD + TRAUMA SPECIFIC SEARCHES
        const queries = [
          "ptsd trauma recovery app",
          "post traumatic stress disorder therapy app",
          "mental health trauma support system",
          "trauma counseling platform psychology",
          "stress trauma mental health app",
          "cbt trauma therapy system"
        ];

        let allRepos = [];

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
              throw new Error("GitHub API request failed");
            }

            return response.json();
          })

        );

        responses.forEach((data) => {

          if (data.items) {
            allRepos = [...allRepos, ...data.items];
          }

        });

        // REMOVE DUPLICATES
        const uniqueRepos = Array.from(
          new Map(allRepos.map(repo => [repo.id, repo])).values()
        );

        // PTSD / TRAUMA FILTER
        const filteredRepos = uniqueRepos.filter(repo => {

          const text = `
            ${repo.name}
            ${repo.description || ""}
          `.toLowerCase();

          return (
            text.includes("ptsd") ||
            text.includes("trauma") ||
            text.includes("stress") ||
            text.includes("mental") ||
            text.includes("therapy") ||
            text.includes("counseling") ||
            text.includes("cbt") ||
            text.includes("recovery")
          );
        });

        // SORT BY STARS
        filteredRepos.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );

        // FORMAT DATA
        const formatted = filteredRepos
          .slice(0, 18)
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            description:
              repo.description ||
              "No description available",
            stars: repo.stargazers_count,
            language: repo.language || "Not specified",
            owner: repo.owner.login,
            updated: new Date(
              repo.updated_at
            ).toLocaleDateString()
          }));

        setPtsdWebsites(formatted);

      } catch (error) {

        console.error("Error fetching PTSD repos:", error);

        setError(
          "Failed to load PTSD repositories. GitHub API limit may have been reached."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);

  return (

    <div className="common-page ptsd-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          PTSD Support & Resources
        </h1>

        <p>
          Explore trusted mental health platforms,
          trauma recovery systems, PTSD research,
          emotional support tools, and therapy resources.
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
          Loading repositories...
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

          {ptsdWebsites.length === 0 ? (

            <h3
              style={{
                color: "white",
                textAlign: "center",
                width: "100%"
              }}
            >
              No PTSD repositories found.
            </h3>

          ) : (

            ptsdWebsites.map(site => (

              <div className="card" key={site.id}>

                <div className="card-content">

                  <h2>{site.name}</h2>

                  <p>{site.description}</p>

                  <div
                    style={{
                      marginTop: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px"
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

export default PTSD;
