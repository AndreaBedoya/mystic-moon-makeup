import React from "react";
import "../styles/StepProgress.css";

function StepProgress({ step, totalSteps }) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="step-progress">
      {steps.map((s, index) => (
        <div key={s} className="step-container">
          <div className={`step-circle ${s <= step ? "active" : ""}`}>
            {s}
          </div>
          {index < steps.length - 1 && (
            <div className={`step-line ${s < step ? "active" : ""}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StepProgress;
