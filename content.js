var getQueryParams = function() {
    var queries = {};
    $.each(document.location.search.substr(1).split('&'), function(c, q) {
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
    });
    return queries;
};

var totalPlanning = function() {
    var totalPoints = 0;
    var sprintDiv = $("div.ghx-backlog-header.js-sprint-header");
    var totalBadgesDiv = sprintDiv.find("div.ghx-badge-group.ghx-right");
    var firstThree = $(totalBadgesDiv).find("span");
    for (var i = 0; i < 3; i++) {
        var pointValueText = $(firstThree[i]).html();
        var pointValueNum = parseFloat(pointValueText);
        if (!isNaN(pointValueNum)) {
            totalPoints += pointValueNum;
        }
    }
    if ($("#totalPointsBadge").html() == null) {
        var totalPointsBadge = "<span id=\"totalPointsBadge\" class=\"aui-badge  ghx-not-started\" title=\"Sprint Total (Story Points)\" style=\"background-color:#EE7600;\">" + totalPoints + "</span>";
        $(totalBadgesDiv).append(totalPointsBadge);
    } else {
        $("#totalPointsBadge").html(totalPoints);
    }

    var totalBacklogPoints = 0;
    var backlogIssuesDiv = $("div.js-issue-list.ghx-issues.ghx-has-issues")[1];
    if (backlogIssuesDiv !== undefined) {
        var issues = $(backlogIssuesDiv).find("span.aui-badge.ghx-statistic-badge");
        $(issues).each(function() {
            var backlogPointValueText = $(this).html();
            var backlogPointValueNum = parseFloat(backlogPointValueText);
            if (!isNaN(backlogPointValueNum)) {
                totalBacklogPoints += backlogPointValueNum;
            }
        });
    }
    if ($("#backlogTotalPointsBadge").html() == null) {
        var backlogTotalPointsBadge = "<span id=\"backlogTotalPointsBadge\" class=\"aui-badge ghx-statistic-badge\" title=\"Backlog Total (Story Points)\">" + totalBacklogPoints + "</span>";
        $(totalBadgesDiv).append(backlogTotalPointsBadge);
    } else {
        $("#backlogTotalPointsBadge").html(totalBacklogPoints);
    }
};

