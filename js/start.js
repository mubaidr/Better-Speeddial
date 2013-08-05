(function () {
	"use strict";
	var settings = ["hide-websearch", "hide-all-nav", "hide-stash", "hide-discover", "speeddial-style", "hide-plus", "update-plus", "autohide-nav", "hide-gradient", "update-nav", "d3-style", "new-title-style"];
	chrome.storage.sync.get(settings, function (e) {
		var elem = document.getElementsByTagName("body")[0];//, cont = document.getElementsByClassName("wrapper")[0], view = document.getElementById("view-container");
		for (var i = 0; i < settings.length; i++) {
			if (e[settings[i]]) {
				elem.className += " " + settings[i];
			}
		}
		/*if (e["update-nav"]) {
			cont.innerHTML = "";
			var left = document.createElement("img"), right = document.createElement("img");
			left.setAttribute("id", "nav_left");
			right.setAttribute("id", "nav_right");
			left.setAttribute("tabindex", "1");
			right.setAttribute("tabindex", "2");
			left.setAttribute("class", "nav_icons");
			right.setAttribute("class", "nav_icons");
			left.setAttribute("src", chrome.runtime.getURL("img/left.png"));
			right.setAttribute("src", chrome.runtime.getURL("img/right.png"));
			left.addEventListener("click", function () {
				var cl = view.className;
				view.className = cl;
			});
			right.addEventListener("click", function () {
				var cl = view.className;
				view.className = cl;
			});
			cont.appendChild(left);
			cont.appendChild(right);
		}*/
		if (e["d3-style"]) {
			updateDials();
		}
	});
	function updateDials() {
		var dials = document.getElementsByClassName("speeddial");//, dialContainer = document.getElementsByClassName("speeddial-container");
		if (dials.length > 0) {
			var w = dials[0].offsetWidth / 2, ww = window.innerWidth / 2, angle;
			for (var i = 0; i < dials.length; i++) {
				angle = -(((parseFloat(dials[i].style.left) + w) / ww) - 1) * 45;
				dials[i].style["-webkit-transform"] = "rotateY(" + angle + "deg) translateZ(" + (Math.abs(angle * 5) - 250) + "px)";
			}
		}
	}
	window.onresize = function () {
		window.setTimeout(function () {
			updateDials();
		}, 100);
	};
}());