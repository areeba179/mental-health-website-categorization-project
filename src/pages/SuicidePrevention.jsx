import websites from "../data/websites.json";
import "./CategoryPage.css";
function SuicidePrevention() {

  const suicideWebsites =
    websites["Crisis Support & Suicide Prevention"];

  return (

    <div className="common-page SuicidePrevention-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Suicide Prevention & Crisis Support
        </h1>

        <p>
          Get connected to resources that help you or others during difficult and overwhelming moments.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {suicideWebsites.map((site, index) => (

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
export default SuicidePrevention;