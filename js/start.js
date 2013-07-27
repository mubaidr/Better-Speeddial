var settings = ["speeddial-style", "hide-websearch", "hide-plus", "update-plus", "hide-all-nav", "update-nav", "autohide-nav", "hide-stash", "hide-discover"];
chrome.storage.sync.get(settings, function (e) {
	var elem = document.getElementsByTagName('body')[0];
	for (i in settings) {
		if (e[settings[i]] == 1) elem.className += ' ' + settings[i];
	}
});