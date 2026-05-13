import websites from "../data/websites.json";
import "./CategoryPage.css";
function Therapy() {

  const therapyWebsites =
    websites["Therapy & Counseling"];
    
 return (

   <div className="common-page TherapyCounseling-bg
">

      {/* HEADER */}

      <div className="top-section">

        <h1>
      Online Therapy & Counseling
        </h1>

        <p>
        Discover reliable platforms that provide counseling, mental health support, and self-care guidance.
        </p>

      </div>

      {/* CARDS */}

      <div className="grid">

        {therapyWebsites.map((site, index) => (

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
 
export default Therapy;