import websites from "../data/websites.json";
import "./CategoryPage.css";
function Depression() {

  const depressionWebsites =
    websites["Depression"];

   return (

    <div className="common-page depression-bg">
      {/* HEADER */}

      <div className="top-section">

        <h1>
          Helpful Depression Websites
        </h1>

        <p>
     Access supportive websites designed to provide awareness, comfort, and mental health guidance.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {depressionWebsites.map((site, index) => (

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
export default Depression;