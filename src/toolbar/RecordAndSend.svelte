<script lang="ts">
  import { createEventDispatcher } from "svelte";
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
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;
      const isFinal = lastResult.isFinal;
      message += transcript;
      if (isFinal) {
        console.log("result", transcript);
        sendToChatGPT(transcript);
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

  const dispatch = createEventDispatcher<{ sent: boolean }>();

  function sendToChatGPT(message: string) {
    const form = document.querySelectorAll("form")[0];
    const textarea = form.querySelectorAll("textarea")[0];
    textarea.focus();
    textarea.value += `${message} `;
    const parent = textarea.parentElement;
    const submitButton = parent.querySelector("button");
    submitButton.disabled = false;
    submitButton.click();

    dispatch("sent");
  }
</script>

<button
  on:click={() => sendToChatGPT(chineseLanguageConversationPrompt)}
  class="p-3 hover:bg-gray-800"
>
  送給學語言提示
</button>

<button on:click={listen} class="p-3 hover:bg-gray-800">
  <span
    class:text-green={!listening}
    class:text-red={listening}
    class="i-mdi-microphone text-lg"
  />
</button>
