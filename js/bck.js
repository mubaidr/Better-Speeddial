chrome.runtime.onInstalled.addListener(function (object) {
	if (object.reason == "install") {
		var newSettings = { "speeddial-style": 1, "hide-websearch": 1, "hide-plus": 0, "update-plus": 1, "hide-all-nav": 0, "update-nav": 1, "autohide-nav": 0, "hide-stash": 0, "hide-discover": 1, "hide-gradient": 1};
		chrome.storage.sync.set(newSettings, function (e) {
			console.log("Default settings loaded!");
		})
	}
});