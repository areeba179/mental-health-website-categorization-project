import websites from "../data/websites.json";
import "./CategoryPage.css";

function OCD() {

  const ocdWebsites = websites["OCD"];

  return (

    <div className="common-page ocd-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
         OCD Support Platforms
        </h1>

        <p>
        Discover trusted online platforms focused on understanding and overcoming obsessive-compulsive disorder.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {ocdWebsites.map((site, index) => (

          <div className="card" key={index}>

            <div className="card-content">

              <h2>{site.name}</h2>

              <p>{site.description}</p>

            </div>

            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>

          </div>

        ))}

      </div>

    </div>

  );
}

export default OCD;