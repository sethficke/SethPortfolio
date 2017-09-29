window.onload = function () {
    document.getElementById('toggleCalc').addEventListener("click", compute);
    document.getElementById('exportJson').addEventListener("click", jsonDownload);
}

function compute() {
    primes = [];
    var min = Number(document.getElementById("min").value);
    var max = Number(document.getElementById("max").value);

    (!isNaN(min) && !isNaN(max)) ? getPrimesBetween(min, max): null;
}

function receivePrimesList(primesList) {
    outHtmlNode = document.getElementById("outputDiv");
    outHtmlNode.innerHTML = "<div><h3>Highest Prime:</h3> " + primesList[primesList.length - 1].toLocaleString() +
        "</div><div><h3>Count Of Primes:</h3> " + primesList.length.toLocaleString() + "</div>";
}

function jsonDownload() {

    processArray(primes.slice());

    function startDownload(url, lotNumber) {
        var a = document.createElement("a");
        a.href = url;
        a.download = "primes[" + lotNumber + "].json";
        a.click();
    }

    function makeFile(text) {
        var result = null;

        var data = new Blob(text.split(), {
            type: 'text/plain'
        });

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (result !== null) {
            window.URL.revokeObjectURL(result);
        }

        result = window.URL.createObjectURL(data);

        return result;
    };

    function processArray(bigArray) {
        var batchSize = 500000
        var lotNumber = 0;
        while (bigArray.length > 0) {
            var chunk = bigArray.splice(0, batchSize);
            var file = makeFile(JSON.stringify(chunk));
            startDownload(file, lotNumber);
            lotNumber++;
        }
    }
}