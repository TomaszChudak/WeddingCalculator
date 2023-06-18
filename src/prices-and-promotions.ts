import { ServicePrice } from "./service-price";
import { DiscountPromotionServicePrice, PairPromotionServicePrice, PromotionServicePrice } from "./promotion-service-price";

export const weddingPrices: ServicePrice[] = [
    new ServicePrice(2020, "Photography", 1700),
    new ServicePrice(2020, "VideoRecording", 1700),
    new ServicePrice(2021, "Photography", 1800),
    new ServicePrice(2021, "VideoRecording", 1800),
    new ServicePrice(2022, "Photography", 1900),
    new ServicePrice(2022, "VideoRecording", 1900),
    new ServicePrice(null, "BlurayPackage", 300),
    new ServicePrice(null, "TwoDayEvent", 400),
    new ServicePrice(null, "WeddingSession", 600),
];

export const promotionWeddingPrices: PromotionServicePrice[] = [
    new PairPromotionServicePrice(2020, "Photography", "VideoRecording", 2200),
    new PairPromotionServicePrice(2021, "Photography", "VideoRecording", 2300),
    new PairPromotionServicePrice(2022, "Photography", "VideoRecording", 2500),
    new DiscountPromotionServicePrice(null, "WeddingSession", "Photography", 300),
    new DiscountPromotionServicePrice(null, "WeddingSession", "VideoRecording", 300),
    new DiscountPromotionServicePrice(2022, "WeddingSession", "Photography", 0),
];