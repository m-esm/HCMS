

const resizeImage = function (img, resizeWidth, callback) {
    var img = document.getElementById('avatar');
    var type = 'image/jpeg';
    var quality = 0.92;

    img.onload = function () {
        var oc = document.createElement('canvas'), octx = oc.getContext('2d');
        oc.width = img.width;
        oc.height = img.height;
        octx.drawImage(img, 0, 0);
        while (oc.width * 0.5 > resizeWidth) {
            oc.width *= 0.5;
            oc.height *= 0.5;
            octx.drawImage(oc, 0, 0, oc.width, oc.height);
        }

        oc.width = resizeWidth;
        oc.height = oc.width * img.height / img.width;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        callback(oc.toDataURL(type, quality));

    };

};


function splitBy3_core(x) {
    x += '';
    x = x.replace(/ /g, "");
    var isManfi = false;
    if (x.toString().substr(0, 1) == "-") {
        isManfi = true;
        x = x.replace(/-/g, "");
    }

    if (x.length < 3) { var parts = [x]; return parts; }
    var startPos = (x.length % 3);
    var newStr = x.substr(startPos);
    var remainingStr = x.substr(0, startPos);

    var parts = newStr.match(/.{1,3}/g);
    if (remainingStr != '') { var length = parts.unshift(remainingStr); }

    if (isManfi)
        return "-" + parts;

    return parts;

}
function splitBy3() {
    $("span.splitBy3").not('.splited').each(function (index, elem) {
        $(elem).addClass('splited').text(splitBy3_core($(elem).text().trim()));
    });
}
$(function () {

    $('[srcset]').each(function (idx, el) {
        $(el).attr('not-srcset', $(el).attr('srcset'));
        $(el).removeAttr('srcset');
    });

    $(document).on("click touchstart", "form .captcha-field .refresh", function () {

        var form = $(this).parents("form");
        var captchaImage = $("#captcha-image", form);
        captchaImage.attr('src', captchaImage.attr('src').split('&cc=')[0] + (captchaImage.attr('src').indexOf('?') == -1 ? '?' : '') + "&cc=" + Math.random())

    });

    splitBy3();
    swal.setDefaults({ confirmButtonText: 'بسیار خب' });


    $(document).on('change', "#profile-form .sp-pic input[type=file]", function (e) {

        var reader = new FileReader();
        reader.onload = function (loadEvent) {
            $('#profile-form .sp-pic .avatar').attr('src', loadEvent.target.result);

            resizeImage(document.getElementById('avatar'), 120, function (dataURI) {

                $('#profile-form .sp-pic .avatar').attr('src', dataURI);

                $('#profile-form .sp-pic a.btn').show();

            });



        }

        reader.readAsDataURL(this.files[0]);
    });
    $(document).on('click', "#panel #newMessage", function (e) {

        $("#newMsgContent").fadeIn();

    });

    $(document).on('click', "#newMsgContent #close", function (e) {

        $("#newMsgContent").fadeOut();

    });

    $(document).on('click', "#newMsgContent #send", function (e) {

        e.preventDefault();


        var toSend = {

            content: $('#msg_content').val(),
            subject: $('#msg_subject').val()

        };

        if (!toSend.content || !toSend.subject) {

         return   swal({
                type: 'warning',
                title: '',
                text: 'لطفا موضوع و متن پیام را وارد کنید'
            });


        }

        $.post('/panel?action=sendmsg',toSend, function (data) {
         
        

                swal({
                    type: 'success',
                    title: '',
                    text: 'پیام شما با موفقیت ثبت شد'
                }, function () {

                    location.reload();

                });



         

        });


    });

    $(document).on('click', "#profile-form .sp-pic a", function (e) {


        $.post('/vitrin/register/saveAvatar', { avatar: $('#profile-form .sp-pic .avatar').attr('src') }, function () {
            swal({
                type: 'success',
                title: '',
                text: 'تصویر پروفایل شما ذخیره شد !'
            });
            $('#profile-form .sp-pic a.btn').hide();
        });


    });

    $(document).on('submit', "#profile-form", function (e) {

        e.preventDefault();
        var form = $(e.target);

        $.post(form.attr("action"),
                      form.serialize(),
                      function (data) {
                          $('.alert').removeAttr('style');
                          var target = $('#message-result');
                          if (data.result === true) {


                              swal({
                                  title: "تکمیل پروفایل",
                                  text: data.value,
                                  type: "success"
                              },
                              function () {
                              //    window.location = '/';
                              });


                          } else {
                              swal({
                                  title: "تکمیل پروفایل",
                                  text: data.value,
                                  type: "error"
                              });
                          };

                      });
    });

    $(document).on("click touchstart", '#fgpassword', function () {

        swal({
            title: "فراموشی رمز عبور !",
            text: "لطفا ایمیل یا شماره موبایل خود را وارد کنید",
            type: "input",
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "آدرس ایمیل یا شماره موبایل"
        },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("لطفا ایمیل یا شماره موبایل خود را وارد کنید !");
                    return false;
                }

                $.ajax({
                    url: "/manage/auth/ForgotPasswordAjax",
                    type: 'POST',
                    data: { email: inputValue }
                })
                    .done(function (data) {
                        if (data.result)
                            swal("با تشکر", data.msg);
                        else {
                            var error = data.msg;

                            if (Array.isArray(data.msg)) {
                                error = "";
                                $.each(data.msg,
                                    function (index, item) {
                                        error += item + "</br>";
                                    });
                            }
                            swal({ title: "خطا !", text: error, type: "error" });
                        }
                    }).error(function () {
                        swal({ title: "خطا !", text: "ارسال ایمیل/پیامک ناموفق بود لطفا بعدا دوباره تلاش کنید", type: "error" });
                    });

            });
    });

    $(document).on("click touchstart", '#confirmPassword', function () {
        swal({
            title: "فعال سازی اکانت !",
            text: "لطفا ایمیل یا شماره تماس خود را جهت فعال سازی وارد کنید",
            type: "input",
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "آدرس ایمیل"
        },
          function (inputValue) {
              if (inputValue === false) return false;

              if (inputValue === "") {
                  swal.showInputError("لطفا ایمیل یا شماره تماس خود را وارد کنید !");
                  return false;
              }

              $.ajax({
                  url: "/manage/auth/VerifyEmail",
                  type: 'POST',
                  data: { email: inputValue }
              })
                  .done(function (data) {
                      if (data.result)
                          swal("با تشکر", data.msg);
                      else {


                          swal({ title: "خطا !", text: data.msg, type: "error" });
                      }
                  }).error(function () {
                      swal({ title: "خطا !", text: "ارسال ایمیل/پیامک ناموفق بود لطفا بعدا دوباره تلاش کنید", type: "error" });
                  });

          });
    });


    $(document).on('submit', '#register-form,#login-form', function () {
        var form = $(this);

        setTimeout(function () {

            $('#captcha', form).val('');

            $('img', '#register-form,#login-form').each(function (index, elem) {
                var captchaImg = $(elem);
                captchaImg.attr('src', captchaImg.attr('src').split('&cc=')[0] + "&cc=" + Math.random())

            });;

        }, 1000);


    });

    $(document).on("submit", "form#login-form", function (e) {

        var frm = $(this);

        e.preventDefault();

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                console.log(data);
                if (data == null || data == "") {

                    swal({
                        title: "",
                        text: "شما با موفقیت وارد شدید !",
                        type: "success",
                        showConfirmButton: false
                    });

                    setTimeout(function () {
                        window.location.href = "/panel";

                    }, 1500);
                } else {
                    var ul = $("<ul />");
                    $.each(data, function (index, err) {
                        ul.append($("<li />").text(err));
                    });

                    swal({
                        title: "",
                        text: ul.html(),
                        type: 'warning',
                        html: true
                    });

                }

            },
            error: function (xhr, status, error) {
                swal("خطا !", "ارسال درخواست ورود شما با خطا مواجه شد لطفا مجددا تلاش کنید .", "error");
                console.log(error);
            }
        });


    });

    //Register
    $(document).on("submit", "form#register-form", function (e) {

        var frm = $(this);

        e.preventDefault();

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {


                if (data == null || data == "") {

                    swal({
                        title: "ثبت نام شما با موفقیت انجام شد. !",
                        text: "لینک فعال سازی حساب کاربری شما به ایمیل وارد شده ارسال گردید. لطفا فعال کردن حساب کاربری خود بر روی آن کلیک نمایید.",
                        type: "success",
                        showConfirmButton: false
                    });

                    setTimeout(function () {
                        window.location.href = window.location;
                    }, 1500);
                } else {
                    var ul = $("<ul />");
                    $.each(data, function (index, err) {
                        ul.append($("<li />").text(err));
                    });

                    swal({
                        title: "",
                        text: ul.html(),
                        type: 'warning',
                        html: true
                    });

                }

            },
            error: function (xhr, status, error) {
                swal("خطا !", "ارسال درخواست عضویت شما با خطا مواجه شد لطفا مجددا تلاش کنید .", "error");


            }
        });


    });

    $(document).on("click touchstart", "form .captcha-field .refresh", function () {

        var form = $(this).parents("form");
        var captchaImage = $("#captcha-image", form);
        captchaImage.attr('src', captchaImage.attr('src').split('&cc=')[0] + "&cc=" + Math.random())

    });




});