// function replaceAt(str, index, character) {
//     return str.substr(0, index) + character + str.substr(index + character.length);
// }

module.exports = function(source) {
    // this.cacheable();
    source = replaceNewLines(source);
    source = source.replace(/^\s+| +$|\n|<!--[\W\w]+?-->/img, '');
    // return source.replace(/^\s+| +$|\n|<!--[\W\w]+?-->/img, '');
    return source;
};


function replaceNewLines(str) {
    var start = 0;
    var end = 0;
    var delta = 0;
    var subStr = 0;
    // var pat = /\s+/gm;
    while (
        (start = str.indexOf('{{', end)) !== -1 &&
        (end = str.indexOf('}}', end)) !== -1 &&
        start < end
    ) {
        end += 2;

        subStr = str.substring(start, end);

        delta = subStr.length;

        subStr = subStr.replace(/\s+/gm, ' ');

        delta = delta - subStr.length;

        str = str.substring(0, start) + subStr + str.substring(end, str.length);

        end -= delta;
    }
    return str;
}
