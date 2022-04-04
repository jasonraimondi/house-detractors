<script lang="ts">
  import "normalize.css/normalize.css";
  import "../style/style.css";

  import Percent from "../lib/Percent.svelte";
  import type { DetractorNames, House } from "../lib/map";
  import { detractorsMap } from "../lib/map";

  const sum = (a: number, b: number) => a + b;
  const toPercent = (a: number): number => 100 - a * 100;

  const controlHigh = Object.values(detractorsMap)
    .map((m) => 10 * m.high)
    .reduce(sum);
  const controlLow = Object.values(detractorsMap)
    .map((m) => 10 * m.low)
    .reduce(sum);

  let newHouse = {
    name: "New House",
    detractors: {
      no_current_pool: 0,
      no_room_for_grass: 0,
      needs_floor_replaced: 0,
      needs_kitchen_replaced: 0,
      needs_master_bathroom_replaced: 0,
      no_gas_stove: 0,
      closed_floor_plan: 0,
      small_kitchen: 0,
      small_master_bath: 0,
      no_garage: 0,
      small_garage: 0,
      low_storage: 0,
      needs_drywalls_replaced: 0,
      has_textured_walls: 0,
      small_yard: 0,
      old_house: 0,
      old_roof: 0,
    },
  };

  let houses: House[] = [
    {
      name: "The Big Pool",
      detractors: {
        no_current_pool: 0,
        no_room_for_grass: 7,
        needs_floor_replaced: 10,
        needs_kitchen_replaced: 3,
        needs_master_bathroom_replaced: 8,
        no_gas_stove: 9,
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
    houses = houses.map((h) => {
      let lowTotal = 0;
      let highTotal = 0;

      for (const detractorName of Object.keys(h.detractors) as DetractorNames[]) {
        lowTotal += h.detractors[detractorName] * detractorsMap[detractorName].low;
        highTotal += h.detractors[detractorName] * detractorsMap[detractorName].high;
      }

      const low = lowTotal / controlHigh;
      const high = highTotal / controlHigh;
      console.log(low, high);

      h.calculated = {
        percent: toPercent((high + low) / 2),
      };

      return h;
    });
  }

  function addHome() {
    houses.push(newHouse);
    houses = houses;
  }
</script>

<ul>
  {#each Object.values(detractorsMap) as detractor}
    <li>{detractor.description}: {detractor.low}, {detractor.high}</li>
  {/each}
</ul>

{#each houses as home}
  <div class="home">
    <p><strong class="home-title">{home.name}:</strong></p>
    <p><span class="home-percent">Match: <Percent percent={home.calculated.percent} /></span></p>

    {#each Object.keys(home.detractors) as detractorName}
      <label>
        <span>{detractorsMap[detractorName].description}:</span>
        <input type="number" max="10" min="0" bind:value={home.detractors[detractorName]} />
      </label>
    {/each}
  </div>
{/each}

<div>
  <button on:click={addHome}>Add Home</button>
</div>

<div>
  <pre><code
      >{JSON.stringify(
        houses.map(({ calculated, ...h }) => h),
        null,
        2,
      )}</code
    ></pre>
</div>

<style>
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
</style>
