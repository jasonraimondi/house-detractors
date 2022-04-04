<script lang="ts">
  import "normalize.css/normalize.css";

  type DetractorNames =
    "no_current_pool" |
    "no_room_for_pool" |
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

  type House = {
    name: string;
    detractors: Record<DetractorNames, number>,
    calculated?: {
      lowTotal: number;
      lowPercent: string;
      highTotal: number;
      highPercent: string;
    }
  };

  type Detractor = {
    description: string;
    low: number;
    high: number;
  }

  const detractorsMap: Record<DetractorNames, Detractor> = {
    no_current_pool: { description: "No pool currently (but possible)", low: 8, high: 13 },
    no_room_for_pool: { description: "No room for grass in yard w/pool", low: 21, high: 21 },
    needs_floor_replaced: { description: "Needs flooring replaced", low: 3, high: 5 },
    needs_kitchen_replaced: { description: "Needs new kitchen", low: 5, high: 8 },
    needs_master_bathroom_replaced: { description: "Needs new master bath", low: 5, high: 8 },
    no_gas_stove: { description: "No gas stove", low: 3, high: 5 },
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
    old_roof: { description: "Old roof", low: 8, high: 8 },
  };

  const sum = (a: number, b: number) => a + b;
  const toPercent = (a: number) => `${(a * 100).toFixed(2)}%`;
  const controlHigh = Object.values(detractorsMap).map(m => 10 * m.high).reduce(sum);

  let houses: House[] = [
    {
      name: "The Big Pool",
      detractors: {
        no_current_pool: 0,
        no_room_for_pool: 5,
        needs_floor_replaced: 10,
        needs_kitchen_replaced: 3,
        needs_master_bathroom_replaced: 8,
        no_gas_stove: 7,
        closed_floor_plan: 3,
        small_kitchen: 1,
        small_master_bath: 10,
        no_garage: 0,
        small_garage: 0,
        low_storage: 3,
        needs_drywalls_replaced: 3,
        has_textured_walls: 8,
        small_yard: 2,
        old_house: 6,
        old_roof: 0,
      },
    },
  ];

  $: {
    houses = houses.map(h => {
      let lowTotal = 0;
      let highTotal = 0;

      for (const detractorName of Object.keys(h.detractors) as DetractorNames[]) {
        lowTotal += h.detractors[detractorName] * detractorsMap[detractorName].low;
        highTotal += h.detractors[detractorName] * detractorsMap[detractorName].high;
      }

      h.calculated = {
        lowTotal: (lowTotal / controlHigh),
        lowPercent: toPercent(lowTotal / controlHigh),
        highTotal: highTotal / controlHigh,
        highPercent: toPercent(highTotal / controlHigh),
      };

      return h;
    });
  }

</script>

{#each houses as home}
    <div class="home">
        <p><strong class="home-title">{home.name}:</strong></p>
        <p><span class="home-percent">{home.calculated.lowPercent} - {home.calculated.highPercent}</span></p>

        {#each Object.keys(home.detractors) as detractorName}
            <label>
                <span>{detractorsMap[detractorName].description}:</span>
                <input type="number" max="10" min="0" bind:value={home.detractors[detractorName]}>
            </label>
        {/each}
    </div>
{/each}

<style>
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 18px;
  }

  .home {
    border: 1px solid tomato;
    width: 500px;
    max-width: 100%;
    padding: 1rem;
  }

  .home label {
    display: flex;
  }

  .home label span {
    flex: 1;
  }

  .home-title {
    font-size: 1.5rem;
  }

  .home-percent {
    font-size: 2rem;
    line-height: 1;
    margin: 0;
  }

  html {
    background: #ccc;
    font-family: ystem-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;;
    font-size: 13px;
    line-height: 1.3;
  }

  body style {
    display: block;
    background: #333;
    color: white;
    white-space: pre;
    padding: 10px;
    font-family: monospace;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

</style>