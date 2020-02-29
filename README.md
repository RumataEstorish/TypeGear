# TypeGear
Free keyboard for Gear 1, 2.

![](https://github.com/RumataEstorish/TypeGear/blob/master/screenshots/1.png)
![](https://github.com/RumataEstorish/TypeGear/blob/master/screenshots/2.png)
![](https://github.com/RumataEstorish/TypeGear/blob/master/screenshots/3.png)
![](https://github.com/RumataEstorish/TypeGear/blob/master/screenshots/4.png)

Now supports English, Russian, Українська,  Español, Dutch (Belgiè), Deutsch, Türkçe, Francais languages. 

If you don't have application supports this keyboard, you don't need this. Without apps support it, TypeGear is useless. 

This app provides qwerty keyboard input method for Gear 1 and 2 as they don't have stock input. 

Principle is very simple - it works like crop function of gallery, you open it using AppControl and it returns text like you pick it. It's absolutely free! 

### Features
Keyboard is qwerty-style, based on Samsung WebIME sample, but with languages support and: 

User features: 

* Full qwerty keyboard
* Vertical swipe on '123' opens language settings
* Languages can be turn on/off in settings, app remembers this
* Horizontal swipe on space changes language

Developers features: 

* Multiline input. By default, user can press enter for new line and when press 'tick' button near input field, keyboard closes and returns input result
* Single line input. It can be set manually, then tick button hides and enter key will close keyboard and return result.
* Password mode. Input field will be filled with asterisk, single line input only.

### Project configuration.
1. tau.js and tau.core.js must be included in project
2. privileges needed: application.info, application.launch

### Usage
You can include typeGear-1.0.0.js to your project (see attachment below page).

Example usage:

``` /*global pickText, KeyboardModes*/
pickText("text", KeyboardModes.NORMAL, function(e) {
        alert("Result: " + e);
    }, function(e) {
        alert("Error: " + e);
    }, function() {
        alert("User cancelled input");
    });
``` 

If TypeGear is not installed, onerror function will be called with message "Please, install TypeGear from store. It's free". You can change this message right in file.
<br>
Please, note, it's recommended to use this keyboard only for Gear 1, Gear 2. For Gear S it's better to use stock input.

For example, you can do it like this:

``` tizen.systeminfo.getPropertyValue("BUILD",
    function(res) {
        
        switch (res.model) {
        case "SM-R380":
        case "SM-R381":
        case "SM-V700":
            alert("Gear 1, 2");
            // tau.changePage("#oldGearInput");
            break;
        default:
            alert("Gear S and newer");
            //tau.changePage("#newGearInput");
            break;
        }
    });
 ```
