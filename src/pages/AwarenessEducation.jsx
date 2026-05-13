import websites from "../data/websites.json";
import "./CategoryPage.css";
function AwarenessEducation() {

 
  const awarenessEducationWebsites =
    websites["Awareness & Education"];
   

  return (

    <div className="common-page awarenessandeducation-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
          Awareness & Education
        </h1>

        <p>
          Find helpful resources designed to educate, inform, and increase mental health awareness.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {awarenessEducationWebsites.map((site, index) => (

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


export default AwarenessEducation;