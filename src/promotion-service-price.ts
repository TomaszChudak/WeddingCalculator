import { ServiceType, ServiceYear } from ".";
import { PriceCalculator } from "./price-calculator";

export abstract class PromotionServicePrice {
    protected readonly year: ServiceYear | null;    

    constructor(year: ServiceYear | null) {
        this.year = year;
    }

    public abstract canApplyPromotion(selectedService: ServiceType, selectedYear: ServiceYear, selectedServices: ServiceType[]): boolean;
    public abstract getPrice(selectedService: ServiceType, selectedYear: ServiceYear, selectedServices: ServiceType[]): number | null;
}

export class PairPromotionServicePrice extends PromotionServicePrice {
    private readonly type1: ServiceType;
    private readonly type2: ServiceType;
    private readonly summaryPrice: number;

    constructor(year: ServiceYear | null, type1: ServiceType, type2: ServiceType, pairPrice: number) {
        super(year);

        this.type1 = type1;
        this.type2 = type2;
        this.summaryPrice = pairPrice;
    }

    public canApplyPromotion = (selectedService: ServiceType, selectedYear: ServiceYear, selectedServices: ServiceType[]) => (
        (this.year === selectedYear || this.year === null) && this.type2 === selectedService && selectedServices.includes(this.type1)
    );

    public getPrice = (selectedService: ServiceType, selectedYear: ServiceYear, selectedServices: ServiceType[]) => (
        this.canApplyPromotion(selectedService, selectedYear, selectedServices)
        ? this.summaryPrice - PriceCalculator.calculateServiceBasePrice(this.type1, this.year)
        : NaN
    );
}

export class DiscountPromotionServicePrice extends PromotionServicePrice {
    private readonly requiredForDiscountType: ServiceType;
    private readonly discountedType: ServiceType;
    private readonly discountedPrice: number;

    constructor(year: ServiceYear | null, discountedType: ServiceType, requiredForDiscountType: ServiceType, discountedPrice: number) {
        super(year)

        this.discountedType = discountedType;
        this.requiredForDiscountType = requiredForDiscountType;
        this.discountedPrice = discountedPrice;
    }
    
    public canApplyPromotion = (selectedService: ServiceType, selectedYear: ServiceYear, selectedServices: ServiceType[]) => (
        (this.year === selectedYear || this.year === null ) && this.discountedType === selectedService && selectedServices.includes(this.requiredForDiscountType)
    );

    public getPrice = (selectedService: ServiceType, selectedYear: ServiceYear,  selectedServices: ServiceType[]) => (
        this.canApplyPromotion(selectedService, selectedYear, selectedServices)
        ? this.discountedPrice
        : NaN
    );
}