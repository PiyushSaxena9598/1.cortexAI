
import {
    AIMessage,
    HumanMessage,
    SystemMessage
} from "@langchain/core/messages";

import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const chatAgent = async (state) => {
    try {
        await checkAgentLimit(state.userId, "chat");

        const llm = await getModel("chat");

        const history = await getMemory(state.conversationId);

        // Keep only the latest 6 messages
        const recentHistory = Array.isArray(history)
            ? history.slice(-6)
            : [];

        // Limit search context
        let searchContext = "";

        if (state.searchResults) {
            const results = state.searchResults.results || [];

            const limitedResults = results.slice(0, 3).map(item => ({
                title: item.title?.slice(0, 150),
                url: item.url,
                content: item.content?.slice(0, 700)
            }));

            searchContext = `
Web Search Results:

${JSON.stringify({
    query: state.searchResults.query,
    answer: state.searchResults.answer?.slice(0, 1000),
    results: limitedResults
})}

Use these search results to answer the user.
Do not mention internal tools.
`;
        }

        const systemPrompt = `
You are CortexAI, an intelligent AI assistant.

${searchContext}

Rules:
- For simple questions, greetings, and short queries, respond naturally.
- For technical, educational, coding, or detailed topics, use clean Markdown.
- Use search results when provided.
- Do not invent facts that are not supported by the search results.
- Never generate unnecessarily long responses.
- Keep paragraphs short and readable.
`;

        const messages = [
            new SystemMessage(systemPrompt)
        ];

        recentHistory.forEach(msg => {
            if (msg.role === "user") {
                messages.push(new HumanMessage(msg.content));
            } else if (msg.role === "assistant") {
                messages.push(new AIMessage(msg.content));
            }
        });

        messages.push(new HumanMessage(state.prompt));

        const response = await llm.invoke(messages);

        await deductCredits(state.userId, "chat");

        return {
            ...state,
            aiResponse: response.content
        };

    } catch (error) {
        console.error("Chat Agent Error:", error);

        return {
            ...state,
            aiResponse:
                error?.response?.data?.message ||
                error?.message ||
                "Failed to generate chat"
        };
    }
};
