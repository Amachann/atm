$(function() {
    // メニュークリック時の切り替えイベントを設定する
    $(".menuItem").on("click", function() {
        switchingShowContent(this);
    });

    // 口座開設ボタンクリック時の画面切り替えイベントを設定する
    $("#accountOpening").on("click", function() {
        accountOpening();
        $("#accountOpeningArea").addClass("none");
        $("#accountMenu").removeClass("none");
    });

    //預け入れ処理の呼び出しイベントを設定する
    $("#depositArea").find("button").on("click", function() {
        depositMoney();
    });

    //引き出し処理の呼び出しイベントを設定する
    $("#withdrawalArea").find("button").on("click", function() {
        withdrawal();
    });
});

// メニューを選択した時の画面表示の切り替え
// 引数はクリックされたDOM自身が入ってくるのを想定しておく
function switchingShowContent(targetElement) {
    classInit();
    // id名を自身から取得して、removeClassする対象を決定する
    let idName = $(targetElement).attr("id");
    $("#" + idName + "Area").removeClass("none");
}

// classがあるので、それを利用して一括でcss反映
function classInit() {
    $(".content").addClass("none");
}

//口座開設
function accountOpening() {
    $.ajax({
        type: "post",
        url: "bankTrading/accountOpening",
        headers: {
            "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content")
        }
    }).done(function(response) {
        console.log(response);
        // metaタグに口座のIDを書き込む
        $("meta[name='account-id']").attr("content", response["id"]);
        balanceReference();
    }).fail(function(error) {
        console.log(error);
    });
}

//残高確認
function balanceReference() {
    $.ajax({
        type: "get",
        //urlに取得してきたIDを文字列連結
        url: "bankTrading/" + $("meta[name='account-id']").attr("content")
    }).done(function(response) {
        console.log(response.deposit_balance);
        $("#checkBalanceErea").find("div p span").text(response.deposit_balance);
    }).fail(function(error) {
        console.log(error);
    });
}

//預け入れ
function depositMoney() {
    $.ajax({
        type: "post",
        url: "bankTrading/depositMoney/" + $("meta[name='account-id']").attr("content"),
        headers: {
            "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content")
        },
        data: {
            "amount": $("#depositArea").find("input[type='number']").val()
        }
    }).done(function(response) {
        console.log(response);
        console.log("残高は" + response.deposit_balance + "円です。");
    }).fail(function(error) {
        console.log(error);
    });
}

//引き出し
function withdrawal() {
    $.ajax({
        type: "post",
        url: "bankTrading/withdrawal/" + $("meta[name='account-id']").attr("content"),
        headers: {
            "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content")
        },
        data: {
            "amount": $("#withdrawalArea").find("input[type='number']").val()
        }
    }).done(function(response) {
        console.log("残高は" + response.deposit_balance + "円です。");
    }).fail(function(error) {
        console.log(error);
    });
}