// function to use colors in the command line
function LogColors() {
    if (!this.init) {
		LogColors.prototype.init = true;

		const colors = {
			black: '\x1b[30m',
			red: '\x1b[31m',
			green: '\x1b[32m',
			yellow: '\x1b[33m',
			blue: '\x1b[34m',
			pink: '\x1b[35m',
			teal: '\x1b[36m',
			white: '\x1b[37m',
		};

		for (let key in colors) {
			LogColors.prototype[key] = function (...args) {
				console.log(colors[key], ...args);
			};
		}
	}
}

module.exports = LogColors;