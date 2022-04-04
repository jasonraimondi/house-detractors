<script lang="ts">
  export let percent: number;

  // @see https://stackoverflow.com/a/17267684
  function colorFromPercent(percent, start = 0, end = 120) {
    const a = percent / 100;
    const b = (end - start) * a;
    const c = b + start;

    // Return a CSS HSL string
    return "hsl(" + c + ", 95%, 40%)";
  }
</script>

<span style="color:{colorFromPercent(percent)}">{percent.toFixed(2)}%</span>
