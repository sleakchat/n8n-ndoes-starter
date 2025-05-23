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
					// {
					// 	name: 'Ticketing',
					// 	value: 'ticketing',
					// },
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
									body: '={{$parameter["body"]}}',
								},
							},
						},
					},
				],
				default: 'post',
			},
			{
				displayName: 'Chatbot ID', // The value the user sees in the UI
				name: 'chatbot_id', // The name used to reference the element UI within the code
				type: 'string',
				required: true, // Whether the field is required or not
				default: '',
				description: 'Unique identifier for your agent within Sleak',
				displayOptions: {
					// the resources and operations to display this element with
					show: {
						resource: ['chatCompletions'],
						operation: ['post'],
					},
				},
			},
			{
				displayName: 'Visitor ID', // The value the user sees in the UI
				name: 'visitor_id', // The name used to reference the element UI within the code
				type: 'string',
				required: true, // Whether the field is required or not
				default: '',
				description: 'Unique identifier for the visitor',
				displayOptions: {
					// the resources and operations to display this element with
					show: {
						resource: ['chatCompletions'],
						operation: ['post'],
					},
				},
			},
			{
				displayName: 'Message body', // The value the user sees in the UI
				name: 'body', // The name used to reference the element UI within the code
				type: 'string',
				required: true, // Whether the field is required or not
				default: '',
				description: 'Message to send to the agent',
				displayOptions: {
					// the resources and operations to display this element with
					show: {
						resource: ['chatCompletions'],
						operation: ['post'],
					},
				},
			},
			// {
			// 	displayName: 'Additional Fields',
			// 	name: 'additionalFields',
			// 	type: 'collection',
			// 	default: {},
			// 	placeholder: 'Add Field',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['chatCompletions'],
			// 			operation: ['post'],
			// 		},
			// 	},
			// 	options: [
			// 		{
			// 			displayName: 'Date',
			// 			name: 'apodDate',
			// 			type: 'dateTime',
			// 			default: '',
			// 			routing: {
			// 				request: {
			// 					// You've already set up the URL. qs appends the value of the field as a query string
			// 					qs: {
			// 						date: '={{ new Date($value).toISOString().substr(0,10) }}',
			// 					},
			// 				},
			// 			},
			// 		},
			// 	],
			// },
		],
	};
}
