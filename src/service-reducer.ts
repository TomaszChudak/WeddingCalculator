import { ServiceType } from ".";

export abstract class ServiceRecuder {
    public static reduceSelectedServices = (previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType }) => (
        ServiceRecuder.trimSelectedServices(
            (() => {
                switch(action.type) {
                    case "Select" : return previouslySelectedServices.includes(action.service)
                                        ? previouslySelectedServices
                                        : [...previouslySelectedServices, action.service];
                    case "Deselect" : return previouslySelectedServices.filter((v) => v !== action.service);
                }
            })()
        )
    );

    public static trimSelectedServices = (selectedServices: ServiceType[]) => {
        if(!selectedServices.includes("VideoRecording")){
            selectedServices = selectedServices.filter((v) => v !== "BlurayPackage");
        }
        if(!selectedServices.includes("Photography") && !selectedServices.includes("VideoRecording")){
            selectedServices = selectedServices.filter((v) => v !== "TwoDayEvent");
        }
        return selectedServices;
    };
}