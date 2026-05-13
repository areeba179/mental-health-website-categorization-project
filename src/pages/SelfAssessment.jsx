import websites from "../data/websites.json";
import "./CategoryPage.css";


function SelfAssessment() {

  const selfAssessmentWebsites =
    websites["Self Assessment"];

 
  return (

    <div className="common-page self-assessment-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
       Know Your Mental Wellness
        </h1>

        <p>
       Browse self-assessment platforms that support awareness, reflection, and personal growth.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {selfAssessmentWebsites.map((site, index) => (

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

export default SelfAssessment;