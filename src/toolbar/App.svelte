<script lang="ts">
  import ListenToGpt from "./ListenToGPT.svelte";
  import RecordAndSend from "./RecordAndSend.svelte";
</script>

<div
  class="bg-gray-900 border-b border-gray w-full flex items-center h-50px pl-2 text-white"
>
  Language Tutor
  <div class="mr-auto" />
  
  <ListenToGpt let:continuouslyCheckForMessages let:hasMessages>
    <RecordAndSend on:sent={continuouslyCheckForMessages} {hasMessages} />
  </ListenToGpt>
</div>

<style>
  :global(body) {
    --at-apply: flex flex-col;
  }
  :global(#__next) {
    --at-apply: "!h-[calc(100%-50px)]";
  }
</style>
