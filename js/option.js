(function () {
	"use strict";
	var settings = ["hide-websearch", "hide-all-nav", "hide-stash", "hide-discover", "speeddial-style", "hide-plus", "update-plus", "update-nav", "autohide-nav", "hide-gradient", "d3-style", "new-title-style"];
	window.onload = function () {
		restoreOptions();
		saveOptions();
	};
	function saveOptions() {
		var e;
		var obj = {};
		var elem;
		for (var i = 0; i < settings.length; i++) {
			elem = document.getElementById(settings[i]);
			elem.addEventListener("change", function (evt) {
				e = evt.srcElement;
				obj = {};
				obj[String(e.id)] = (e.type === "checkbox" && !e.checked) ? 0 : e.value;
				chrome.storage.sync.set(obj, function () { });
				if (e.id === "hide-plus") {
					elem = document.getElementById("plus-hidden");
					if (e.checked) {
						elem.className = "hidden";
					} else {
						elem.className = "";
					}
				} else if (e.id === "hide-all-nav") {
					elem = document.getElementById("sub-navigation-option");
					if (e.checked) {
						elem.className = "hidden";
					} else {
						elem.className = "";
						document.getElementById("hide-stash").checked = false;
						document.getElementById("hide-discover").checked = false;
						chrome.storage.sync.set({
							"hide-stash": 0,
							"hide-discover": 0
						}, function () { });
					}
				} else if (e.id === "hide-stash" || e.id === "hide-discover") {
					chrome.storage.sync.get(["hide-stash", "hide-discover"], function (t) {
						if (t["hide-stash"] === 1 && t["hide-discover"] === 1) {
							document.getElementById("hide-all-nav").checked = true;
							document.getElementById("sub-navigation-option").className = "hidden";
							chrome.storage.sync.set({
								"hide-all-nav": 1
							}, function () { });
						}
					});
				}
			}, false);
		}
	}
	function restoreOptions() {
		var temp;
		chrome.storage.sync.get(settings, function (e) {
			for (var i = 0; i < settings.length; i++) {
				if (e.hasOwnProperty(settings[i])) {
					var elem = document.getElementById(settings[i]);
					if (elem.type === "checkbox") {
						if (e[settings[i]]) {
							elem.checked = true;
							if (settings[i] === "hide-plus") {
								temp = document.getElementById("plus-hidden");
								temp.className = "hidden";
							} else if (settings[i] === "hide-all-nav") {
								temp = document.getElementById("sub-navigation-option");
								temp.className = "hidden";
							}
						} else {
							if (settings[i] === "hide-plus") {
								temp = document.getElementById("plus-hidden");
								temp.className = "";
							} else if (settings[i] === "hide-all-nav") {
								temp = document.getElementById("sub-navigation-option");
								temp.className = "";
							}
						}
					} else { elem.selectedIndex = e[settings[i]]; }
				}
			}
			if (!e.hasOwnProperty("speeddial-style")) {
				document.getElementById("speeddial-style").selectedIndex = 1;
			}
		});
	}
	function enable_test_mode() {
		chrome.storage.onChanged.addListener(function (changes, namespace) {
			for (var key = 0; key < changes.length; key++) {
				var storageChange = changes[key];
				console.log('key "%s"@"%s" changed " + "- old value: "%s" - new value: "%s"', key, namespace, storageChange.oldValue, storageChange.newValue);
			}
		});
	}
}());