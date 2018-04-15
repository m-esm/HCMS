

//click on next and prev button
$(document).on('tap click', '.arrow .left', function (e) {
    keyLeftRight = true;
    changeArticlePage(false, 'left');
})

$(document).on('tap click', '.arrow .right', function (e) {
    keyLeftRight = true;
    changeArticlePage(false, 'right');
})

if (window.location.pathname !== "/") {

    $('header').addClass('navhide');
    $('.homelogo').fadeIn();

}

var userComments = [];




//get all User Comment
$.ajax({
    method: 'GET',
    url: '/Hayat/Comment/GetConfirm',
}).done(function (res) {
    console.log(res);
    $.each(res, function (index, item) {
        var find = userComments.find(a=>a.UnitId == item.UnitId);
        if (find == undefined)
            userComments.push({ UnitId: item.UnitId, model: [item] });
        else {
            var _find = userComments.find(a=>a.UnitId == item.UnitId)
            var index = userComments.indexOf(_find);
            userComments[index].model.push(item)
        }
    });
    //fill comment to
 
    $.each(userComments, function (index, item) {
        var _html = '';
        var _prof = '';
        $.each(item.model, function (i, obj) {
            if (obj.IsUser) {

                _html += '<div class="rate">' +
                    '<div class="col-md-9 col-sm-12">' +
                        '<div class="msg">' +
                            '<div class="name">' +
                                '<strong>' + obj.Name + '</strong>' +
                            '</div>' +
                            '<div class="ios-msg">' + obj.Text + '</div>' +
                        '</div>' +
                    '</div>';

                if (obj.Ranks.length > 0) {
                    _html += '<div class="col-md-3 col-sm-12">' +
                             '<h5 class="full-width">'
                                + 'امتیاز ها' +
                             '</h5>' +
                             '<ul >';
                    $.each(obj.Ranks, function (j, rank) {
                        _html += '<li><label>' + rank.Title + '</label><span>';
                        for (var i = 1; i <= 5; i++) {
                            if (i <= rank.Score)
                                _html += ' <i class="fa fa-star"></i>';
                            else
                                _html += ' <i class="fa fa-star-o"></i>';
                        }

                        _html += '</span></li>'
                    })
                    _html += '</ul></div>';
                }
            

                _html += ' </div>';
            } else {
                //درج نطر متخصصین
                _prof += '<li><strong>'
                    + obj.Name
                    + ' : </strong>'
                    + '<label class="ios-msg">'
                    + obj.Text
                    + '</label>'
                    + '</li>'
            }


        })
        $('section#' + item.UnitId + ' #comments_' + item.UnitId + ' .user-comment')
        .append(_html);

        $('section#' + item.UnitId + ' #comments_' + item.UnitId + ' .prof-comment > ul')
         .append(_prof);

    })
})
var rank = [];
$('.stars i').click(function () {

    //find parent
    var item = parseInt($(this).attr('data-item'));
    var elm = $(this).parents('article').find('stars i');

    //clear all stars
    $(this).parents('article').find('.stars i').removeClass('fa-star').addClass('fa-star-o');

    if (elm.hasClass('fa-star'))
        elm.removeClass('fa-star').addClass('fa-star-o');
    for (var i = 1; i <= item; i++) {
        $(this).parents('article').find('.stars i[data-item=' + i + ']').removeClass('fa-star-o').addClass('fa-star');
    }

    var id = $(this).parents('article').attr('id');
    var title = $(this).parents('article').attr('data-title');
    var _exist = rank.find(a=>a.unitPicId == id)
    if (_exist === undefined)
        rank.push({ unitPicId: id, title: title, score: item });
    else {
        var index = rank.indexOf(_exist);
        rank[index].score = item;
    }
    //find section
    var _secId = $(this).parents('section.hasChild').attr('id');
    var _com = $('#comments_' + _secId).find('.rate ul');
    _com.empty();
    var append = "";
    console.log(rank);
    $.each(rank,
        function(index, item) {
            append += '<li id="' +
                item.id +
                '" data-score="' +
                item.score +
                '">' +
                '<lable>' +
                item.title +
                '</lable>' +
                '<span>';


            for (var i = 1; i <= 5; i++) {
                if (i <= item.score)
                    append += '<i class="fa fa-star"></i>';
                else
                    append += '<i class="fa fa-star-o"></i>';
            }

            append += '</span></li>';

        });

    _com.append(append);
    //for (var j = 1; j <= item; j++) {
    //    _append += '<li id="' + id + '" data-score="' + j + '">' + item + '</li>'
    //}


});

