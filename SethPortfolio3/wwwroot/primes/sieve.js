self.onmessage = function (e) {
    function f(a) {
        return a % 1 || 2 > a ? !1 : a == g(a) ? !0 : !1
    }

    function g(a) {
        if (isNaN(a) || !isFinite(a)) return NaN;
        if (0 == a) return 0;
        if (a % 1 || 2 > a * a) return 1;
        if (0 == a % 2) return 2;
        if (0 == a % 3) return 3;
        if (0 == a % 5) return 5;
        for (var d = Math.sqrt(a), b = 7; b <= d; b += 30) {
            if (0 == a % b) return b;
            if (0 == a % (b + 4)) return b + 4;
            if (0 == a % (b + 6)) return b + 6;
            if (0 == a % (b + 10)) return b + 10;
            if (0 == a % (b + 12)) return b + 12;
            if (0 == a % (b + 16)) return b + 16;
            if (0 == a % (b + 22)) return b + 22;
            if (0 == a % (b + 24)) return b + 24
        }
        return a
    }(function (a) {
        for (var d = a.map(f),
                b = [], c = 0; c < a.length; c++) d[c] && b.push(a[c]);
        postMessage(JSON.stringify(b));
        self.close()
    })(JSON.parse(e.data))
};