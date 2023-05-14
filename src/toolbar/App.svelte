<script lang="ts">
  import { chineseLanguageConversationPrompt } from "./prompts";

  let LANGUAGE = "cmn-Hant-TW";
  let listening = false;
  let message = "";

  function listen() {
    const SpeechRecognition =
      //@ts-ignore
      window.SpeechRecognition || webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = LANGUAGE;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("START", LANGUAGE);
      listening = true;
    };

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1][0].transcript;
      const isFinal = event.results[event.results.length - 1].isFinal;
      message += result;
      if (isFinal) {
        console.log("result", result);
        sendToChatGPT(result);
      }
    };

    recognition.onend = () => {
      recognition.stop();
      console.log("END");
      listening = false;
    };

    recognition.onerror = (event) => {
      console.log(event);
      if (event.error == "not-allowed") {
        alert("請授權麥克風在此頁使用");
      }
    };

    recognition.start();
  }

  function sendToChatGPT(message: string) {
    const form = document.querySelectorAll("form")[0];
    const textarea = form.querySelectorAll("textarea")[0];
    textarea.focus();
    textarea.value += `${message} `;
    const parent = textarea.parentElement;
    const submitButton = parent.querySelector('button');
    submitButton.disabled = false;
    submitButton.click();
  }
</script>

<div class="bg-black w-full flex items-center h-50px pl-2">
  Talk w/ GPT
  <div class="mr-auto" />
  <button on:click={() => sendToChatGPT(chineseLanguageConversationPrompt)} class="p-3 hover:bg-gray-900">
    Send Language Learning Prompt
  </button>
  <button on:click={listen} class="p-3 hover:bg-gray-900">
    <span
      class:text-green={!listening}
      class:text-red={listening}
      class="i-mdi-microphone text-lg"
    />
  </button>
</div>

<style>
  :global(body) {
    --at-apply: flex flex-col;
  }
  :global(#__next) {
    --at-apply: h-[calc(100%-50px)];
  }
</style>
