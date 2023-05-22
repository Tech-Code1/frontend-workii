const commitTypeRegex = /breaking|chore|ci|docs|feat|fix|perf|refactor|release|style|test/;

const commitEmojiRegex =
	/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

const commitTicketIdRegex = /(\[((((?<!([A-Z]{1,10})-?)[A-Z]+-\d+)))\])/;
const commitMessageRegex = /([^\s]+\s)*[^\s]+/;

const commitRegex = new RegExp(
	`^(${commitTypeRegex.source}): (${commitEmojiRegex.source} )?(${commitTicketIdRegex.source} )?(${commitMessageRegex.source})$`
);

module.exports = {
	rules: {
		'header-match-team-pattern': [2, 'always'],
		'explained-emoji-enum': [2, 'always', defaultCommitTypes],
		'body-leading-blank': [2, 'always'],
		'body-max-line-length': [2, 'always', 150],
		'footer-leading-blank': [2, 'always'],
		'footer-max-line-length': [2, 'always', 150],
		'header-max-length': [2, 'always', 150],
		'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'scope-empty': [2, 'always']
	},
	prompt: {
		alias: { fd: 'docs: fix typos' },
		messages: {
			type: "Select the type of change that you're committing:",
			scope: 'Denote the SCOPE of this change (optional):',
			customScope: 'Denote the SCOPE of this change:',
			subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			footerPrefixSelect: 'Select the ISSUES type of changeList by this change (optional):',
			customFooterPrefix: 'Input ISSUES prefix:',
			footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
			generatingByAI: 'Generating your AI commit subject...',
			generatedSelectByAI: 'Select suitable subject by AI generated:',
			confirmCommit: 'Are you sure you want to proceed with the commit above?'
		},
		types: [
			{ value: 'feat', name: 'feat:     🔥  A new feature', emoji: '🔥' },
			{ value: 'fix', name: 'fix:      🐞  A bug fix', emoji: '🐞' },
			{
				value: 'refactor',
				name: 'refactor: 💡   A code change that neither fixes a bug nor adds a feature',
				emoji: '💡'
			},
			{ value: 'chore', name: "chore:    🤖  Other changes that don't modify src or test files", emoji: '🤖' },
			{ value: 'docs', name: 'docs:     📘  Documentation only changes', emoji: '📘' },
			{ value: 'style', name: 'style:    🎨  Changes that do not affect the meaning of the code', emoji: '🎨' },
			{ value: 'perf', name: 'perf:     ⚡️  A code change that improves performance', emoji: '⚡️' },
			{
				value: 'test',
				name: 'test:     ✅  Adding missing tests or correcting existing tests',
				emoji: '✅'
			},
			{ value: 'ci', name: 'ci:       🚀  Changes to our CI configuration files and scripts', emoji: '🚀' },
			{ value: 'release', name: 'release:   🔖  Create a release commit', emoji: '🔖' }
		],
		useEmoji: true,
		emojiAlign: 'center',
		useAI: false,
		aiNumber: 1,
		themeColorCode: '',
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: 'bottom',
		customScopesAlias: 'custom',
		emptyScopesAlias: 'empty',
		upperCaseSubject: false,
		markBreakingChangeMode: false,
		allowBreakingChanges: ['feat', 'fix'],
		breaklineNumber: 100,
		breaklineChar: '|',
		skipQuestions: [],
		issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
		customIssuePrefixAlign: 'top',
		emptyIssuePrefixAlias: 'skip',
		customIssuePrefixAlias: 'custom',
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		maxHeaderLength: Infinity,
		maxSubjectLength: Infinity,
		minSubjectLength: 0,
		scopeOverrides: undefined,
		defaultBody: '',
		defaultIssues: '',
		defaultScope: '',
		defaultSubject: ''
	}
};

const defaultCommitTypes = [
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

/* const config = {
	plugins: [
		{
			rules: {
				'header-match-team-pattern': (parsed) => {
					const { header } = parsed;

					if (!commitRegex.test(header)) {
						return [
							false,
							"header must be in format '<type>: <emoji?> <ticket?> <subject>\nexample => ci: 🚀 [V-123] example\n"
						];
					}

					return [true, ''];
				},
				'explained-emoji-enum': (parsed, _when, commitTypes) => {
					const { header } = parsed;

					const emojiInHeader = header.match(commitEmojiRegex);

					if (!emojiInHeader) {
						return [true, ''];
					}

					const isEmojiInArray = commitTypes.findIndex((commitType) => commitType.emoji === emojiInHeader[0]) !== -1;

					if (!isEmojiInArray) {
						const messageArray = commitTypes.map((commitType) => `${commitType.emoji} - ${commitType.description}`);

						return [false, `emoji must be one of:\n${messageArray.join('\n')}`];
					}

					return [true, ''];
				}
			}
		}
	],
	rules: {
		'header-match-team-pattern': [2, 'always'],
		'explained-emoji-enum': [2, 'always', defaultCommitTypes],
		'body-leading-blank': [2, 'always'],
		'body-max-line-length': [2, 'always', 150],
		'footer-leading-blank': [2, 'always'],
		'footer-max-line-length': [2, 'always', 150],
		'header-max-length': [2, 'always', 150],
		'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'scope-empty': [2, 'always']
	}
};
 */
module.exports = config;

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
]; */
