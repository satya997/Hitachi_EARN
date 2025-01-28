import React, { useState } from "react";
const steps = [
  { label: "Project\nInformation" },
  { label: "Asset\nPackage" },
  { label: "Project\nProposal" },
  { label: "Invite\nInvestors" },
  { label: "Bus/Sell\nEARNNFTs" },
  { label: "Investor\nActions" },
];
const Mainheader = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const handleStepClick = (index) => {
    setCurrentStep(index + 1);
  };
  return (
    <div>
      <div className="w-full p-3 bg-[#4A4A4A] rounded-sm">
        <div className="relative max-w-[900px] mx-auto">
          <div className="relative flex items-center justify-between">
            {/* Line connecting the steps */}
            <div className="absolute top-5 left-12 w-[90%] h-[3px] bg-white/20" />
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center cursor-pointer"
                onClick={() => handleStepClick(index)}
              >
                {/* Step Number */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg font-medium transition-colors
                            ${
                              index === currentStep - 1
                                ? "bg-white text-[#21FC0D]"
                                : "bg-white text-[#595959]"
                            }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                {/* Step Label */}
                <p
                  className={`text-center text-sm whitespace-pre-line max-w-[80px]
                            ${
                              index === currentStep - 1
                                ? "text-[#21FC0D]"
                                : "text-gray-300"
                            }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mainheader;
