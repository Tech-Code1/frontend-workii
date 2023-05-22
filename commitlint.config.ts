module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'header-max-length': [2, 'always', 150],
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'refactor', 'chore', 'docs', 'style', 'perf', 'build', 'test', 'ci', 'revert']
		]
	}
};
