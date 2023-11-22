/**
 * A React component for calculating Body Mass Index (BMI).
 * This BMI Calculator allows users to input their height and weight
 * in either metric (kg and cm) or imperial (lbs, feet, and inches) units
 * to calculate and display their BMI along with a descriptive category.
 */
"use client";

import { useEffect, useState } from "react";

export default function Calculator() {
  // State hooks for managing input values and calculated BMI
  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  // State hook for managing unit system (metric or imperial)
  const [unit, setUnit] = useState(
    typeof window !== "undefined" ?
      localStorage.getItem("unit") || "lbs" :
      "lbs"
  );

  // Effect hook to update localStorage when unit system changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('unit', unit);
    }
  }, [unit]);

  /**
   * Returns a descriptive text for a given BMI value.
   * @param {number} bmi - The calculated BMI value.
   * @return {string} A descriptive text corresponding to the BMI category.
   */
  const getBmiDescription = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight: Less than the healthy range.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal weight: Healthy range.";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Overweight: Above the healthy range.";
    } else {
      return "Obesity: Significantly above the healthy range.";
    }
  };

  /**
   * Handles BMI calculation for metric units.
   * Computes BMI using height in centimeters and weight in kilograms.
   * @param {Event} e - The form submission event.
   */
  const handleComputeKg = (e) => {
    e.preventDefault();
    const heightInMeters = heightCm / 100;
    if (heightInMeters > 0 && weight > 0) {
      const bmiValue = (weight / heightInMeters ** 2).toFixed(2);
      setBmi(bmiValue);
    }
  };

  /**
   * Handles BMI calculation for imperial units.
   * Computes BMI using height in feet and inches, and weight in pounds.
   * @param {Event} e - The form submission event.
   */
  const handleComputeLbs = (e) => {
    e.preventDefault();
    const heightInMeters = (parseInt(feet) * 12 + parseInt(inches)) * 0.0254;
    const weightInKg = weight * 0.453592;
    if (heightInMeters > 0 && weight > 0) {
      const bmiValue = (weightInKg / heightInMeters ** 2).toFixed(2);
      setBmi(bmiValue);
    }
  };

  /**
   * Toggles the unit system between metric and imperial.
   * Resets input fields and calculated BMI upon unit change.
   */
  const toggleUnit = () => {
    setUnit(unit === "kg" ? "lbs" : "kg");
    setWeight("");
    setFeet("");
    setHeightCm("");
    setInches("");
    setBmi(null);
  };

  /**
   * Determines the appropriate alert class based on the BMI value.
   * This function assesses the BMI value and assigns an alert class
   * corresponding to different BMI categories, helping to visually
   * categorize the BMI result.
   *
   * @return {string} The alert class as a string. The classes correspond to
   * different alert types, such as 'alert-warning', 'alert-success', and
   * 'alert-error', which can be used to style the BMI result display.
   */
  const alertType = () => {
    let alertClass;
    if (bmi < 18.5) {
      alertClass = "alert-warning";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      alertClass = "alert-success";
    } else if (bmi >= 25 && bmi <= 29.9) {
      alertClass = "alert-warning";
    } else if (bmi >= 30) {
      alertClass = "alert-error";
    }
    return alertClass;
  };

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">BMI Calculator</h2>
          <div className="flex justify-between items-center mb-4">
            <span>Unit: {unit.toUpperCase()}</span>
            <button onClick={toggleUnit} className="btn btn-sm btn-accent">
              Toggle to {unit === "kg" ? "LBS" : "KG"}
            </button>
          </div>
          <form onSubmit={unit === "kg" ? handleComputeKg : handleComputeLbs}>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "kg" ? "Weight in Kg" : "Weight in Lbs"}
              className="input input-bordered w-full max-w-xs rounded-xl mb-3"
            />
            {unit === "kg" ? (
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="Height in cm"
                className="input input-bordered w-full max-w-xs rounded-xl mb-3"
              />
            ) : (
              <div className="flex gap-3">
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  placeholder="Feet"
                  className="input input-bordered w-full max-w-xs rounded-xl mb-3"
                />
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  placeholder="Inches"
                  className="input input-bordered w-full max-w-xs rounded-xl mb-3"
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full">
              Compute
            </button>
          </form>
          {bmi && (
            <div className={`alert ${alertType()} mt-4`}>
              Your BMI is: <strong>{bmi}</strong>
              <p>{getBmiDescription(parseFloat(bmi).toFixed(2))}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
