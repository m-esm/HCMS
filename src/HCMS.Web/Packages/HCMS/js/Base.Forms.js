/// <reference path="../inputmask.js" />
/// <reference path="../jquery-2.1.4.js" />
/// <reference path="../jquery.inputmask.js" />
/// <reference path="Base.js" />

function init_chechlists() {

    $(".check-list[data-url]").each(function (index, element) {


        var dataURL = $(element).attr("data-url");

        var propName = $(element).attr("data-name");
        var propValue = $(element).attr("data-value");




        $.post(dataURL).done(function (data) {

            $.each(data, function (i, obj) {

                var label = document.createElement("label");

                var checkbox = $(document.createElement("input"))
                    .attr("type", "checkbox")
                    .attr("name", propName)
                    .val(obj.key);


                if (propValue != undefined)
                    if ($.inArray(obj.key.toString(), propValue.split(',')) != -1) {
                        checkbox.attr("checked", "checked");

                    }

                $(label).append(checkbox).append(obj.value);

                $(element).append(label);

            });


        });

    });

}


function validateDynamicsForm(form, submitOnValid, events) {

    events = events || {};
    var actionURL = form.attr("action");
    if (actionURL == undefined)
        actionURL = document.location.pathname;

    var formData = form.serialize() + "&__actionURL=" + actionURL;

    $.post(actionURL
            .toLowerCase()
            .replace('/edit', '/validate')
            .replace('/create', '/validate'), formData).done(
        function (ValidationObject) {


            if (ValidationObject.length == 0) {
                if (events.onValidate != undefined)
                    events.onValidate();


                form.addClass("dynamics-form-valid");
                if (submitOnValid) {
                    form.submit();
                } else {
                    swal({
                        title: "",
                        text: "",
                        confirmButtonText: "OK",
                        type: "success"
                    });
                }



            } else {
                if (form.hasClass("dynamics-form-valid")) {
                    $(form).removeClass("dynamics-form-valid");
                }

                var ErrorAlertList = $("<div>").append($("<ul>").addClass("validation-error-list"));
                $(ValidationObject).each(function (index, obj) {

                    $(String.format("[name={0}]", obj.HtmlFieldName)).addClass("input-validation-error");
                    $("ul", ErrorAlertList).append($("<li>").text(obj.ErrorMessage));
                });

                swal({
                    title: "Please check this fields :",
                    text: ErrorAlertList.html(),
                    confirmButtonText: "OK",
                    html: true,
                    type: "warning",
                    inputType: 'hidden'
                });

                $("input[type=submit]", form).removeAttr("disabled");


                if (events.onValidateError != undefined)
                    events.onValidateError();

            }


        }).error(function (msg) {

            if (events.onError != undefined) {
                events.onError();
            } else {
                swal({
                    title: "Server fault",
                    text: "Please try again .",
                    confirmButtonText: "Ok",
                    type: "error",
                });
                $("input[type=submit]", form).removeAttr("disabled");
            }

        });
}

function browser_input_oninvalid(elem, event) {

    event.preventDefault();
    $(elem).addClass("input-browser-validation-error");

}

////


