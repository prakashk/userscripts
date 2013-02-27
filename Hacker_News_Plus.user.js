// ==UserScript==
// @name        Hacker News Plus
// @namespace   http://kailasa.net/greasemonkey
// @description Enhance Hacker News experience
// @include     http://news.ycombinator.com/item?id=*
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
        start();
    }
}
GM_wait();

/* end of boiler-plate code to include jquery */

function start() {
    // make comments collapsible
    add_collapse_comments_buttons();

    // highlight some comments
    highlight_select_users();
}

// part of this code from a bookmarklet that someone posted.
// TODO: Need to find the source and give credit

function add_collapse_comments_buttons() {
    var current_level_width = 0;
    var inner_level_width = 1000;
    if (!$('body').hasClass('collapsible-comments')) {
        $('body').addClass('collapsible-comments');
        var span_html = '<span style=\'cursor:pointer;margin-right:10px;\' class=\'expand-handle\'>[-]</span>';
        if (window.location.href.indexOf('item?id=') != -1) {
            $('center > table > tbody > tr:eq(2) > td > table:eq(1) span.comhead').prepend(span_html);
        } else if (window.location.href.indexOf('threads?id=') != -1) {
            $('center > table > tbody > tr > td > table span.comhead').prepend(span_html);
        }
        $(document).on('click', '.expand-handle', function () {
            current_level_width = parseInt($(this).closest('tr').find('td:eq(0) > img').attr('width'), 10);
            $(this).closest('table').closest('tr').nextAll().each(function (index, el) {
                var elWidth = parseInt($('tbody > tr > td > img', this).attr('width'), 10);
                if (elWidth > current_level_width) {
                    if (elWidth <= inner_level_width) {
                        inner_level_width = 1000;
                        $(this).hide();
                    }
                    if (inner_level_width == 1000 && $('.comment', this).css('display') == 'none') {
                        inner_level_width = elWidth;
                    }
                } else {
                    return false;
                }
            });
            inner_level_width = 1000;
            $(this).text('[+]').addClass('expand-handle-collapsed').removeClass('expand-handle');
            $(this).closest('div').nextAll().hide();
            $(this).closest('div').parent().prev().hide();
            $(this).closest('div').css({
                'margin-left': '18px',
                'margin-bottom': '5px'
            });
        });

        $(document).on('click', '.expand-handle-collapsed', function () {
            current_level_width = parseInt($(this).closest('tr').find('td > img').attr('width'), 10);
            $(this).closest('table').closest('tr').nextAll().each(function (index, el) {
                var elWidth = parseInt($('tbody > tr > td > img', this).attr('width'), 10);
                if (elWidth > current_level_width) {
                    if (elWidth <= inner_level_width) {
                        inner_level_width = 1000;
                        $(this).show();
                    }
                    if (inner_level_width == 1000 && $('.comment', this).css('display') == 'none') {
                        inner_level_width = elWidth;
                    }
                } else {
                    return false;
                }
            });
            inner_level_width = 1000;
            $(this).text('[-]').addClass('expand-handle').removeClass('expand-handle-collapsed');
            $(this).closest('div').nextAll().show();
            $(this).closest('div').parent().prev().show();
            $(this).closest('div').css({
                'margin-left': '0',
                'margin-bottom': '-10px'
            });
        });
    }
}

function highlight_select_users() {
    var select_users = new Array(
        'anigbrowl',
        'btilly',
        'carbocation',
        'dctoedt',
        'grellas',
        'gruseom',
        'mechanical_fish',
        'patio11',
        'pg',
        'potatolicious',
        'raganwald',
        'rayiner',
        'rprasad',
        'tptacek',
        'tzs',
        'yummyfajitas'
    );
    $('.comhead a[href^="user"]').each(
        function(index, el) {
            var user = el.href.match("user\\?id=(\\w+)")[1];
            if (user && $.inArray(user, select_users) >= 0) {
                $(el).closest("td.default").css("background-color", "#ddd");
            }
        }
    );
}
