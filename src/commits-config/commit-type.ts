import { IFinalConfiguration } from './interfaces/final-configuration';

export const DEFAULT_COMMIT_TYPES: IFinalConfiguration['commitTypes'] = [
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
