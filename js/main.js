document.addEventListener("DOMContentLoaded", init);

function init() {
  var queryMap = getQueryMap();
  var eventName = queryMap.e
    ? decodeURIComponent(queryMap.e)
    : "this page was refreshed";
  var startTime = queryMap.d
    ? new Date(decodeURIComponent(queryMap.d)).getTime()
    : Date.now();
  var eventElement = document.getElementById("event-name");
  eventElement.innerHTML = "since " + eventName + ".";
  var counterElement = document.getElementById("seconds-counter");
  // var waitButton = document.getElementById("reload-button");
  // waitButton.addEventListener("click", reload);
  window.setInterval(function() {
    updateMessage(counterElement, startTime);
  }, 50);
}

function getQueryMap() {
  var queries = window.location.search.substring(1).split('&');
  var queryMap = {};
  for (var i = 0; i < queries.length; i++) {
    var kv = queries[i].split('=');
    queryMap[kv[0]] = kv[1];
  }
  return queryMap;
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function updateMessage(counterElement, startTime) {
  var counter = numberWithCommas(Math.round((Date.now() - startTime) / 1000));
  counterElement.innerHTML = "" + counter + " seconds";
}

