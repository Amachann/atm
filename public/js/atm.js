$(function() {
    // メニュークリック時の切り替えイベントを設定する
    $(".menuItem").on("click", function() {
        switchingShowContent(this);
    });

    // 口座開設ボタンクリック時の画面切り替えイベントを設定する
    $("#accountOpening").on("click", function() {
        $("#accountOpeningArea").addClass("none");
        $("#accountMenu").removeClass("none");
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