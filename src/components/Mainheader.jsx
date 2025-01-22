import React, { useState } from "react";

const steps = [
  {
    label: "Project\nInformation",
    icon: () => (
      <img
        src={"/images/Group-15.png" || "/placeholder.svg"}
        alt="Project Info"
        className="w-10 h-10"
      />
    ),
  },
  {
    label: "Asset\nPackage",
    icon: () => (
      <img
        src={"/images/Group-16.png" || "/placeholder.svg"}
        alt="Asset Package"
        className="w-10 h-10"
      />
    ),
  },
  {
    label: "Project\nProposal",
    icon: () => (
      <img
        src={"/images/Group-17.png" || "/placeholder.svg"}
        alt="Project Proposal"
        className="w-10 h-10"
      />
    ),
  },
  {
    label: "Invite\nInvestors",
    icon: () => (
      <img
        src={"/images/Group-18.png" || "/placeholder.svg"}
        alt="Invite Investors"
        className="w-10 h-10"
      />
    ),
  },
  {
    label: "EARN\nNFTs",
    icon: () => (
      <img
        src={"/images/Group-19.png" || "/placeholder.svg"}
        alt="EARN NFTs"
        className="w-10 h-10"
      />
    ),
  },
  {
    label: "Investor\nActions",
    icon: () => (
      <img
        src={"/images/Group-20.png" || "/placeholder.svg"}
        alt="Investor Actions"
        className="w-10 h-10"
      />
    ),
  },
  {
    label: "Project\nOpr Live",
    icon: () => (
      <img
        src={"/images/Group-21.png" || "/placeholder.svg"}
        alt="Project Opr Live"
        className="w-10 h-10"
      />
    ),
  },
];

const Mainheader = () => {
  // Move useState into the component
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (index) => {
    setCurrentStep(index + 1);
  };

  return (
    <div>
      <div className="w-full p-3 bg-[#4a4a4a] rounded-sm">
        <div className="relative max-w-[900px] mx-auto">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-5 left-12 w-[90%] h-[3px] bg-white/20" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center cursor-pointer"
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors border-2
                            ${
                              index === currentStep - 1
                                ? "bg-gray-800 "
                                : "bg-gray-600 border-gray-400"
                            }`}
                  >
                    <Icon />
                  </div>
                  <p
                    className={`text-center text-sm whitespace-pre-line max-w-[80px]
                            ${
                              index === currentStep - 1
                                ? "text-[#21fc0d]"
                                : "text-gray-300"
                            }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainheader;

