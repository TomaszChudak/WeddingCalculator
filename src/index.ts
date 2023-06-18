import { PriceCalculator } from "./price-calculator";
import { ServiceRecuder } from "./service-reducer";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => (
    ServiceRecuder.reduceSelectedServices(previouslySelectedServices, action)
)

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => (
    { basePrice: PriceCalculator.calculateBasePrice(selectedServices, selectedYear), 
      finalPrice: PriceCalculator.calculateFinalPrice(selectedServices, selectedYear) }
);