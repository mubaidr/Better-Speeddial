(function () {
	"use strict";
	chrome.runtime.onInstalled.addListener(function (object) {
		if (object.reason === "install") {
			var newSettings = {
				"speeddial-style": 1,
				"hide-websearch": 1,
				"hide-plus": 0,
				"update-plus": 0,
				"hide-all-nav": 0,
				"update-nav": 0,
				"autohide-nav": 0,
				"hide-stash": 0,
				"hide-discover": 1,
				"hide-gradient": 1,
				"d3-style": 1,
				"new-title-style": 0
			};
			chrome.storage.sync.set(newSettings, function () {
				console.log("Default settings loaded!");
			});
		}
	});
}());