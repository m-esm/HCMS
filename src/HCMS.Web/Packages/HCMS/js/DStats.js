var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "/stats/submit?url=" + location.href, true);
xmlhttp.send();