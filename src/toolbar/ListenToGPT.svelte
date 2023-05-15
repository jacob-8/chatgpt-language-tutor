<script lang="ts">
  let utterance: SpeechSynthesisUtterance;

  let checkInterval;
  let messages: string[] = [];
  let isSpeaking = false;
  let rate = 60;

  function continuouslyCheckForMessages() {
    checkInterval = setInterval(checkForNewMessage, 100);
  }

  function checkForNewMessage() {
    const messageSections = document.querySelectorAll(".text-base");
    const hasNewMessage = messageSections.length > messages.length;
    if (!hasNewMessage) return console.log("no new messages");

    const lastMessage = messageSections[messageSections.length - 1];
    if (!lastMessage) return;

    const lastMessageContainer = lastMessage.querySelector(
      ".markdown"
    ) as HTMLElement;

    const isStreamingIn =
      lastMessageContainer.classList.contains("result-streaming");
    if (isStreamingIn) return console.log("wait for streaming to finish");

    const lastMessageContent = lastMessageContainer.innerText;
    messages = [...messages, lastMessageContent];
    speek(lastMessageContent);
    stopCheckingForNewMessage();
  }

  function stopCheckingForNewMessage() {
    clearInterval(checkInterval);
  }

  function speek(message: string) {
    utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "zh-TW";
    utterance.rate = rate / 100;
    speechSynthesis.speak(utterance);
    isSpeaking = true;
    utterance.onend = () => {
      isSpeaking = false;
    };
  }

  function stopSpeaking() {
    speechSynthesis.cancel();
    isSpeaking = false;
  }
</script>

<span class="hidden sm:inline">
  Rate:
</span> {rate}%
<input class="mx-2 w-80px" type="range" min="25" max="100" bind:value={rate} />

{#if !isSpeaking && messages.length > 0}
  <button
    on:click={() => speek(messages[messages.length - 1])}
    class="p-3 hover:bg-gray-800"
    ><span class="i-material-symbols-repeat" /></button
  >
{/if}
{#if isSpeaking}
  <button on:click={stopSpeaking} class="p-3 hover:bg-gray-800"
    ><span class="i-ic-baseline-stop text-red text-xl" /></button
  >
{/if}

<slot {continuouslyCheckForMessages} hasMessages={!!messages.length} />
