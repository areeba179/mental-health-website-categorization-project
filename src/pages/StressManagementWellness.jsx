import websites from "../data/websites.json";
import "./CategoryPage.css";
function StressManagementWellness() {

 
  const stressManagementWebsites =
    websites["Stress Management & Wellness"];

   return (

    <div className="common-page stressManagementWellness-bg">

      {/* HEADER */}

      <div className="top-section">

        <h1>
         Stress Management & Wellbeing
        </h1>

        <p>
         Browse platforms that encourage mindfulness, relaxation, and stress-free living.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {stressManagementWebsites.map((site, index) => (

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

export default StressManagementWellness;