# autotyperJS
A light-weight JavaScript library for making automatic text changes with a typing effect.

## How to use?

- Import the script
```html
<script src="/static/js/AutoTyper.js"></script>
```  

- Initialize an instance
```javascript
new AutoTyper('.dynamic-text', [
  'Word One.',
  'Word Two.',
  'Word Three.',
  'Word Four.'
], false);
```  

## Syntax  

```javascript
AutoTyper(selector, wordList, loop)
```  
If *loop* is set to false the typer will stop after the last word otherwise, it will repeat from the beginning.
