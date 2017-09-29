self.onmessage = function (a) {
    a = JSON.parse(a.data);
    for (var b = [], c = 0; c < a.length; c++) b = b.concat(a[c]);
    b = d(b);
    postMessage(JSON.stringify(b));
    self.close()
};

function d(a) {
    return a.sort(function (b, a) {
        return b - a
    })
};