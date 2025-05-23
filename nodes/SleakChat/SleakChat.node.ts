import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class SleakChat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sleak.chat',
		name: 'sleakChat',
		icon: 'file:sleak_logo.svg',
		group: ['transform'],
		defaultVersion: 1,
		version: [1],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Sleak.chat RAG completions API',
		defaults: {
			name: 'Sleak.chat',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'sleakApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.n8n.sleak.chat',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat Completion',
						value: 'chatCompletions',
					},
				],
				default: 'chatCompletions',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chatCompletions'],
					},
				},
				options: [
					{
						name: 'Post',
						value: 'post',
						action: 'Chat completion',
						description: 'Perform a chat completion',
						routing: {
							request: {
								method: 'POST',
								url: '/chat',
								body: {
									placement: 'n8n',
									chatbot_id: '={{$parameter["chatbot_id"]}}',
									visitor_id: '={{$parameter["visitor_id"]}}',
									message: '={{$parameter["message"]}}',
								},
							},
						},
					},
				],
				default: 'post',
			},
			{
				displayName: 'Chatbot ID',
				name: 'chatbot_id',
				type: 'string',
				required: true,
				default: '',
				description: 'Unique identifier for your agent within Sleak',
				displayOptions: {
					show: {
						resource: ['chatCompletions'],
						operation: ['post'],
					},
				},
			},
			{
				displayName: 'Visitor ID',
				name: 'visitor_id',
				type: 'string',
				required: true,
				default: '',
				description: 'Unique identifier for the visitor',
				displayOptions: {
					show: {
						resource: ['chatCompletions'],
						operation: ['post'],
					},
				},
			},
			{
				displayName: 'Message Body',
				name: 'message',
				type: 'string',
				required: true,
				default: '',
				description: 'Message to send to the agent',
				displayOptions: {
					show: {
						resource: ['chatCompletions'],
						operation: ['post'],
					},
				},
			},
		],
	};
}
