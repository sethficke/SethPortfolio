﻿(function(){
    var map = document.getElementById("map");
    if (map) {
        var iframe = document.createElement("iframe");
        iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45169.259721981296!2d-89.69579375963566!3d44.96239314903403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8800279df8284883%3A0x3295ad8e8e88b5c!2sWausau%2C+WI!5e0!3m2!1sen!2sus!4v1505683181101"
        map.appendChild(iframe);
    }
})();