<script lang="ts">
  import NepaliDate from 'nepali-datetime'
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import SunIcon from '../../assets/sun.svg';
  import MoonIcon from '../../assets/moon.svg';
  import "./style.css";


  let currentTime = new Date();
  let showNepaliDate = false;
  let darkMode = false;

  // Time
  let hours = '00';
  let minutes = '00';
  let seconds = '00';
  let ampm = 'AM';

  // Date formats
  let englishDate = '';
  let nepaliDate = '';

  function updateDateTime() {
    currentTime = new Date();
    
    // Update time in 12-hour format
    let hrs = currentTime.getHours();
    ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // Convert 0 to 12
    hours = hrs.toString().padStart(2, '0');
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
    {hours}:{minutes}<span class="seconds">:{seconds}</span> <span class="ampm">{ampm}</span>
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
      <img src={SunIcon} alt="Light mode" width="16" height="16" />
    {:else}
      <img src={MoonIcon} alt="Dark mode" width="16" height="16" />
    {/if}
  </button>
</div>

