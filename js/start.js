var settings = ["hide-websearch", "hide-all-nav", "hide-stash", "hide-discover", "speeddial-style", "hide-plus", "update-plus", "autohide-nav", "hide-gradient", "update-nav"];
chrome.storage.sync.get(settings, function (e) {
	var elem = document.getElementsByTagName('body')[0];
	for (i in settings) {
		if (e[settings[i]] == 1) {
			elem.className += ' ' + settings[i];
			if (settings[i] == "update-nav") {
				var cont = document.getElementsByClassName('wrapper')[0];
				var back = document.createElement('img');
				var next = document.createElement('img');
				back.setAttribute('id', 'nav_back');
				back.setAttribute('src', '../img/icon_48.png');
				cont.appendChild(back);
			}
		}
	}
});
