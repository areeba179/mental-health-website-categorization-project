import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OCD from "./pages/OCD";
import SuicidePrevention from "./pages/SuicidePrevention";
import Therapy from "./pages/Therapy";
import SelfAssessment from "./pages/SelfAssessment";
import AwarenessEducation from "./pages/AwarenessEducation";
import StressManagementWellness from "./pages/StressManagementWellness";
import Depression from "./pages/Depression";
import PTSD  from "./pages/PTSD";
import Anxiety from "./pages/Anxiety";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/ocd" element={<OCD />} />
        <Route path="/therapy" element={<Therapy />} />
        <Route path="/selfassessment" element={<SelfAssessment />} />
        <Route path="/awarenesseducation" element={<AwarenessEducation />} />
        <Route path="/stress-management-wellness" element={<StressManagementWellness />} />
        <Route path="/depression" element={<Depression />} />
        <Route path="/ptsd" element={<PTSD />} />
        <Route path="/anxiety" element={<Anxiety />} />
        <Route
  path="/suicide-prevention"
  element={<SuicidePrevention />}
/>
          
        

      </Routes>

    </BrowserRouter>

  );
}

export default App;
