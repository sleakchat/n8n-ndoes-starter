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
			baseURL: 'https://api.v1.sleak.chat/api',
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
						name: 'Send Message',
						value: 'sendMessage',
					},
					{
						name: 'Create Conversation',
						value: 'createConversation',
					},
				],
				default: 'sendMessage',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Post',
						value: 'post',
						action: 'Post',
					},
				],
				default: 'post',
			},
			{
				displayName: 'Conversation ID',
				name: 'conversation_id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['sendMessage'],
						operation: ['post'],
					},
				},
				routing: {
					request: {
						method: 'POST',
						url: '/message',
						body: {
							conversation_id: '={{$parameter["conversation_id"]}}',
							message: '={{$parameter["message"]}}',
						},
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['sendMessage'],
						operation: ['post'],
					},
				},
			},
			{
				displayName: 'Chatbot ID',
				name: 'chatbot_id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['createConversation'],
						operation: ['post'],
					},
				},
				routing: {
					request: {
						method: 'POST',
						url: '/conversation',
						body: {
							chatbot_id: '={{$parameter["chatbot_id"]}}',
							name: '={{$parameter["name"]}}',
						},
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['createConversation'],
						operation: ['post'],
					},
				},
			},
		],
	};
}