var totalDetail = function() {
    var toDoId = 115;
    var inProgressId = 116;
    var testingId = 123;
    var doneId = 117;


    var toDoCount = 0;
    var toDoColumns = $("li.ghx-column[data-column-id=\"" + toDoId + "\"]");
    $(toDoColumns).each(function() {
        var pts = $(this).find("aui-badge.ghx-estimate");
        $(pts).each(function() {
            var ptValue = parseFloat($(this).html());
            if (!isNaN(ptValue)) {
                toDoCount += ptValue;
            }
        });
    });

    var inProgressCount = 0;
    var inProgressColumns = $("li.ghx-column[data-column-id=\"" + inProgressId + "\"]");
    $(inProgressColumns).each(function() {
        var pts = $(this).find("aui-badge.ghx-estimate");
        $(pts).each(function() {
            var ptValue = parseFloat($(this).html());
            if (!isNaN(ptValue)) {
                inProgressCount += ptValue;
            }
        });
    });

    var testingCount = 0;
    var testingColumns = $("li.ghx-column[data-column-id=\"" + testingId + "\"]");
    $(testingColumns).each(function() {
        var pts = $(this).find("aui-badge.ghx-estimate");
        $(pts).each(function() {
            var ptValue = parseFloat($(this).html());
            if (!isNaN(ptValue)) {
                testingCount += ptValue;
            }
        });
    });

    var doneCount = 0;
    var doneColumns = $("li.ghx-column[data-column-id=\"" + doneId + "\"]");
    $(doneColumns).each(function() {
        var pts = $(this).find("aui-badge.ghx-estimate");
        $(pts).each(function() {
            var ptValue = parseFloat($(this).html());
            if (!isNaN(ptValue)) {
                doneCount += ptValue;
            }
        });
    });

    var totalScrumPoints = toDoCount + inProgressCount + testingCount + doneCount;
    var totalScrumSpan = "<span class=\"aui-badge ghx-done\" title=\"Total Scrum Points\" style=\"background-color:#EE7600; float: right;\">" + totalScrumPoints + "</span>";

    var toDoPercent = getPercent(toDoCount, totalScrumPoints);
    var toDoDiv = $("li[data-id=\"" + toDoId + "\"]");
    var toDoSpan = "<span class=\"aui-badge ghx-statistic\"><points class=\"jsp-count\">" + toDoCount + "</points><points class=\"jsp-percent\">" + toDoPercent + "</points></span>";
    var toDo = "<h2>" + toDoSpan + " To Do</h2>";
    $(toDoDiv).html(toDo);

    var inProgressPercent = getPercent(inProgressCount, totalScrumPoints);
    var inProgressDiv = $("li[data-id=\"" + inProgressId + "\"]");
    var inProgressSpan = "<span class=\"aui-badge ghx-in-progress\"><points class=\"jsp-count\">" + inProgressCount + "</points><points class=\"jsp-percent\">" + inProgressPercent + "</points></span>";
    var inProgress = "<h2>" + inProgressSpan + " In Progress</h2>";
    $(inProgressDiv).html(inProgress);

    var testingPercent = getPercent(testingCount, totalScrumPoints);
    var testingDiv = $("li[data-id=\"" + testingId + "\"]");
    var testingSpan = "<span class=\"aui-badge ghx-not-started\"><points class=\"jsp-count\">" + testingCount + "</points><points class=\"jsp-percent\">" + testingPercent + "</points></span>";
    var testing = "<h2>" + testingSpan + " Testing</h2>";
    $(testingDiv).html(testing);

    var donePercent = getPercent(doneCount, totalScrumPoints);
    var doneDiv = $("li[data-id=\"" + doneId + "\"]");
    var doneSpan = "<span class=\"aui-badge ghx-done\"><points class=\"jsp-count\">" + doneCount + "</points><points class=\"jsp-percent\">" + donePercent + "</points></span>";
    var done = "<h2 style=\"width:100%;\">" + doneSpan + " Done" + totalScrumSpan + "</h2>";
    $(doneDiv).html(done);

};

var getPercent = function(n, d) {
    return ((n / d) * 100).toFixed(0) + "%";
};

var clifford = function() {
    var cliffico = chrome.extension.getURL("lib/img/cliffico.png");
    $('img').each(function () {
        var curSrc = $(this).attr('src');
        if ( curSrc === 'https://avatar-cdn.atlassian.com/a749522c79c699ed05cde9fe4270ca60?s=48&d=https%3A%2F%2Fsecure.gravatar.com%2Favatar%2Fa749522c79c699ed05cde9fe4270ca60%3Fd%3Dmm%26s%3D48%26noRedirect%3Dtrue' ) {
            $(this).attr('src', cliffico);
        }
    });
};

var velocity = function () {
    var chartData = $("#ghx-chart-data > table > tbody");
    var committed = chartData.find('.ghx-left');
    // console.log(committed);
    // var totalCommitted = 0;
    // $(committed).each(function() {
    //     console.log($(this).html());
    // });
    // var completed = $(chartData).find('.ghx-right')
};

var main = function() {
    var queries = getQueryParams();
    var rapidView = queries.rapidView;
    var view = queries.view;
    var chart = queries.chart;
    clifford();
    if (rapidView) {
        if (rapidView == "16") {
            if (view == "planning" || view == "planning.nodetail") {
                totalPlanning();
            } else if (view == "reporting" && chart == "velocityChart") {
                velocity();
            }else {
                totalDetail();
            }
        }
    }
};

var i = setInterval(function() {
   main();
}, 1000);
