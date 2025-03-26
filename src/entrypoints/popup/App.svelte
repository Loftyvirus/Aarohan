<script lang="ts">
import NepaliDate from 'nepali-datetime'
  import { fade } from 'svelte/transition';

  let currentTime = new Date();
  let showNepaliDate = false;

  // Time
  let hours = '00';
  let minutes = '00';

  // Date formats
  let englishDate = '';
  let nepaliDate = '';

  function updateDateTime() {
    currentTime = new Date();
    
    // Update time
    hours = currentTime.getHours().toString().padStart(2, '0');
    minutes = currentTime.getMinutes().toString().padStart(2, '0');
    
    // English date
    englishDate = currentTime.toLocaleDateString('en', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    // Nepali date using nepali-datetime
    const nd = new NepaliDate(currentTime);
    nepaliDate = nd.format('YYYY/MM/DD');
  }

  function toggleDate() {
    showNepaliDate = !showNepaliDate;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDate();
    }
  }

  onMount(() => {
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  });
</script>

<div class="datetime-widget">
  <div class="time" transition:fade>
    {hours}:{minutes}
  </div>
  
  <button
    class="date-toggle"
    on:click={toggleDate}
    on:keydown={handleKeyDown}
    aria-label="Toggle between English and Nepali date format"
  >
    {#if showNepaliDate}
      <span class="nepali-date">{nepaliDate}</span>
    {:else}
      {englishDate}
    {/if}
  </button>
</div>

<style>
  .datetime-widget {
    font-family: 'Inter', system-ui, sans-serif;
    background: rgba(255, 255, 255, 0.95);
    padding: 1rem;
    border-radius: 8px;
    width: 140px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .time {
    font-size: 1.8rem;
    font-weight: 300;
    color: #222;
    margin-bottom: 0.25rem;
    letter-spacing: -0.5px;
  }

  .date-toggle {
    font-size: 0.85rem;
    color: #555;
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    font-family: inherit;
  }

  .date-toggle:hover,
  .date-toggle:focus {
    color: #000;
    background: rgba(0, 0, 0, 0.03);
    outline: none;
  }

  .nepali-date {
    font-family: 'Noto Sans Devanagari', sans-serif;
    font-weight: 500;
  }
</style>