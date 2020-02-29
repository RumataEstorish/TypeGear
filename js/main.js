/*global $, tau*/

var resultText = "";
var reqAppControl = null;
var callAppControl = null;
var loadedLanguages = null;
var currentLanguageIndex = 0;
var prevMode = "english-lowercase";
var passMode = false;
var singlelinemode = false;
var PASSWORDCHAR = "*";

function getCallApp() {
	reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
	if (reqAppControl) {
		callAppControl = reqAppControl.appControl;
	}
}

function isString(o) {
	return typeof o == "string" || (typeof o == "object" && o.constructor === String);
}

function getNextLanguage() {
	currentLanguageIndex++;
	if (currentLanguageIndex === loadedLanguages.length) {
		currentLanguageIndex = 0;
	}
	return loadedLanguages[currentLanguageIndex];
}

function getPrevLanguage() {
	currentLanguageIndex--;
	if (currentLanguageIndex < 0) {
		currentLanguageIndex = loadedLanguages.length - 1;
	}
	return loadedLanguages[currentLanguageIndex];
}

function returnInfo() {
	var data = null;

	if (callAppControl === null) {
		return;
	}
	if (callAppControl.operation === "http://tizen.org/appcontrol/operation/pick") {
		if (!passMode) {
			data = new tizen.ApplicationControlData("http://tizen.org/appcontrol/data/selected", [ $("#inputRes")[0].value ]);
		} else {
			data = new tizen.ApplicationControlData("http://tizen.org/appcontrol/data/selected", [ resultText ]);
		}
		reqAppControl.replyResult([ data ]);

		tizen.application.getCurrentApplication().exit();
	}
}

function isSingleTouch() {
	var touchNum = 0;
	if (event.touches != null) {
		if (event.touches.length != null) {
			touchNum = event.touches.length;
		}
	}
	return (touchNum < 2);
}
function keyCode(key) {
	event.preventDefault();
	/*if (isSingleTouch()) {
		WebHelperClient.sendKeyEvent(key);
	}*/
}

function keyPressed(key) {
	var input = document.getElementById("inputRes");
	resultText += key;
	if (!passMode) {
		input.value += key;
	} else {
		input.value += PASSWORDCHAR;
	}
	event.preventDefault();
	/*if (isSingleTouch()) {
		WebHelperClient.commitString(key);
	}*/
	return true;
}
function backspacePressed() {
	event.preventDefault();
	var input = document.getElementById("inputRes");
	input.value = input.value.substr(0, input.value.length - 1);
	resultText = resultText.substr(0, resultText.length - 1);
	/*if (isSingleTouch()) {
		keyCode(WebHelperClient.Keycode.BACKSPACE);
	}*/
}
function spacePressed() {
	event.preventDefault();
	if (!passMode) {
		document.getElementById("inputRes").value += " ";
	} else {
		document.getElementById("inputRes").value += PASSWORDCHAR;
	}

	resultText += " ";

/*	if (isSingleTouch()) {
		keyCode(WebHelperClient.Keycode.SPACE);
	}*/
}

function scrollText() {
	var textarea = document.getElementById('inputRes');
	textarea.scrollTop = textarea.scrollHeight;

}

function enterPressed() {
	event.preventDefault();
	if (!singlelinemode) {
		document.getElementById("inputRes").value += String.fromCharCode(13);
		resultText += String.fromCharCode(13);
	} else {
		returnInfo();
	}
	scrollText();

	/*if (isSingleTouch()) {
		keyCode(WebHelperClient.Keycode.RETURN);
	}*/
}
function inputModeChanged(from, to) {
	event.preventDefault();

	if (isSingleTouch()) {
		var from_div = document.getElementById(from);
		from_div.style.display = "none";
		var to_div = document.getElementById(to);
		to_div.style.display = "block";
		prevMode = to;
	}
}

function changeNumInput() {

	try {
		inputModeChanged('numsym1', loadedLanguages[currentLanguageIndex] + "-lowercase");
	} catch (e) {
		alert(e.message);
	}
}

function textClick(e) {
	e.preventDefault();
}

function saveSettings() {
	var i = 0, langSettings = $("#languageSettingsPage :checked"), res = [];

	if (langSettings.length === 0) {
		alert("You must check at least one!");
		tau.changePage("#languageSettingsPage");
		return;
	}

	try {
		for (i = 0; i < langSettings.length; i++) {
			res.push(langSettings[i].value);
		}

		localStorage.setItem("languages", JSON.stringify(res));
		loadedLanguages = res;
	} catch (e) {
		alert(e.message);
	}
}

function loadSettings() {

	try {
		var i = 0, j = 0, langSettings = $("#languageSettingsPage input"), pick = localStorage.getItem("languages");

		if (pick !== null) {
			loadedLanguages = JSON.parse(pick);

			for (j = 0; j < loadedLanguages.length; j++) {
				for (i = 0; i < langSettings.length; i++) {
					if (langSettings[i].value === loadedLanguages[j]) {
						langSettings[i].checked = true;
					}
				}
			}
		} else {
			loadedLanguages = [];
			loadedLanguages.push("english");
			langSettings[0].checked = true;
		}
	} catch (e) {
		alert(e.message);
	}
}

function getActivePage() {
	var page = document.getElementsByClassName('ui-page-active')[0], pageid = (page && page.id) || '';

	return pageid;
}

/*var WebHelperClientHandler = {
	onInit : function() {
		WebHelperClient.log("ON INIT");
	},
	onSetLayout : function(layout) {
		var nextMode;
		if (layout == "phonenumber") {
			nextMode = "numsym1";
		} else if (layout == "number") {
			nextMode = "numsym1";
		} else {
			nextMode = "english-lowercase";
		}
		inputModeChanged(prevMode, nextMode);
		prevMode = nextMode;
	},
	onShow : function() {
		var screenWidth = window.screen.width;
		var screenHeight = window.screen.height;
		WebHelperClient.setKeyboardSizes(screenWidth, screenHeight * 2 / 3, screenHeight, screenWidth * 2 / 3);
	}
};
WebHelperClient.initialize(WebHelperClientHandler);*/
