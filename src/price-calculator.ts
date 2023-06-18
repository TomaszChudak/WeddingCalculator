import { ServiceType, ServiceYear } from ".";
import { promotionWeddingPrices, weddingPrices } from "./prices-and-promotions";
import { ServiceRecuder } from "./service-reducer";

export abstract class PriceCalculator {
    public static addPrices = (prices: number[]) => (
        prices.reduce((acc, p) => acc + p, 0)
    );

    public static calculateFinalPrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => (
        PriceCalculator.addPrices(
            ServiceRecuder.trimSelectedServices(selectedServices)
                .map(serv => Math.min(...[
                    PriceCalculator.calculateServiceBasePrice(serv, selectedYear), 
                    ...promotionWeddingPrices
                        .filter(promo => promo.canApplyPromotion(serv, selectedYear, selectedServices))
                        .map(promo => promo.getPrice(serv, selectedYear, selectedServices))
                ]))
        )
    );

    public static calculateBasePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => (
        PriceCalculator.addPrices(
            ServiceRecuder.trimSelectedServices(selectedServices)
                .map(serv => PriceCalculator.calculateServiceBasePrice(serv, selectedYear))        
        )
    );

    public static calculateServiceBasePrice = (selectedType: ServiceType, selectedYear: ServiceYear) => (
        weddingPrices
            .find(price => price.canApplyPrice(selectedType, selectedYear))
            .price
    );
}