EventApi = {
    Post: function (data) {

        $.ajax({
            url: "Event/PostEvent?type=" + data,
            type: "POST",
            contentType: "application/json",
            success: function () {
                console.log("Event Logged");
            }
        });
    }
}

EventApi.Post("load");

document.addEventListener("click", function (event) {
    EventApi.Post("click");
});

function update() {
    var span = document.getElementById("hitcount");
    $.get("Event/CountEvents?type=load", function (count) {
        span.innerHTML = count;
    });
    window.setTimeout(update, 10000);
}