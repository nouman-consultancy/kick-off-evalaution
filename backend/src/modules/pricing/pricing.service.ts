import { Injectable } from "@nestjs/common";

@Injectable()
export class PricingService {
  getAll() {
    return [
      { id: "starter", name: "Starter", price: 29 },
      { id: "growth", name: "Growth", price: 99 },
      { id: "enterprise", name: "Enterprise", price: null },
    ];
  }
}