$(document).on('click',
    '.register .submit',
    function() {
        var model = {};
        model.Name = $(this).parent('form').find('input[name="name"]').val();
        model.Email = $(this).parent('form').find('input[name="email"]').val();
        model.Text = $(this).parent('form').find('textarea[name="text"]').val();
        model.UnitId = $(this).parents('section').attr('id');
        model.IsUser = true;
        model.Ranks = rank;
        var hasError = false;

        var _this = $(this);
        if (model.Name == "") {
            hasError = true;
            $(this).parent('form').find('input[name="name"]').addClass('has-error');
        } else
            $(this).parent('form').find('input[name="name"]').removeClass('has-error');

        if (model.Email == "") {
            hasError = true;
            $(this).parent('form').find('input[name="email"]').addClass('has-error');
        } else
            $(this).parent('form').find('input[name="email"]').removeClass('has-error');

        if (model.Text == "") {
            hasError = true;
            $(this).parent('form').find('textarea[name="text"]').addClass('has-error');
        } else
            $(this).parent('form').find('textarea[name="text"]').removeClass('has-error');

        if (hasError)
            return;


        $.ajax({
            method: 'POST',
            url: '/Hayat/Comment/Post',
            data: model
        }).done(function(res) {

            if (res.IsSuccess) {
                //$('#register-alert').addClass('alert-success').html('نظر شما با موفقیت ثبت شد. با تشکر');
                swal("", 'نظر شما با موفقیت ثبت شد. با تشکر', "success");
                $(this).closest('form').find("input[type=text], textarea").val("");
            } else {
                var html = '';
                $.each(res.msg,
                    function(index, item) {
                        html += item + "/";
                    })
                html += '';
                swal("", html, "error");
            }
        }).fail(function(err) {
            console.log(err);
        });
    });

//$('.tabs .tab').click(function () {
//    alert(0);
//    if ($(this).hasClass('active'))
//        return;

//    alert(1);
//    $('.tabs .tab').removeClass('active');
//    $('.tabs .elm').removeClass('active');

//    var target = $(this).attr('data-target');
//    $("span[data-target='" + target + "'").addClass('active');
//    $("div[data-element='" + target + "'").addClass('active');

//    alert(target)

//});

$(document).on('click tab', '.tabs .tab', function () {
    if ($(this).hasClass('active'))
        return;

    $('.tabs .tab').removeClass('active');
    $('.tabs .elm').removeClass('active');

    var target = $(this).attr('data-target');

    $("span[data-target='" + target + "']").addClass('active');
    $("div[data-element='" + target + "']").addClass('active');
})

//click for next and prev page
$('.page-right').click(function () {
    changeArticlePage(false, 'right');
});

$('.page-left').click(function () {
    changeArticlePage(false, 'left');
});

var IsValid = function () {
    var isValid = true;
    var form = $('#visit-form');
    var inputs = $(form).find('input:required');
    $.each(inputs, function (index, item) {
        if ($(item).val() === '') {
            isValid = true;
            $(item).addClass('has-error');
        }
        else
            $(item).removeClass('has-error');
    })
    return isValid;
}

function csharpDate(jsonDate) {

    var date = new Date(parseInt(jsonDate.substr(6)));
    return date;
};


