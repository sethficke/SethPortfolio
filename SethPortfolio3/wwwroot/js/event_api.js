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