var InitBaseForms = function () {

    var Dynamic_Input_Remove_Button = '<i class="remove fa fa-remove" data-input="{0}"></i>';


    $("input,select", $(".dynamics-form")).each(function (index, elem) {

        if ($(elem).attr("id") != undefined)
            if ($(elem).attr("id").indexOf("_edit_") != -1) {
                $(elem).before($(String.format(Dynamic_Input_Remove_Button, $(elem).attr("id"))));
            }

    });

    var uploadcontrol_wrapper = "<div class='uploadcontrol-wrapper'>    <div class='uploadcontrol'>        <input type='file' />        <div class='buttons'>            <a class='btn btn-success submit-file'>                <i class='glyphicon glyphicon-ok'></i>    تایید فایل</a><a class='btn btn-default refresh-file'>    <i class='glyphicon glyphicon-refresh'></i>    انتخاب فایل دیگر</a></div></div></div>";

    $(document).off("click", ".uploadcontrol-input").on("click", ".uploadcontrol-input", function () {

        $(".uploadcontrol-wrapper").remove();
        $('body').append($(uploadcontrol_wrapper));
        $('.uploadcontrol').data('target', this);

    });

    $(document).on("keyup keydown", ".uploadcontrol-input", function (e) {

        e.preventDefault();

    });


    $(document).on('change', '.uploadcontrol input[type=file]', function (e) {

        var file = this.files[0];



        var uploadcontrol = $(this).parents('.uploadcontrol');


        uploadcontrol.find('.file_tumb_wrapper').remove();


        var buttons = $('.buttons', uploadcontrol).show();

        var sizeInKB = parseFloat((file.size / 1024).toFixed(2));
        var MaximumFileInMB = 1;
        if (sizeInKB > 1024 * MaximumFileInMB) {


            var fileTumb = $("<div class='file_tumb_wrapper' />")
        .append($("<span />")
        .text(file.name));

            uploadcontrol.append(fileTumb);

        } else {
            var reader = new FileReader();

            reader.onload = function (e) {

                var fileTumb = $("<div class='file_tumb_wrapper' />")
            .append($("<img class='file_tumb' />")
            .attr("src", e.target.result));
                uploadcontrol.append(fileTumb);
            }

            reader.readAsDataURL(file);
        }

    });

    $(document).on('click', '.uploadcontrol .refresh-file', function (e) {

        var uploadcontrol = $(this).parents('.uploadcontrol');
        var buttons = $('.buttons', uploadcontrol).hide();

        uploadcontrol.find('.file_tumb_wrapper').remove();

    });

    $(document).on('click', '.uploadcontrol-wrapper', function (e) {

        var eTarget = $(e.target);
        if (eTarget.hasClass('uploadcontrol') == false && eTarget.parents().hasClass('uploadcontrol') == false) {
            $(this).remove();
        }

    });



    $(document).on('click', '.uploadcontrol .submit-file', function (e) {

        var uploadcontrol = $(this).parents('.uploadcontrol');
        var buttons = $('.buttons', uploadcontrol).hide();
        var fileupload = uploadcontrol.find('input[type=file]');
        var file = fileupload[0].files[0];



        uploadcontrol.find('.file_tumb_wrapper').remove();


        var images = new FormData();
        images.append("image", file);

        jQuery.ajax({
            url: "/manage/dynamics/uploadControl",
            type: 'POST',
            data: images,
            cache: false,
            processData: false,
            contentType: false,
            xhr: function () {  // custom xhr
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // check if upload property exists
                    myXhr.upload.addEventListener('progress', UploadControlProgress, false); // for handling the progress of the upload
                }
                return myXhr;
            },
            success: function (res) {
                var target = $(uploadcontrol.data('target')).val(res);
                $('.uploadcontrol-wrapper').remove();
            }
        });


    });

    function UploadControlProgress(evt) {
        console.log('updateProgress');
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;


        } else {
            // Unable to compute progress information since the total size is unknown
            console.log('unable to complete');
        }
    }

    //console.log("HCMS Js Base Forms Init method called at " + new Date().toString());

    $(document).off("click", "a.confirm").on("click", "a.confirm", function () {
        var link = $(this);
        event.preventDefault();

        swal({
            title: "Are you sure ?",
            text: "the oparation will not be Irreversible", type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes , im sure .",
            cancelButtonText: "No ! cancel it .",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm)
                window.location = link.attr("href");
        });

    });


    $(document).off("blur", ".input-validation-error").on("blur", ".input-validation-error", function () {

        $(this).removeClass("input-validation-error");
        $(document).on("blur", ".input-validation-error", function () {

            $(this).removeClass("input-validation-error");
        });
    });



    $(document).on("click", "form.db-form #submit", function (event) {
        var form = $(this).parents("form");

        if (form.hasClass("dynamics-form-valid") == false) {
            event.preventDefault(event);
            $(this).attr("disabled", "disabled");
            validateDynamicsForm(form, true);
            $(this).removeAttr("disabled");

        } else {
            $(this).attr("disabled", "disabled");
            $(form)[0].submit();
        }


    });

    $(document).off("click", "form.dynamics-form.db-form #validate").on("click", "form.dynamics-form.db-form #validate", function () {

        var form = $(this).parents("form.dynamics-form.db-form").first();

        validateDynamicsForm(form);

    });




    $(document).off("click", ".AddInput[data-property]").on("click", ".AddInput[data-property]", function () {

        $("select", "form.dynamics-form").select2("destroy");
        var group_name = $(this).attr("data-group");
        //[data-group={0}] input[type!=file],[data-group={0}] textarea,[data-group={0}] select
        $(String.format("[data-group={0}] input[type!=file].dinput,[data-group={0}] textarea.dinput,[data-group={0}] select.dinput", group_name))
            .not("[name*='_add_']")
            .not("[name*='_edit_']")
            .not("[type=hidden]")
            .each(function (index, element) {

                Add_Multiple_Entry_Field(element);

            });

        configMasks();
        $("select", "form.dynamics-form").select2({
            placeholderOption: 'first'
        });

    });

    $(".refresh").click(function () {
        var captchaImage = $("#captcha-image")

        if (captchaImage.attr("data-src") == undefined)
            captchaImage.attr("data-src", captchaImage.attr("src"));

        captchaImage.attr("src", captchaImage.attr("data-src") + "?" + new Date().getTime());


    });

    function Add_Multiple_Entry_Field(element) {

        var elemName = $(element).parents(".dynamics-field").attr("data-property");
        var group_name = $(element).parents(".dynamics-field-group").attr("data-group");

        var relationID = 0;

        var relationValue = $(String.format(".dynamics-field[data-property={0}]", elemName)).parents(".dynamics-field-wrapper").attr("data-relationid");

        if (relationValue != "")
            relationID = parseInt(relationValue);

        var IdToAdd = relationID + 1;

        var TargetInputDIVClone = $(element).parents(".dynamics-field-wrapper").clone();



        TargetInputDIVClone.attr("data-relationid", IdToAdd);


        $(".cke", TargetInputDIVClone).remove();




        $("label", TargetInputDIVClone).addClass("visible-xs").text($("label", TargetInputDIVClone).text() + " " + (relationID + 2));


        var TargetInputClone = $("input[type!=file],select,textarea", TargetInputDIVClone);

        //if ($("textarea.RichTextEditor", TargetInputDIVClone).size() == 1) {

        //    var textareaToRichtext = $("textarea.RichTextEditor", TargetInputDIVClone);

        //    //window.CKEDITOR.replace(textareaToRichtext.attr("id"), get_CKEDITOR_Config(textareaToRichtext));

        //    textareaToRichtext.ckeditor(get_CKEDITOR_Config(textareaToRichtext));
        //}


        $(".select-file-btn", TargetInputDIVClone).attr("data-propertyId", TargetInputClone.attr("id") + "_add_" + IdToAdd);
        TargetInputClone.attr("id", TargetInputClone.attr("id") + "_add_" + IdToAdd);
        TargetInputClone.attr("name", TargetInputClone.attr("name") + "_add_" + IdToAdd);
        $(".ajax-upload-input .fileName", TargetInputDIVClone).text("");

        if (TargetInputClone.hasClass('RichTextEditor')) {
            TargetInputClone.ckeditor(get_CKEDITOR_Config(TargetInputClone));
        }
        TargetInputClone.val("");
        //  $('.trumbowyg-editor', TargetInputDIVClone).html('');
        //    $('textarea',TargetInputClone).trumbowyg('destroy');



        $(String.format(".dynamics-field-group[data-group={0}]", group_name)).append(TargetInputDIVClone);

        $(TargetInputClone).before($(String.format(Dynamic_Input_Remove_Button, TargetInputClone.attr("id"))));

        refreshTumbnails();

    }

    function refreshTumbnails() {
        $("input[data-type=image]").each(function (index, elem) {

            var parentDiv = $(elem).parents(".dynamics-field").first();
            if ($(elem).val().endsWith('.jpg') ||
                $(elem).val().endsWith('.png') ||
                $(elem).val().endsWith('.gif') ||
                $(elem).val().endsWith('.jpeg'))
                $(".property-image-tumbnail", parentDiv).css("backgroundImage", "url('" + $(elem).val() + "?maxwidth=80&blah=')");
        });
    }


    $(document).off("keyup", "input[data-type=image]").on("keyup", "input[data-type=image]", function () {
        refreshTumbnails();
    });


    $(document).off("click", ".dynamics-field .remove").on("click", ".dynamics-field .remove", function () {

        var element = $(String.format("#{0}", $(this).attr("data-input")));

        var relationID = element.parents(".dynamics-field-wrapper").attr("data-relationid");

        $(String.format(".dynamics-field-wrapper[data-relationid={0}]", relationID)).remove();


    });

    function selectFile(targetInput) {

        $('#elfinder-wrapper').remove();

        var elfinder_div = $(document.createElement("div")).attr("id", "elfinder");
        var elfinder_div_wrapper = $(document.createElement("div")).attr("id", "elfinder-wrapper");
        elfinder_div_wrapper.append("<div id='close'>X</div>");
        elfinder_div_wrapper.append(elfinder_div);

        $("body").append(elfinder_div_wrapper);

        $("#elfinder").elfinder({
            resizable: false,
            url: "/Manage/elfinder", customData: { folder: 'UPLOADS' },
            commandsOptions: {
                getfile: {
                    oncomplete: 'destroy'
                }
            },
            getFileCallback: function (file) {
                $(targetInput).val(file.url).trigger("change");
                console.log(targetInput);
                refreshTumbnails();
                $("#elfinder-wrapper #close").trigger("click", null);

            }
        }).elfinder('instance');

    }

    $(document).off("click", ".select-file-btn").on("click", ".select-file-btn", function () {
        var btn = this;
        var targetInput = $("#" + $(btn).attr("data-propertyId"));
        selectFile(targetInput);
    });


    $(document).on('contextmenu', 'input.cke_dialog_ui_input_text', function (e) {
        e.preventDefault();
        selectFile(this);
    });

    $(document).on('click', '.select-file-onclick', function (e) {
        selectFile(this);
    });


    $(document).off("click", "#elfinder-wrapper #close").on("click", "#elfinder-wrapper #close", function () {
        $(this).parents("#elfinder-wrapper").remove();
    });


    $("input,select", "form.dynamics-form").each(function (index, elem) {

        try {
            var qs = GetQueryString($(elem).attr("name"));
            var elemName = $(elem).attr("name");

            if (qs != "") {
                $('input[name="' + elemName + '"]').val(qs);
                $('select[name="' + elemName + '"]').attr("data-value", qs);
            }
        } catch (e) {

        }

    });




    $.fn.realVal = function () {
        var $obj = $(this);
        var val = $obj.val();
        var type = $obj.attr('type');
        if (type && type === 'checkbox') {
            var un_val = $obj.attr('data-unchecked');
            if (typeof un_val === 'undefined') un_val = '';
            return $obj.prop('checked') ? val : un_val;
        } else {
            return val;
        }
    };

    function get_CKEDITOR_Config(elem) {
        var ckConfig = {};

        switch ($(elem).attr("data-mode")) {
            case "0":
                ckConfig.toolbar = 'Basic';
                break;
            case "1":
                ckConfig.toolbar = 'Standard';

                break;
            case "2":
                ckConfig.toolbar = 'Full';
                break;
        }

        switch ($(elem).attr("data-lang")) {


            case "0":
                ckConfig.language = "en";
                break;

            case "1":
                ckConfig.language = "fa";
                break;

        }


        switch ($(elem).attr("data-skin")) {

            case "0":
                ckConfig.skin = "moono";
                break;

            case "1":
                ckConfig.skin = "office2013";
                break;

            case "2":
                ckConfig.skin = "bootstrapck";
                break;

        }
        return ckConfig;
    }

    $("textarea.RichTextEditor").each(function (index, elem) {

        window.CKEDITOR_BASEPATH = '/Content/ckeditor/';
        //   $(elem).trumbowyg();
        //         window.CKEDITOR.replace($(elem).attr("id"), get_CKEDITOR_Config(elem));

        $(elem).ckeditor(get_CKEDITOR_Config(elem));

    });

    var configMasks = function () {

        $('input.money-input').inputmask("decimal", {
            radixPoint: ",",
            autoGroup: true,
            groupSeparator: ",",
            groupSize: 3,
            autoUnmask: true,
            rightAlign: false
        });


        $(":input", $(".dynamics-form")).each(function (index, elem) {


            var mask = $(elem).attr("data-mask");
            if (mask != undefined) {

                mask = mask.toLowerCase();
                switch (mask) {

                    case "rial":
                        $(elem).focus(function () {
                            $(elem).maskMoney({ thousands: ',', decimal: '.', precision: 0, allowZero: true, suffix: ' ریال' });
                        }).blur(function (e) {
                            $(elem).maskMoney('destroy');
                            var newVal = $(this).val().replace(/,/g, "").replace(" ریال", "");
                            $(elem).val("");
                            setTimeout(function () {
                                $(elem).val(newVal);
                                //field-validation-error
                                $(".field-validation-error", $(elem).parents("div")).remove();

                            }, 1);
                        });
                        break;



                    default:
                        $(elem).inputmask(mask, { removeMaskOnSubmit: true });
                        break;

                }
            }

        });
    };

    configMasks();
    init_chechlists();

  



    function init_DataDepended_Select(element, dependValue, event, eventMode) {
        var dataURL = $(element).attr("data-url");



        if (dependValue != undefined && dependValue.length < 1)
            return;

        var dataToSend = { Depend: dependValue, ParentField: $(element).attr("name") };

        $.post(dataURL, dataToSend).done(function (data) {
            $(element).AddDataToSelect(data, event, eventMode);
        });

    }

    function init_NotDataDepended_Select(element, event, eventMode) {

        var dataDepend = $(element).attr("data-depend");
        if (dataDepend == undefined || dataDepend == "" || dataDepend == "...") {
            if ($(element).attr("data-url") != undefined) {
                var dataURL = $(element).attr("data-url");

                if (dataURL == "local") {
                    $(String.format("select[data-depend={0}]", $(element).attr("name"))).each(function (index, element2) {
                        init_DataDepended_Select(element2, $(element).val());
                    });
                    return;
                } else {
                    $.post(dataURL).done(function (data) {
                        $(element).AddDataToSelect(data, event, eventMode);

                        $(String.format("select[data-depend={0}]", $(element).attr("name"))).each(function (index, element2) {
                            init_DataDepended_Select(element2, $(element).val());
                        });

                    });
                }



            }
        }
    }

    $.fn.AddDataToSelect = function (ObjectArray, event, eventMode) {
        var element = this;
        $("option", element).remove();

        if (element.attr("multiple") == undefined) {
            var chooseOption = $(document.createElement("option")).text("...").val("");
            $(element).append(chooseOption);
        }


        var value = $(element).attr("data-value");
        $.each(ObjectArray, function (i, obj) {

            var option = $(document.createElement("option")).val(obj.key).text(obj.value);

            if (value.split(',').indexOf(obj.key.toString()) != -1) {
                option.attr("selected", "selected").prop("selected", true);

            }
            $(element).append(option);

        });


        //   $(element).select2();

        return element;
    }

    $(document).on("change", "form.dynamics-form select[data-url]", function (event) {
        var elem = this;
        $(String.format("select[data-depend={0}]", $(elem).attr("name"))).each(function (index, element2) {
            init_DataDepended_Select(element2, $(elem).val());
        });
    });

    var cons = function () {
        $("select[data-url]").each(function (index, element) {
            init_NotDataDepended_Select(element);

        });

    }();

}


function fill_Form_by_Query_Strings() {
    //grab the entire query string
    var query = document.location.search.replace('?', '');

    //extract each field/value pair
    query = query.split('&');

    //run through each pair
    for (var i = 0; i < query.length; i++) {

        //split up the field/value pair into an array
        var field = query[i].split("=");
        //target the field and assign its value
        $("input, select", "form.dynamics-form").each(function (index, input) {

            if ($(input).attr("name") != undefined) {
                //console.log($(input).attr("name").toLowerCase() + " ::::: " + field[0].toLowerCase() + " =>> " + ($(input).attr("name").toLowerCase() == field[0].toLowerCase()));

                if ($(input).attr("name").toLowerCase() == field[0].toLowerCase()) {
                    $(input).val(field[1]).change();
                    console.log(input);
                }
            }


        });

    }
}

$(document).ready(function () {
    InitBaseForms();
    fill_Form_by_Query_Strings();

});