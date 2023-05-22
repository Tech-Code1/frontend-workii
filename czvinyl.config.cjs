const czvinylConfig = {
	headerFormat: '{type}: **[{ticket_id}]** {emoji} {subject}',
	skipTicketId: false,
	skipBody: true,
	subjectMaxLength: 140,
	subjectMinLength: 3,
	scopes: [],
	allowEmptyTicketIdForBranches: [],
	ticketIdQuestion: 'Standard ID commit Workii project (ex. W-12):',
	commitTypes: [
		{
			description: 'A new feature',
			emoji: '🔥',
			value: 'feat'
		},
		{
			description: 'A bug fix',
			emoji: '🐞',
			value: 'fix'
		},
		{
			description: 'A code change that neither fixes a bug or adds a feature',
			emoji: '💡',
			value: 'refactor'
		},
		{
			description: 'Build process or auxiliary tool changes',
			emoji: '🤖',
			value: 'chore'
		},
		{
			description: 'Documentation only changes',
			emoji: '📘',
			value: 'docs'
		},
		{
			description: 'Markup, white-space, formatting, missing semi-colons...',
			emoji: '🎨',
			value: 'style'
		},
		{
			description: 'A code change that improves performance',
			emoji: '⚡',
			value: 'perf'
		},
		{
			description: 'Adding missing tests or correcting existing tests',
			emoji: '✅',
			value: 'test'
		},
		{
			description: 'CI related changes',
			emoji: '🚀',
			value: 'ci'
		},
		{
			description: 'Create a release commit',
			emoji: '🔖',
			value: 'release'
		}
	]
};

function getEmojiForType(type) {
	switch (type) {
		case 'feat':
			return '🔥';
		case 'fix':
			return '🐞';
		case 'refactor':
			return '💡';
		case 'chore':
			return '🤖';
		case 'docs':
			return '📘';
		case 'style':
			return '🎨';
		case 'perf':
			return '⚡';
		case 'test':
			return '✅';
		case 'ci':
			return '🚀';
		case 'release':
			return '🔖';
		default:
			return '';
	}
}

module.exports = czvinylConfig;

/* [
	{
		description: 'A new feature',
		emoji: '🔥',
		value: 'feat'
	},
	{
		description: 'A bug fix',
		emoji: '🐞',
		value: 'fix'
	},
	{
		description: 'A code change that neither fixes a bug or adds a feature',
		emoji: '💡',
		value: 'refactor'
	},
	{
		description: 'Build process or auxiliary tool changes',
		emoji: '🤖',
		value: 'chore'
	},
	{
		description: 'Documentation only changes',
		emoji: '📘',
		value: 'docs'
	},
	{
		description: 'Markup, white-space, formatting, missing semi-colons...',
		emoji: '🎨',
		value: 'style'
	},
	{
		description: 'A code change that improves performance',
		emoji: '⚡',
		value: 'perf'
	},
	{
		description: 'Adding missing tests or correcting existing tests',
		emoji: '✅',
		value: 'test'
	},
	{
		description: 'CI related changes',
		emoji: '🚀',
		value: 'ci'
	},
	{
		description: 'Create a release commit',
		emoji: '🔖',
		value: 'release'
	}
];
 */
