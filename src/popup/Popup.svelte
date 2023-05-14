<script lang="ts">
  // const getURL = chrome.runtime.getURL ?? ((path: string) => path);

  import { saveChatGPTConversation } from "./saveConversation";

  async function executeContentScript() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: saveChatGPTConversation,
    });
  }
</script>

<div class="w-300px p-3 text-center text-base">

  <h1>Download ChatGPT Conversation</h1>
  
  <button class="bg-gray-100 rounded p-3 mt-2" on:click={executeContentScript}>Save Conversation</button>
</div>
