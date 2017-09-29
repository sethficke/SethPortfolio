// e.data[0] is the args for the job.
self.onmessage = function(e){
    
    var data = e.data;
    
    var testNums = JSON.parse(data);
    
    compute(testNums);
    
    // The job which is being executed.
function compute(testNums){
    
    // Map
    var results = testNums.map(isPrime);
    
    // Reduce
    var primes = reduce(testNums, results);
    
    // Finalize
    finalize(primes);
}

function reduce(inputArray, isPrimeArray){
    var results = [];
    for(var i=0;i<inputArray.length;i++){
        if (isPrimeArray[i]){
            results.push(inputArray[i]);
        }
    }
    return results;
}

function isPrime(n) {
 if (n%1 || n<2) return false; 
 if (n==leastFactor(n)) return true;
 return false;
}

function leastFactor(n){
 if (isNaN(n) || !isFinite(n)) return NaN;  
 if (n==0) return 0;  
 if (n%1 || n*n<2) return 1;
 if (n%2==0) return 2;  
 if (n%3==0) return 3;  
 if (n%5==0) return 5;  
 var m = Math.sqrt(n);
 for (var i=7;i<=m;i+=30) {
  if (n%i==0)      return i;
  if (n%(i+4)==0)  return i+4;
  if (n%(i+6)==0)  return i+6;
  if (n%(i+10)==0) return i+10;
  if (n%(i+12)==0) return i+12;
  if (n%(i+16)==0) return i+16;
  if (n%(i+22)==0) return i+22;
  if (n%(i+24)==0) return i+24;
 }
 return n;
}

function finalize(results){
    postMessage(JSON.stringify(results));
    self.close();
}
}

