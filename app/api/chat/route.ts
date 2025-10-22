    // 👇 Updated to new endpoint structure (AgentBuilder 2025)
    const runResponse = await fetch(
      `https://api.openai.com/v1/agent/workflows/${workflowId}/runs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          input: { message },
        }),
      }
    );
