
import websites from "../data/websites.json";
import "./CategoryPage.css";

function PTSD() {

  

  const ptsdWebsites = websites["PTSD"];

  return (

      <div className="common-page ptsd-bg">
      {/* HEADER */}

      <div className="top-section">

        <h1>
          PTSD Support & Resources
        </h1>

        <p>
          Explore trusted mental health platforms,
          coping resources, emotional support,
          and trauma recovery tools.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {ptsdWebsites.map((site, index) => (

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

export default PTSD;