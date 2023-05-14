<script lang="ts">
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
    const forms = document.querySelectorAll("form");
    let textValue = forms[0].querySelectorAll("textarea")[0].value;
    forms[0].querySelectorAll("textarea")[0].value = textValue + `${message} `;
    forms[0].querySelectorAll("textarea")[0].focus();
  }
</script>

<div class="bg-black w-full flex items-center h-50px pl-2">
  Talk w/ GPT
  <div class="mr-auto" />
  <button on:click={listen} class="p-3 hover:bg-gray-900">
    <span
      class:text-red={!listening}
      class:text-green={listening}
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
