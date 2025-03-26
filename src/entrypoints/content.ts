// content.ts
export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    console.log("Date content script loaded");
  },
});
