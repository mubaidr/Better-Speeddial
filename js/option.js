var settings = ["speeddial-style", "hide-websearch", "hide-plus", "update-plus", "hide-all-nav", "update-nav", "autohide-nav", "hide-stash", "hide-discover"];
window.onload = function () {
	restoreOptions();
	saveOptions();
	enable_test_mode();
};

function saveOptions() {
	//Save data on setting's change
	var e;
	var obj = {};
	var elem;
	for (i in settings) {
		elem = document.getElementById(settings[i]);
		elem.addEventListener('change', function (evt) {
			e = evt.srcElement;
			obj = {};
			obj[String(e.id)] = (e.type == "checkbox" && !e.checked) ? 0 : e.value;
			chrome.storage.sync.set(obj, function (evt) {
				//console.log('saved');
			});
			if (e.id == "hide-plus") {
				elem = document.getElementById('plus-hidden');
				if (e.checked) {
					elem.className = 'hidden';
				} else {
					elem.className = '';
				}
			} else if (e.id == "hide-all-nav") {
				elem = document.getElementById('sub-navigation-option');
				if (e.checked) {
					elem.className = 'hidden';
				} else {
					elem.className = '';
				}
			}
		}, false);
	}
};

function restoreOptions() {
	//Update form controls with users preferences
	var temp;
	chrome.storage.sync.get(settings, function (e) {
		console.log("data : " + JSON.stringify(e));
		for (i in settings) {
			if (e.hasOwnProperty(settings[i])) {
				var elem = document.getElementById(settings[i]);
				if (elem.type == "checkbox") {
					if (e[settings[i]] == 1) {
						elem.checked = true; //checkbox
						if (settings[i] == "hide-plus") {
							temp = document.getElementById('plus-hidden');
							temp.className = 'hidden';
						} else if (settings[i] == "hide-all-nav") {
							temp = document.getElementById('sub-navigation-option');
							temp.className = 'hidden';
						}
					} else {
						if (settings[i] == "hide-plus") {
							temp = document.getElementById('plus-hidden');
							temp.className = '';
						} else if (settings[i] == "hide-all-nav") {
							temp = document.getElementById('sub-navigation-option');
							temp.className = '';
						}
					}
				}
				else elem.selectedIndex = e[settings[i]]; //select dropdown
			}
		}
		//Fallbacks for dropdowns
		if (!e.hasOwnProperty('speeddial-style')) { var elem = document.getElementById('speeddial-style'); elem.selectedIndex = 1; }
	});
};

function enable_test_mode() {
	chrome.storage.onChanged.addListener(function (changes, namespace) {
		for (key in changes) {
			var storageChange = changes[key];
			console.log('key "%s"@"%s" changed ' +
						'- old value: "%s" - new value: "%s"',
						key,
						namespace,
						storageChange.oldValue,
						storageChange.newValue);
		}
	})
};