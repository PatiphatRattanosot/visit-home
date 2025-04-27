import { create } from "zustand";
import { persist } from "zustand/middleware";

export const studentStatus = create(
  persist((set) => ({
    selfInfoStatus: false,
    relationStatus: false,
    familyStatus: false,
    behaviorStatus: false,
    setSelfInfoStatus: (status) => set({ selfInfoStatus: status }),
    setRelationStatus: (status) => set({ relationStatus: status }),
    setFamilyStatus: (status) => set({ familyStatus: status }),
    setBehaviorStatus: (status) => set({ behaviorStatus: status }),
  }))
);
