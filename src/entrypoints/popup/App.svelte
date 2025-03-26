<script lang="ts">
  import NepaliDate from 'nepali-datetime'
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let currentTime = new Date();
  let showNepaliDate = false;
  let darkMode = false;

  // Time
  let hours = '00';
  let minutes = '00';
  let seconds = '00';

  // Date formats
  let englishDate = '';
  let nepaliDate = '';

  function updateDateTime() {
    currentTime = new Date();
    
    // Update time
    hours = currentTime.getHours().toString().padStart(2, '0');
    minutes = currentTime.getMinutes().toString().padStart(2, '0');
    seconds = currentTime.getSeconds().toString().padStart(2, '0');
    
    // English date
    englishDate = currentTime.toLocaleDateString('en', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    // Nepali date using nepali-datetime
    const nd = new NepaliDate(currentTime);
    nepaliDate = nd.format('YYYY MMMM DD, dddd');
  }

  function toggleDate() {
    showNepaliDate = !showNepaliDate;
  }

  function toggleTheme() {
    darkMode = !darkMode;
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

<div class="datetime-widget" class:dark={darkMode}>
  <div class="time" transition:fade>
    {hours}:{minutes}<span class="seconds">:{seconds}</span>
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

  <button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle dark mode">
    {#if darkMode}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    {/if}
  </button>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

  .datetime-widget {
    font-family: 'Poppins', sans-serif;
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 24px;
    width: 260px;
    height: 220px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    position: relative;
    transition: all 0.3s ease;
  }

  .datetime-widget.dark {
    background: #1a1a1a;
    color: #f0f0f0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .time {
    font-size: 3.2rem;
    font-weight: 300;
    color: #111;
    letter-spacing: -1px;
    margin-top: 0.5rem;
    transition: color 0.3s ease;
  }

  .dark .time {
    color: #f0f0f0;
  }

  .seconds {
    font-size: 1.3rem;
    opacity: 0.7;
    vertical-align: super;
    margin-left: 2px;
    transition: opacity 0.3s ease;
  }

  .dark .seconds {
    opacity: 0.6;
  }

  .date-toggle {
    font-size: 1.05rem;
    color: #444;
    background: rgba(0, 0, 0, 0.03);
    border: none;
    padding: 0.85rem 1.2rem;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    font-family: inherit;
    line-height: 1.4;
    font-weight: 400;
  }

  .dark .date-toggle {
    color: #e0e0e0;
    background: rgba(255, 255, 255, 0.05);
  }

  .date-toggle:hover,
  .date-toggle:focus {
    color: #000;
    background: rgba(0, 0, 0, 0.08);
    outline: none;
    transform: translateY(-1px);
  }

  .dark .date-toggle:hover,
  .dark .date-toggle:focus {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .nepali-date {
    font-family: 'Noto Sans Devanagari', 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.05);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #555;
  }

  .dark .theme-toggle {
    background: rgba(255, 255, 255, 0.1);
    color: #e0e0e0;
  }

  .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }

  .dark .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
  }
</style>