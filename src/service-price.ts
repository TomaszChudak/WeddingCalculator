import { ServiceType, ServiceYear } from ".";
import { weddingPrices } from "./prices-and-promotions";

export class ServicePrice {
    public readonly year: ServiceYear | null;
    public readonly type: ServiceType;
    public readonly price: number;

    constructor(year: ServiceYear | null, type: ServiceType, price: number) {
        this.year = year;
        this.type = type;
        this.price = price;        
    }

    public canApplyPrice = (selectedType: ServiceType, selectedYear: ServiceYear) => (
        selectedType === this.type
        && (this.year === selectedYear
            || (this.year === null && this.isServicePriceForever(this.type) && !this.isServicePriceForYear(this.type, selectedYear)))
    );

    private isServicePriceForYear = (type: ServiceType, year: ServiceYear) => (
        weddingPrices.find(p => p.type === type && p.year === year) !== undefined
    );
    
    private isServicePriceForever = (type: ServiceType) => (
        weddingPrices.find(p => p.type === type && p.year === null) !== undefined
    );
}