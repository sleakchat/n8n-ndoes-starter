![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-sleakchat

This is an [n8n](https://n8n.io/) community node for [Sleak.chat](https://sleak.chat), enabling AI-powered chat completions through their RAG API.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Chat Completion

The Chat Completion operation allows you to interact with Sleak.chat's AI agents.

#### Parameters

- **Chatbot ID** (required): Unique identifier for your agent within Sleak
- **Visitor ID** (required): Unique identifier for the visitor
- **Message body** (required): The message to send to the agent

## Credentials

The node requires Sleak.chat API credentials to function. You can obtain these from your Sleak.chat dashboard.

## Example Usage

Here's an example of how to use the Chat Completion operation:

1. Add the SleakChat node to your workflow
2. Configure your Sleak.chat API credentials
3. Set the operation to "Chat Completion"
4. Fill in the required parameters:
   - Agent ID: Your Sleak agent's ID
   - Visitor ID: A unique identifier for the visitor
   - Message body: The message you want to send

## Resources

- [Sleak.chat Documentation](https://docs.sleak.chat)
- [n8n Documentation](https://docs.n8n.io)

## License

[MIT](LICENSE.md)
