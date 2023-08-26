const baseNameHelper = name => {
	for (let i = name.length - 1; i >= name.length - 6; i--) {
		if (name[i] === '.') return name.slice(0, i);
	}
};

module.exports = baseNameHelper;
