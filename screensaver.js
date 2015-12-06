/**
 * Creates multiple tiles with a headline per tile
 * Gets it's data from http://tweakers.mobi/rss/nieuws
 */
;(function () {

    var colors = [
            "rgb(219, 68, 55)", // Les
            "rgb(15, 157, 88)", // Couleur
            "rgb(66, 133, 244)", // Des
            "rgb(244, 180, 0)" // Google
        ],
        headlines = [],
        headlineIndex = 0,
        ticker = {},
        TICKER_DELAY = 5000;


    var HEADLINES_SOURCE_URL = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&scoring=h&q=http://tweakers.mobi/rss/nieuws";

    getHeadlines(function (d) {

        for (var i in d.responseData.feed.entries) {

            var e = d.responseData.feed.entries[i];

            var headline = {
                title: e.title,
                link: e.link
            };

            headlines.push(headline);
        }

        init();

    });

    function init() {

        plotFirstHeadlines();
        startLoop();

    }

    function plotFirstHeadlines() {

        var numContainers = $(".container > .cell").length;
        for (var i = 0; i < numContainers; i++) {
            var $targetContainer = $(".container > .cell:eq(" + i + ")");
            plotHeadline($targetContainer, headlines[i]);
            headlineIndex = i;
        }

    }

    function plotHeadline($targetContainer, headline) {

        $targetContainer.on('click', function () {
            document.location.href = headline.link;
        });
        $targetContainer.css('background-color', colors[getRandomInt(0, colors.length - 1)]);

        $("span", $targetContainer).animate({opacity: 0}, 400, function () {
            $("span", $targetContainer).text(headline.title).animate({opacity: 1}, 400);
        });

    }

    function getHeadlines(callback) {

        $.ajax({
            url: HEADLINES_SOURCE_URL,
            crossDomain: true,
            dataType: 'jsonp',
            success: callback
        });

    }

    function getRandomInt(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    function startLoop() {

        var loopNext = function () {
            ticker.timeout = setTimeout(ticker.next, TICKER_DELAY);
        };

        ticker.next = function () {
            clearTimeout(ticker.timeout);

            var randomContainer = getRandomInt(0, $(".container > .cell").length);
            var $targetContainer = $(".container > .cell:eq(" + randomContainer + ")");

            headlineIndex++;
            plotHeadline($targetContainer, headlines[headlineIndex % headlines.length]);
            loopNext();
        };

        ticker.next();

    }

})();
