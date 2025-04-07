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
            src="../public/Screenshot 2025-04-05 at 1.48.29 AM.png"
            alt="Body Diagram"
          />
          <svg
            viewBox="0 0 150 420"
            className="absolute top-0 left-0 w-[150px] h-[420px] z-10"
          >
            <circle cx="75" cy="30" r="30" fill="red" onClick={() => handleBodyPartClick("Head")} />
            <rect x="60" y="57" width="28" height="18" fill="blue" onClick={() => handleBodyPartClick("Neck")} />
            <rect x="40" y="75" width="70" height="70" fill="green" onClick={() => handleBodyPartClick("Chest")} />
            <rect x="10" y="100" width="25" height="160" fill="blue" transform="rotate(10, 130, 150)" onClick={() => handleBodyPartClick("Right Hand")} />
            <rect x="115" y="80" width="25" height="160" fill="blue" transform="rotate(-10, 130, 150)" onClick={() => handleBodyPartClick("Left Hand")} />
            <rect x="40" y="145" width="70" height="60" fill="yellow" onClick={() => handleBodyPartClick("Stomach")} />
            <rect x="35" y="205" width="80" height="35" fill="grey" onClick={() => handleBodyPartClick("Abdomen")} />
            <rect x="40" y="235" width="35" height="160" fill="blue" transform="rotate(2, 130, 150)" onClick={() => handleBodyPartClick("Right Leg")} />
            <rect x="73" y="235" width="35" height="160" fill="blue" transform="rotate(359, 130, 150)" onClick={() => handleBodyPartClick("Left Leg")} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InjuryTracker;
