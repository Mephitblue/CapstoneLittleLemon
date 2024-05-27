import { createContext, useState } from "react";

export const Context = createContext();

/* export const OnboardingCompletedProvider = ({ children }) => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  return (
    <OnboardingCompleted.Provider
      value={{ isOnboardingCompleted, setIsOnboardingCompleted }}
    >
      {children}
    </OnboardingCompleted.Provider>
  ); 
};*/
