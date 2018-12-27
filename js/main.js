$(document).ready(function () {
  var contentHeight = $(window).height() - $("#head").height();
  $("#content").height(contentHeight)
  $("#content .contentBox").height(contentHeight)
  $("#content .contentBox .bannerBox").height(contentHeight)
  $("#content .contentBox .bannerBox ul").height(contentHeight)
  // $("#content .contentBox .bannerBox ul li").height(contentHeight)
  $("#content .contentBox .bannerBox span").height(contentHeight)
  
  // 切换tab栏效果
  tabClick();
  // 渲染banner内容
  rebanner();
  // 左右切换banner
  changeimg();
  // 渲染experience内容
  reexperience()
});
// 切换tab栏效果
function tabClick() {
  // 切换tab
  $("a").on("click", function () {
    $("li").removeClass("now");
    $(this)
      .parent()
      .addClass("now");
    $("#content")
      .find(".contentBox")
      .hide(500);
    var index = $(".now").index();
    $("#content")
      .find(".contentBox")
      .eq(index)
      .show(500);
  });
}
// 渲染banner内容
function rebanner() {
  var imgarr;
  var msgarr;
  $.ajax({
    url: "./json/msg.json",
    type: "post",
    dataType: "json",
    async: false,
    success: function (data) {
      imgarr = data.imgarr;
      msgarr = data.msgarr;
    }
  })
  // 渲染banner
  var str = "";
  var len = imgarr.length;
  for (var i = 0; i < len; i++) {
    var temp = "";
    for (var j = 0; j < msgarr[i].length; j++) {
      temp += "<span>" + msgarr[i][j] + "</span>";
    }
    str += "<li><div>" + temp + "</div></li>";
  }
  // 渲染li标签，渲染背景图片
  $("#content .banner .bannerBox ul").html(str);
  for (var i = 0; i < len; i++) {
    $("#content .banner .bannerBox ul li")
      .eq(i)
      .css({
        "background-image": "url('" + imgarr[i] + "')"
      });
  }
  var basicWidth = $(".bannerBox").width();
  $("#content .banner .bannerBox ul li").width(basicWidth);
  $("#content .banner .bannerBox ul").width(basicWidth * (len + 2));
}
// 左右切换banner
function changeimg() {
  var liW = $("#content .bannerBox ul li").width();
  var len = $("#content .bannerBox ul li").length;
  // 左右点击
  var i = 0;

  // 右
  $("#content .next").on("click", function () {
    i += 1;
    if (i > len - 1) {
      i = 0;
    }
    $("#content ul").css("left", -liW * i);
  });
  // 左
  $("#content .prev").on("click", function () {
    i -= 1;
    if (i < 0) {
      i = len - 1;
    }
    $("#content ul").css("left", -liW * i);
  });
}
// 渲染experience内容
function reexperience() {
  var exparr = [];
  $.ajax({
    url: "./json/msg.json",
    type: "post",
    dataType: "json",
    async: false,
    success: function (data) {
      exparr = data.exparr;
    }
  });
  var str = ""
  for (var i = 0; i < exparr.length; i++) {
    str += "<div class='block'><p class='title'><span class='time'>" + exparr[i].time + "</span>"
    str += "<span class='company'>" + exparr[i].company + "</span></p>"
    var temp = "";
    for (var j = 0; j < exparr[i].work.length; j++) {
      temp += "<div class='sinblock'><span class='time'>" + exparr[i].work[j].time + "</span>"
      temp += "<span class='objectName'>" + exparr[i].work[j].objectName + "</span>"
      temp += "<div class='objectDetail'><span class='text'>项目简介：</span>" + exparr[i].work[j].objectDetail + "</div>"
      temp += "<div class='objectModel'><span class='text'>项目模块：</span>" + exparr[i].work[j].objectModel + "</div>"
      temp += "<div class='myModel'><span class='text'>我负责的模块：</span>" + exparr[i].work[j].myModel + "</div>"
      temp += "<div class='myIssue'><span class='text'>遇到的问题：</span>" + exparr[i].work[j].myIssue + "</div>"
      temp += "<div class='solve'><span class='text'>解决办法：</span>" + exparr[i].work[j].solve + "</div></div>"
    }
    str += temp;
    str += "<i></i></div>"
  }

  $(".experienceBox .boxcontain").html(str);
  $(".experienceBox .boxcontain .block").on("mouseenter",function(){
    $(this).find("i").addClass("lime")
  })
  $(".experienceBox .boxcontain .block").on("mouseleave",function(){
    $(this).find("i").removeClass("lime")
  })
  
}