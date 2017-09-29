// e.data[0] is the args for the job.
self.onmessage = function (e) {
    var jsonData = e.data;
    var arrayData = JSON.parse(jsonData);
    var unchunkedData = unchunkResultData(arrayData);
    finalize(unchunkedData);
}

// Finalizes the task.
function finalize(results) {
    postMessage(JSON.stringify(results));
    self.close();
}

// Unchunks the result data.
function unchunkResultData(nestedArray) {
    var results = [];
    for (var i = 0; i < nestedArray.length; i++) {
        results = results.concat(nestedArray[i]);
    }
    results = zip(results);
    return results;
}

// TODO: write a better zipping algorithm.
// This is the source of much lag.
function zip(results) {
    return results.sort(function (a, b) {
        return a - b;
    });
}