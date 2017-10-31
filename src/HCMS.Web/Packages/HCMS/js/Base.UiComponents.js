/// <reference path="../../jquery-2.1.4/jquery-2.1.4.intellisense.js" />
/// <reference path="../../jquery-2.1.4/jquery-2.1.4.js" />
$(document).ready(function () {
  

    $("textarea").change(function () {
        component_preview();

    });


    function component_preview() {
        var iframe = $('#component-preview');

        var html = $("textarea[name=Html]").val();

        var style = $("<style />").html($("textarea[name=Css]").val());

        var script = $("<script type='text/javascript' />").html($("textarea[name=Js]").val());

        iframe.contents().find("head").append(style);
        iframe.contents().find("body").append(html);
        iframe.contents().find("body").append(script);

    }
  
    component_preview();

});