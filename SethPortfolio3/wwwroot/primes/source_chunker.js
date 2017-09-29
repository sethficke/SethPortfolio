self.onmessage = function (e) {
    var jsonData = e.data;
    var arrayData = JSON.parse(jsonData);
    var chunkedData = chunkInputData(arrayData);
    finalize(chunkedData);
}

// Finalizes the task.
function finalize(results) {
    postMessage(JSON.stringify(results));
    self.close();
}

// Splits the data to be processed into chunks based on
// the user's cpu cores.
function chunkInputData(dataArray) {

    // Get the number of chunks to use.
    var numberOfChunks = navigator.hardwareConcurrency || 1;

    // Initialize the resultArray(s).
    var resultArray = [];
    for (var i = 0; i < numberOfChunks; i++) {
        resultArray[i] = [];
    }

    // Sort the dataArray into the resultArray(s).
    var i = 0;
    for (var j = 0; j < dataArray.length; j++) {
        if (i == resultArray.length) {
            i = 0;
        }

        resultArray[i].push(dataArray[j]);

        i++;
    }

    // Return the result array.
    return resultArray;
}

