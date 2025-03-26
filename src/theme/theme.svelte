<script lang="ts">
  import { themeStore } from './themeStore';
  
  let currentTheme = 'light'; // Default theme
  
  // Watch for changes in theme store and update currentTheme
  themeStore.subscribe(theme => {
    currentTheme = theme;
  });

  function switchTheme(theme: string) {
    themeStore.set(theme);
  }
</script>

<div class="theme-selector">
  <button on:click={() => switchTheme('light')} class="theme-button light">Light</button>
  <button on:click={() => switchTheme('dark')} class="theme-button dark">Dark</button>
  <button on:click={() => switchTheme('custom')} class="theme-button custom">Custom</button>
</div>

<style>
  .theme-selector {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }

  .theme-button {
    padding: 0.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .light {
    background-color: #f0f0f0;
    color: #333;
  }

  .dark {
    background-color: #333;
    color: #f0f0f0;
  }

  .custom {
    background-color: #ffcc00;
    color: #fff;
  }
</style>
