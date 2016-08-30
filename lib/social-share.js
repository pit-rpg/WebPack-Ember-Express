// source https://habrahabr.ru/post/156185/
// https://habrahabr.ru/post/250021/
const Share = {
    defOptions(options) {
        if (!options.url) options.url = window.location.toString();

        options._newWindowUrl = '';
    },

    vkontakte(options = {}) {
        Share.defOptions(options);

        options._newWindowUrl = 'http://vkontakte.ru/share.php?';

        if (options.url) options._newWindowUrl += 'url=' + encodeURIComponent(options.url);

        if (options.title) options._newWindowUrl += '&title=' + encodeURIComponent(options.title);

        if (options.text) options._newWindowUrl += '&description=' + encodeURIComponent(options.text);

        if (options.img) options._newWindowUrl += '&image=' + encodeURIComponent(options.img);

        options._newWindowUrl += '&noparse=true';

        Share.popup(options._newWindowUrl, 'Share via VK');
    },

    facebook(options = {}) {
        Share.defOptions(options);

        options._newWindowUrl = 'http://www.facebook.com/sharer.php?s=100';

        if (options.url) options._newWindowUrl += '&p[url]=' + encodeURIComponent(options.url);

        if (options.title) options._newWindowUrl += '&p[title]=' + encodeURIComponent(options.title);

        if (options.text) options._newWindowUrl += '&p[summary]=' + encodeURIComponent(options.text);

        if (options.img) options._newWindowUrl += '&p[images][0]=' + encodeURIComponent(options.img);

        Share.popup(options._newWindowUrl, 'Share via Facebook');
    },

    twitter(options = {}) {
        Share.defOptions(options);

        options._newWindowUrl = 'http://twitter.com/share?';

        if (options.url) options._newWindowUrl += 'url=' + encodeURIComponent(options.url);

        if (options.url) options._newWindowUrl += '&counturl=' + encodeURIComponent(options.url);

        if (options.title) options._newWindowUrl += '&text=' + encodeURIComponent(options.title);

        Share.popup(options._newWindowUrl, 'Share via Twitter');
    },

    googlePlus(options = Share.defOptions()) {
        Share.defOptions(options);

        options._newWindowUrl = 'https://plus.google.com/share?';

        if (options.url) options._newWindowUrl += 'url=' + encodeURIComponent(options.url);

        Share.popup(options._newWindowUrl, 'Share via Google+');
    },

    popup(url, title = '') {
        window.open(url, title, 'toolbar=0,status=0,width=626,height=436');
    }
};

module.exports = Share;
