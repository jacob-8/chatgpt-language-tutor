# ChatGPT Language Tutor

## Developing

- `pnpm install`
- `pnpm dev`
- Navigate to chat.openai.com
- Add Chrome extension pointed to project `dist` folder
- Edit to see changes update live

Uses https://crxjs.dev/vite-plugin/

## Build

- `pnpm build`
- On desktop you can add the result `dist-prod` folder as a Chrome extension
- On mobile you can install the Kiwi browser then use the resulting `language-tutor-extension.zip` archive

## Features

- Download Conversation
- Records Mandarin and submit to ChatGPT
- Speaks ChatGPT's response back to user
- Adjust rate of speech

## Roadmap

- Integrate [more pleasant voices](https://cloud.google.com/text-to-speech)
- Use WhisperAI instead of Chrome SpeechRecognition for greater accuracy
- Connect to user's known words to then ask ChatGPT to explain the usage of new words found in conversation

## Inspiration

Ideas borrowed from:

- https://github.com/khanwhlee/LazyGPT
- https://github.com/C-Nedelcu/talk-to-chatgpt