module.exports = function (url, options) {
	return new Promise((resolve, reject) => {
		fetch(url, options || {}).then((res) => {
			res.text().then((data) => {
				resolve(data);
			});
		});
	});
};
