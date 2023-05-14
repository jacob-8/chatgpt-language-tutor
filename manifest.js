import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "ChatGPT Language Tutor",
  description: "Learn a language using ChatGPT",
  version: "1.0.0",
  action: { 
    default_popup: "popup.html",
    default_icon: {
      16: "icon16.png",
      48: "icon48.png",
      128: "icon128.png"
    }
  },
  icons: {
    16: "icon16.png",
    48: "icon48.png",
    128: "icon128.png"
  },

  // "permissions": [ "activeTab", "storage" ],
  // "host_permissions": [
  //   "https://chat.openai.com/chat/*"
  // ],

  permissions: ["activeTab", "scripting"], // for downloading conversation
  // "commands": {
  //   "save_conversation": {
  //     "suggested_key": {
  //       "default": "Alt+Shift+S"
  //     },
  //     "description": "Save ChatGPT Conversation"
  //   }
  // }

  // background: {
  //   service_worker: 'src/background.js',
  //   type: 'module',
  // },
  // options_page: 'src/index.html',

  content_scripts: [{ js: ["src/content.js"], 
  matches: ["https://chat.openai.com/*"] }],
});