import React, { useState } from "react";

interface Injury {
  id: number;
  part: string;
  description: string;
  gender: string;
}

const InjuryTracker: React.FC = () => {
  const [injuries, setInjuries] = useState<Injury[]>([]);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBodyPartClick = (part: string) => {
    setSelectedPart(part);
  };

  const simulateBackendSubmission = async (injury: Injury) => {
    try {
      const response = await fetch("https://example.com/api/injuries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(injury),
      });

      if (!response.ok) {
        throw new Error("Failed to submit injury");
      }

      console.log("Successfully submitted to simulated backend!");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPart || !currentDescription || !selectedGender) {
      alert("Please complete all fields.");
      return;
    }

    const newInjury: Injury = {
      id: Date.now(),
      part: selectedPart,
      description: currentDescription,
      gender: selectedGender,
    };

    setIsSubmitting(true);
    await simulateBackendSubmission(newInjury);
    setInjuries((prev) => [...prev, newInjury]);
    setIsSubmitting(false);

    // Reset form
    setSelectedPart(null);
    setCurrentDescription("");
    setSelectedGender("");
  };

  return (
    <div className="flex p-4 min-h-screen">
      {/* Left Side */}
      <div className="w-[70vw] pr-6">
        <h1 className="text-2xl font-bold mb-6">Injury Tracker</h1>
        <p className="mb-4 text-white text-opacity-90">
          Click on any body part on the photo on the right to select it, wherever you're injured, describe the injury in detail, choose a gender, and hit submit!
        </p>

        <div className="mb-6 flex flex-col items-start gap-5">
          <p className="mb-2 font-italic text-xl font-bold text-blue-300">
            Selected Part: {selectedPart ?? "None"}
          </p>

          <input
            type="text"
            placeholder="Describe the injury in detail"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            className="border p-2 w-full max-w-xl bg-white/90 text-black"
          />

          <select
            className="border p-2 mt-2 bg-white/90 text-black"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 ml-2 mt-2 rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-300 text-white hover:bg-blue-400"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Tracked Injuries */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-white">Tracked Injuries</h2>
          {injuries.length === 0 ? (
            <p className="text-gray-400">No injuries tracked yet.</p>
          ) : (
            <ul>
              {injuries.map((injury) => (
                <li key={injury.id} className="border p-2 mt-2 bg-white/80 text-black rounded">
                  <b>Body Part:</b> {injury.part} | <b>Description:</b> {injury.description} | <b>Gender:</b> {injury.gender}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Side (Image + SVG) */}
      <div className="w-[30%] flex items-center justify-center relative mr-4">
        <div className="relative h-[420px] w-[150px]">
          <img
            className="relative z-0"
            src="/body-diagram.png"
            alt="Body Diagram"
          />
          <svg
            viewBox="0 0 150 420"
            className="absolute top-0 left-0 w-[150px] h-[420px] z-10"
          >
            <rect x="0" y="0" width="150" height="420" fill="transparent" onClick={() => setSelectedPart(null)} />
            <circle cx="75" cy="30" r="30" fill="transparent" onClick={() => handleBodyPartClick("Head")} />
            <rect x="60" y="57" width="28" height="18" fill="transparent" onClick={() => handleBodyPartClick("Neck")} />
            <rect x="40" y="75" width="70" height="70" fill="transparent" onClick={() => handleBodyPartClick("Chest")} />
            <rect x="13" y="95" width="22" height="75" fill="transparent" transform="rotate(10, 130, 150)" onClick={() => handleBodyPartClick("Right Arm")} />
            <rect x="15" y="170" width="19" height="48" fill="transparent" transform="rotate(10, 130, 150)" onClick={() => handleBodyPartClick("Right Forearm")} /> 
            <rect x="117" y="78" width="22" height="75" fill="transparent" transform="rotate(350, 130, 150)" onClick={() => handleBodyPartClick("Left Arm")} />
            <rect x="116" y="153" width="19" height="48" fill="transparent" transform="rotate(350, 130, 150)" onClick={() => handleBodyPartClick("Left Forearm")} /> 
            <rect x="19" y="218" width="15" height="40" fill="transparent" transform="rotate(10, 130, 150)" onClick={() => handleBodyPartClick("Right hand")} /> 
            <rect x="141" y="199" width="15" height="40" fill="transparent" transform="rotate(10, 130, 150)" onClick={() => handleBodyPartClick("Left hand")} /> 
            
            <rect x="40" y="145" width="70" height="60" fill="transparent" onClick={() => handleBodyPartClick("Stomach")} />
            <rect x="35" y="205" width="80" height="35" fill="transparent" onClick={() => handleBodyPartClick("Abdomen")} />
            
            <polygon points="35,240 77,240 68,295 45,295" fill="transparent" transform="rotate(2, 130, 150)" onClick={() => handleBodyPartClick("Right Thigh")} />
<polygon points="73,235 116,235 105,295 83,295" fill="transparent" transform="rotate(359, 130, 150)" onClick={() => handleBodyPartClick("Left Thigh")} />
{/* <rect x="45" y="295" width="23" height="90" fill="blue" transform="rotate(2, 130, 150)" onClick={() => handleBodyPartClick("Right Leg")} />
<rect x="45" y="395" width="25" height="10" fill="green" transform="rotate(2, 130, 150)" onClick={() => handleBodyPartClick("Right Toe")} /> */}
<polygon points="45,295 70,295 68,380 50,380" fill="transparent" transform="rotate(2, 130, 150)" onClick={() => handleBodyPartClick("Right Leg")} />
<polygon points="50,380 70,380 72,413 43,413" fill="transparent" transform="rotate(2, 130, 150)" onClick={() => handleBodyPartClick("Right Toe")} />

{/* <rect x="73" y="295" width="35" height="60" fill="transparent" transform="rotate(359, 130, 150)" onClick={() => handleBodyPartClick("Left Leg")} />
<rect x="73" y="355" width="35" height="40" fill="transparent" transform="rotate(359, 130, 150)" onClick={() => handleBodyPartClick("Left Toe")} /> */}
<polygon points="84,295 112,295 100,380 86,380" fill="transparent" transform="rotate(359, 130, 150)" onClick={() => handleBodyPartClick("Left Leg")} />
<polygon points="85,380 100,380 108,413 82,407" fill="transparent" transform="rotate(359, 130, 150)" onClick={() => handleBodyPartClick("Left Toe")} />


          </svg>
        </div>
      </div>
    </div>
  );
};

export default InjuryTracker;
