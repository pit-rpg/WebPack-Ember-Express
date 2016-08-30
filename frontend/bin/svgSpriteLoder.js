var Sprite = require('svg-sprite-loader/lib/web/sprite.js');

// function MySprite() {
//     Sprite.apply(this, arguments);
// }
// MySprite.prototype = Object.create(Sprite.prototype);

var globalSprite = new Sprite();

globalSprite.elem = globalSprite.render(document.head);

module.exports = globalSprite;
