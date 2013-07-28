var settings = ["hide-websearch", "hide-all-nav", "hide-stash", "hide-discover", "speeddial-style", "hide-plus", "update-plus", "autohide-nav", "hide-gradient", "update-nav"];
chrome.storage.sync.get(settings, function (e) {
	var elem = document.getElementsByTagName('body')[0];
	for (i in settings) {
		if (e[settings[i]] == 1) {
			elem.className += ' ' + settings[i];
			if (settings[i] == "update-nav") {
				var cont = document.getElementsByClassName('wrapper')[0];
				var view = document.getElementById('view-container');
				cont.innerHTML = '';
				var left = document.createElement('img');
				var right = document.createElement('img');
				left.setAttribute('id', 'nav_left');
				right.setAttribute('id', 'nav_right');
				left.setAttribute('tabindex', '1');
				right.setAttribute('tabindex', '2');
				left.setAttribute('class', 'nav_icons');
				right.setAttribute('class', 'nav_icons');
				left.setAttribute('src', chrome.runtime.getURL('img/left.png'));
				right.setAttribute('src', chrome.runtime.getURL('img/right.png'));
				left.addEventListener('click', function () {
					var cl = view.className;
					switch (cl) {
						case 'hundred':
							cl = cl.replace('hundred', 'zero');
							break;
						case 'two-hundred':
							cl = cl.replace('two-hundred', 'hundred');
							break;
						default:
							cl = 'zero';
							break;
					}
					view.className = cl;
					console.log(view.className);
				})
				right.addEventListener('click', function () {
					var cl = view.className;
					switch (cl) {
						case 'zero':
							cl = cl.replace('zero', 'hundred');
							break;
						case 'hundred':
							cl = cl.replace('hundred', 'two-hundred');

							break;
						default:
							cl = 'hundred';
							break;
					}
					view.className = cl;
					console.log(view.className);
				})
				cont.appendChild(left);
				cont.appendChild(right);
			}
		}
	}
});
