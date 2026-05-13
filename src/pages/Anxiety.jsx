import websites from "../data/websites.json";
import "./CategoryPage.css";

function Anxiety() {

  const anxietyWebsites =
    websites["Anxiety"];

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

      {/* CARDS */}

      <div className="grid">

        {anxietyWebsites.map((site, index) => (

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

export default Anxiety;