

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
}).success(function (res) {
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

                _html += '<div class="rate"><h4>' + obj.Name + '</h4>'
                    + '<div class="msg">' + obj.Text + '</div><ul>';

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

                _html += '</ul> </div>';
            } else {
                //درج نطر متخصصین
                _prof += '<li><strong>' + obj.Name + ' : </strong>' + obj.Text + '</li>'
            }


        })
        $('section#' + item.UnitId + ' #comments_' + item.UnitId + ' .user-comment')
        .append(_html);

        $('section#' + item.UnitId + ' #comments_' + item.UnitId + ' .prof-comment > ul')
         .append(_prof);

    })
}).error(function (err) {
    console.log(err);
})

var rank = [];
$('.stars i').click(function () {

    //find parent

    var item = parseInt($(this).attr('data-item'));
    var elm = $(this).parents('article').find('stars i')

    if (elm.hasClass('fa-star'))
        elm.removeClass('fa-star-o').addClass('fa-star-o');
    for (var i = 1; i <= item; i++) {
        $(this).parents('article').find('.stars i[data-item=' + i + ']').removeClass('fa-star-o').addClass('fa-star');
    }

    var id = $(this).parents('article').attr('id');
    console.log(id);
    var title = $(this).parents('article').attr('data-title');
    var _exist = rank.find(a=>a.unitPicId == id)
    if (_exist === undefined)
        rank.push({ unitPicId: id, title: title, score: item });
    else {
        var index = rank.indexOf(_exist);
        rank[index].score = item;
    }
    console.log(rank);
    //find section
    var _secId = $(this).parents('section.hasChild').attr('id');
    var _com = $('#comments_' + _secId).find('.rate ul');
    _com.empty();
    var _append = "";
    $.each(rank, function (index, item) {
        _append += '<li id="' + item.id + '" data-score="' + item.score + '">'
            + '<lable>' + item.title + '</lable>'
        + '<span>'

        for (var i = 1; i <= 5; i++) {
            if (i <= item.score)
                _append += '<i class="fa fa-star"></i>';
            else
                _append += '<i class="fa fa-star-o"></i>';
        }

        _append += '</span></li>';

    })

    _com.append(_append);
    //for (var j = 1; j <= item; j++) {
    //    _append += '<li id="' + id + '" data-score="' + j + '">' + item + '</li>'
    //}


});

$(document).on('click', '.register .submit', function () {
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
    }
    else
        $(this).parent('form').find('input[name="name"]').removeClass('has-error');

    if (model.Email == "") {
        hasError = true;
        $(this).parent('form').find('input[name="email"]').addClass('has-error');
    }
    else
        $(this).parent('form').find('input[name="email"]').removeClass('has-error');

    if (model.Text == "") {
        hasError = true;
        $(this).parent('form').find('textarea[name="text"]').addClass('has-error');
    }
    else
        $(this).parent('form').find('textarea[name="text"]').removeClass('has-error');

    if (hasError)
        return;



    $.ajax({
        method: 'POST',
        url: '/Hayat/Comment/Post',
        data: model
    }).success(function (res) {
        console.log(res);
        var _alert = _this.parents('article').find('.alert');
        _alert.show();
        //$('#resultInfo').show();
        if (res.IsSuccess) {
            _alert.addClass('alert-success').html('نظر شما با موفقیت ثبت شد. با تشکر');
        } else {
            var html = '<ul>';
            $.each(res.msg, function (index, item) {
                html += "<li>" + item + "</li>";
            })
            html += '</ul>';
            _alert.addClass('alert-danger').html(html);
        }
    }).error(function (err) {
        console.log(err);
    });
})

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


