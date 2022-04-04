export type DetractorNames =
  "no_current_pool" |
  "no_room_for_grass" |
  "needs_floor_replaced" |
  "needs_kitchen_replaced" |
  "needs_master_bathroom_replaced" |
  "no_gas_stove" |
  "closed_floor_plan" |
  "small_kitchen" |
  "small_master_bath" |
  "no_garage" |
  "small_garage" |
  "low_storage" |
  "needs_drywalls_replaced" |
  "has_textured_walls" |
  "small_yard" |
  "old_house" |
  "old_roof";

export type House = {
  name: string;
  detractors: Record<DetractorNames, number>,
  calculated?: {
    percent: number;
  }
};

export type Detractor = {
  description: string;
  low: number;
  high: number;
}

export const detractorsMap: Record<DetractorNames, Detractor> = {
  no_current_pool: { description: "No pool currently (but possible)", low: 13, high: 21 },
  no_room_for_grass: { description: "No room for grass in yard w/pool", low: 21, high: 34 },
  needs_floor_replaced: { description: "Needs flooring replaced", low: 3, high: 5 },
  needs_kitchen_replaced: { description: "Needs new kitchen", low: 5, high: 8 },
  needs_master_bathroom_replaced: { description: "Needs new master bath", low: 5, high: 8 },
  no_gas_stove: { description: "No gas stove", low: 1, high: 3 },
  closed_floor_plan: { description: "Closed floor plan", low: 3, high: 5 },
  small_kitchen: { description: "Small kitchen", low: 8, high: 13 },
  small_master_bath: { description: "small master bath", low: 8, high: 13 },
  no_garage: { description: "No garage", low: 8, high: 13 },
  small_garage: { description: "Small garage", low: 3, high: 5 },
  low_storage: { description: "Not a lot of storage", low: 5, high: 8 },
  needs_drywalls_replaced: { description: "Drywall replacement", low: 5, high: 5 },
  has_textured_walls: { description: "Textured walls", low: 3, high: 5 },
  small_yard: { description: "Small yard", low: 13, high: 21 },
  old_house: { description: "Older house", low: 8, high: 13 },
  old_roof: { description: "Old roof", low: 13, high: 21 },
};