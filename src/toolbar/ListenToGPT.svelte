<script lang="ts">
  let checkInterval;

  let receivedMessages = [];

  function continuouslyCheckForMessages() {
    checkInterval = setInterval(checkForNewMessage, 100);
  }

  function checkForNewMessage() {
    const messages = document.querySelectorAll(".text-base");
    const hasNewMessage = messages.length > receivedMessages.length;
    if (!hasNewMessage) return console.log("no new messages");

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return console.log("no text yet");

    const lastMessageContainer = lastMessage.querySelector(
      ".markdown"
    ) as HTMLElement;

    const isStreamingIn =
      lastMessageContainer.classList.contains("result-streaming");
    if (isStreamingIn) return console.log("wait for streaming to finish");

    const lastMessageContent = lastMessageContainer.innerText;
    speekLatestMessage(lastMessageContent);
    stopCheckingForNewMessage();
  }

  function stopCheckingForNewMessage() {
    clearInterval(checkInterval);
  }

  function speekLatestMessage(message: string) {
    receivedMessages = [...receivedMessages, message];
    console.log({ message });
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "zh-TW";
    utterance.rate = 0.6;
    speechSynthesis.speak(utterance);
  }
</script>

<button on:click={continuouslyCheckForMessages} class="p-3 hover:bg-gray-800"
  >Check</button
>

<slot {continuouslyCheckForMessages} />
