    var primes = [];

    function getPrimesBetween(inclusiveMin, inclusiveMax) {
        var startedAt = new Date().getTime();
        var exclusiveMax = inclusiveMax + 1;
        var keepBatching = false;
        var startNumber = inclusiveMin;
        var getEndNumber = function () {
            return startNumber + interval.current
        }
        var interval = {
            "current": 1000000,
            "targetTime": 10000,
            "lastJobStartTime": null,
        };

        interval.current = getStartingInterval()

        function getStartingInterval() {
            if (exclusiveMax - inclusiveMin < interval.current) {
                return inclusiveMax - inclusiveMin;
            } else {
                return interval.current;
            }
        }

        function toggleBatchGeneration() {
            keepBatching = !keepBatching;
            keepBatching ? getJob() : null;
        }

        function getJob() {
            interval.lastJobStartTime = new Date().getTime();
            getPrimes(startNumber, getEndNumber());
        };

        function finishJob(result) {
            primes = primes.concat(result);
            receivePrimesList(primes);
            startNumber += interval.current;
            adjustInterval();
            keepBatching ? getJob() : outputPrimesList();
        }

        function outputPrimesList() {
            console.log("Finished in " + (new Date().getTime() - startedAt) + "ms")
            receivePrimesList(primes);
        }

        function adjustInterval() {
            var timeSpent = new Date().getTime() - interval.lastJobStartTime;
            if (startNumber == inclusiveMax) {
                keepBatching = false;
                return;
            } else if (startNumber + interval.current >= exclusiveMax) {
                interval.current = exclusiveMax - startNumber - 1;
            } else if (timeSpent < interval.targetTime) {
                interval.skewingMultiplier += .3;
                interval.current += interval.current * 0.1 + 1;
            } else {
                interval.skewingMultiplier = 0;
                interval.current -= interval.current * 0.1;
            }

            interval.current = Math.round(interval.current);
            console.log(interval.current);
        }

        function getPrimes(inclusiveMin, exclusiveMax) {

            console.log("Finding primes from: " + inclusiveMin + " to " + (exclusiveMax - 1));

            var sieveCount = 0;
            var resultChunks = [];
            var result;

            findPrimes(inclusiveMin, exclusiveMax);

            function findPrimes(inclusiveMin, exclusiveMax) {
                var testData = [];
                if ((inclusiveMin + 1) % 2 == 0) {
                    for (var i = inclusiveMin; i < exclusiveMax; i += 2) {
                        testData.push(i);
                    }
                } else {
                    for (var i = inclusiveMin + 1; i < exclusiveMax; i += 2) {
                        testData.push(i);
                    }
                }

                createChunks(testData);
            }

            function createChunks(dataSet) {
                var worker = new Worker("/primes/chunker.js");
                worker.onmessage = function (e) {
                    var chunks = JSON.parse(e.data);
                    chunks.map(sieve);
                }
                worker.postMessage(JSON.stringify(dataSet));
            }

            function sieve(chunk) {
                sieveCount++;
                var worker = new Worker("/primes/sieve.js");
                worker.onmessage = function (e) {
                    sieveCount--;
                    resultChunks.push(JSON.parse(e.data));
                    if (sieveCount == 0) {
                        zipChunks();
                    }
                }
                worker.postMessage(JSON.stringify(chunk));
            }

            // TODO: implement multithreaded quicksort.
            function zipChunks() {
                var worker = new Worker("/primes/unchunker.js");
                worker.onmessage = function (e) {
                    result = JSON.parse(e.data);
                    out();
                }
                worker.postMessage(JSON.stringify(resultChunks));
            }

            function out() {
                console.log("Finished in " + (new Date().getTime() - interval.lastJobStartTime) + "ms")
                finishJob(result);
            }
        }
        toggleBatchGeneration();
    }