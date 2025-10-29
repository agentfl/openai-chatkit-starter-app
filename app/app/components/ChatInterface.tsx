"use client";

import { ChatKit } from "@openai/chatkit-react";

export default function ChatInterface() {
  return (
    <div
      style={{
        background: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChatKit
        config={{
          workflow: process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID!,
        }}
        style={{
          width: "80vw",
          height: "80vh",
          borderRadius: "0",
          backgroundColor: "white",
          boxShadow: "none",
        }}
      />
    </div>
  );
}
