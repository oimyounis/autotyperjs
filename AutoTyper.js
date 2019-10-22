var AutoTyper = /** @class */ (function () {
    function AutoTyper(selector, words, loop) {
        if (loop === void 0) { loop = true; }
        this.currentWordIndex = 0;
        this.currentLetterIndex = -1;
        this._loop = true;
        this._loop = loop;
        this.el = document.querySelector(selector);
        if (!this.el) {
            throw 'AutoTyper: element does not exist in DOM.';
        }
        this.words = words;
        this.init();
    }
    AutoTyper.prototype.generateUID = function () {
        return '__autotyper_' + (Math.random().toString(26).slice(2));
    };
    AutoTyper.prototype.init = function () {
        this.id = this.generateUID();
        this.el.innerHTML = '<div id="' + this.id + '" class="__autotyper_text-wrapper"> <span class="__autotyper_text-caret animation-blink"></span></div>';
        this._wordWrapper = document.getElementById(this.id);
        this.currentWord = this.words[0];
        this.startTyping();
    };
    AutoTyper.prototype.erase = function () {
        var _this = this;
        clearInterval(this._timer);
        setTimeout(function () {
            var _eraser = setInterval(function () {
                var val = _this._wordWrapper.childNodes[0].nodeValue;
                if (val.length > 1) {
                    _this._wordWrapper.childNodes[0].nodeValue = val.substr(0, val.length - 1);
                }
                else if (val.length == 1) {
                    _this._wordWrapper.childNodes[0].nodeValue = '';
                }
                else {
                    clearInterval(_eraser);
                    _this.startTyping();
                }
            }, 60);
        }, 1000);
    };
    AutoTyper.prototype.atLastWord = function () {
        var check = this.currentWordIndex == this.words.length - 1;
        return check;
    };
    AutoTyper.prototype.selectNextWord = function () {
        this.currentWordIndex = (this.atLastWord()) ? 0 : this.currentWordIndex + 1;
        this.currentWord = this.words[this.currentWordIndex];
    };
    AutoTyper.prototype.atEndOfWord = function () {
        return this.currentLetterIndex == this.currentWord.length - 1;
    };
    AutoTyper.prototype.getNextLetter = function () {
        if (this.atEndOfWord()) {
            if (this.atLastWord() && !this._loop) {
                clearInterval(this._timer);
                return '';
            }
            else {
                this.selectNextWord();
                this.currentLetterIndex = -1;
                this.erase();
            }
        }
        else {
            this.currentLetterIndex++;
        }
        return this.currentWord.charAt(this.currentLetterIndex);
    };
    AutoTyper.prototype.type = function () {
        var letter = this.getNextLetter();
        this._wordWrapper.childNodes[0].nodeValue += letter;
    };
    AutoTyper.prototype.startTyping = function () {
        var _this = this;
        this._timer = setInterval(function () {
            _this.type();
        }, 60);
    };
    return AutoTyper;
}());
