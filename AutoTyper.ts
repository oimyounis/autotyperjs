class AutoTyper {
    el;
    words: Array<any>;
    id: string;
    currentWord: string;
    currentWordIndex: number = 0;
    currentLetterIndex: number = -1;
    _timer;
    _wordWrapper;
    _loop: boolean = true;

    constructor(selector: string, words: Array<string>, loop: boolean = true) {
        this._loop = loop;
        this.el = document.querySelector(selector);
        if (!this.el){
            throw 'AutoTyper: element does not exist in DOM.'
        }

        this.words = words;
        this.init();
    }

    private generateUID(): string {
        return '__autotyper_' + (Math.random().toString(26).slice(2));
    }

    init(): void {
        this.id = this.generateUID();
        this.el.innerHTML = '<div id="'+ this.id +'" class="__autotyper_text-wrapper"> <span class="__autotyper_text-caret animation-blink"></span></div>';

        this._wordWrapper = document.getElementById(this.id);

        this.currentWord = this.words[0];

        this.startTyping();
    }

    erase() {
        clearInterval(this._timer);
        setTimeout(() => {
            var _eraser = setInterval(() => {
                var val = this._wordWrapper.childNodes[0].nodeValue;
                if (val.length > 1) {
                    this._wordWrapper.childNodes[0].nodeValue = val.substr(0, val.length - 1);
                }
                else if (val.length == 1) {
                    this._wordWrapper.childNodes[0].nodeValue = '';
                }
                else {
                    clearInterval(_eraser);
                    this.startTyping();
                }
            }, 60);
        }, 1000);
    }

    atLastWord() {
        var check = this.currentWordIndex == this.words.length - 1;
        return check;
    }

    selectNextWord() {
        this.currentWordIndex = (this.atLastWord()) ? 0 : this.currentWordIndex + 1;
        this.currentWord = this.words[this.currentWordIndex];
    }

    atEndOfWord(): boolean {
        return this.currentLetterIndex == this.currentWord.length - 1;
    }

    getNextLetter(): string {
        if (this.atEndOfWord()){
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
    }

    type(): void {
        var letter = this.getNextLetter();
        this._wordWrapper.childNodes[0].nodeValue += letter;
    }

    startTyping(): void {
        this._timer = setInterval(() => {
            this.type();
        }, 60);
    }
}