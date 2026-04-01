import { Injectable } from "@nestjs/common";

@Injectable()
export class ServicesService {
  getAll() {
    return [
      { id: "guided-chat", title: "Guided Discovery Chat" },
      { id: "prompt-guide", title: "Prompt Engineering Guide" },
      { id: "agent-builder", title: "Agent Builder" },
      { id: "pricing-clarity", title: "Flexible Pricing" },
    ];
  }
}
