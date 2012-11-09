// ==UserScript==
// @name        MetaCPAN links to modules
// @namespace   http://kailasa.net/greasemonkey
// @description Add direct MetaCPAN links to modules
// @include     http://cpants.charsbar.org/dist/*
// @version     1
// ==/UserScript==

const DEBUG = false;
var debug = DEBUG ? function(s) {GM_log(s);} : function(s) {};

/*
 * Integrate jQuery first
 * (snippet from http://joanpiedra.com/jquery/greasemonkey/)
 */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        setup_metacpan_links();
    }
}
GM_wait();

var metacpan_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI' +
    'WXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACmklEQVQ4y62SS0hUcRTGv//j' +
    '3juvq+P4lsFcSKlkoEhkWpqZUVI0UmCNkUEL24QLiRYtWomBiASB+F4EmYRRSIULMwkRCTdmkIKJ' +
    'qQw+ppzUmXtn5v9vEQ62trM6fN85Z/E7H5FSEhyg+F7TXVJ9mKz/alQ11U1Bhrwzo/37B3sKztaz' +
    'cLRGAVmFO6XN+/7FHAAQKSXprbrmxsz8hCMYdseBgUlAlBU+PP+mvxkAeoov3ldmF1qcVIEVFDLe' +
    'vmxUFJVe6nuyxAGAGMZV247hTrM64KQcVEiEpucbRiprWzeTdcGX1xoSuYYU1QoroYgGTHdwxV8D' +
    'oJ0DAGOc2kChUw4LYSBUgkclDQeCdPdolpAg0CmHgzJwEAgAiq5TAKAAwDLTX1Ld4UM4DAgJaZhQ' +
    'Sgo6i6deh660t0SYO7UXQoBICRmOgCY6fcSpD8UgevufLr264K3c+e5r4tumS8k7MhI5lt0RI1iY' +
    '2xwMS//26s8qa5zdr1Yeb8vtaF6MQTzIG+lBlv/JAQD0lFSfZhYthWjqxK23A6v7va78sgymO04S' +
    'ITZuT74b29OJlJL0199Vo1NfutXljTobZeBWi0+UF9Z6nneOA0Cf52ap/Dg9YJckQ6MUMtH5DJ6K' +
    'O57Hj0wOANK3eVn7sV6XYrUjgSqgZiTN+DzXOnyu9sSWyw4yu9AaL0hGsmaDDQRRf7BuZ/rbMIBB' +
    'DgA0sJPnoBwuqkCnHETjsASMLPProuW30xphW9uZCaoGF+VQCIUwDVgccTkxiIo7dVxhDIqUf4WQ' +
    'CfVQ+mT5yuTu9dkPppLkmuJmBIwQECFAGYWalPApduDGYO+YyM9uChGsRQlMkhQ/Fkly3ouRrj7V' +
    'aLjiR00RNQXnG+xM0YOcrpbR/5KDPzyz9yDxWPn1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEyLTEx' +
    'LTA5VDE1OjQ5OjUxLTA1OjAw+Cs/XQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMi0xMC0xNFQxMjox' +
    'MDoyNS0wNDowMGZ/RRwAAAAASUVORK5CYII=';

// All your GM code must be inside this function
function setup_metacpan_links() {
  $('a[href^="/dist/overview/"]').each(
    function() {
      var module = this.href.match('/dist/overview/(.*)$')[1].replace('-', '::', 'g');
      console.log("module = " + module);
      $(this).append('&nbsp;' + '<a href="http://metacpan.org/module/' + module + '"><img src="' + metacpan_icon + '"></a>');
    });
}