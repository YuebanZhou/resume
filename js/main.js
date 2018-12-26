$(document).ready(function() {
  tabClick();
  rebanner();
  changeimg();
});
function tabClick() {
  // 切换tab
  $("a").on("click", function() {
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
function rebanner() {
  // 渲染banner
  var imgarr = [
    "./img/imager1.png",
    "./img/imager2.png",
    "./img/imager3.png",
    "./img/imager4.png",
    "./img/imager5.png",
    "./img/imager6.png",
    "./img/imager7.png"
  ];
  var msgarr = [
    "<div><span>姓名：周琰</span><span>学历：本科学士</span><span>毕业院校：河北北方学院</span><span>专业：电子信息工程</span></div>",
    "<div><span>应聘岗位：前端工程师</span><span>期望工作地点：北京市</span><span>期望薪资：10K</span></div>",
    "<div><span>工作年限：3年</span><span>2016.10-2017.10：厦门侠网旅游有限公司</span><span>2018.03-2018.07：外派中国联通系统集成</span><span>2018.08.09-至今：河北鸿海环保科技有限公司</span></div>",
    "<div><span>电话：15369930905</span><span>邮箱：yuebanzhou@163.com</span></div>",
    "./img/imager5.png",
    "./img/imager6.png",
    "./img/imager7.png"
  ];
  var str = "";
  var len = imgarr.length;
  for (var i = 0; i < len; i++) {
    str += "<li>" + msgarr[i] + "</li>";
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

function changeimg() {
  var liW = $("#content .bannerBox ul li").width();
  var len = $("#content .bannerBox ul li").length;
  // 左右点击
  var i = 0;

  // 右
  $("#content .next").on("click", function() {
    i += 1;
    if (i > len - 1) {
      i = 0;
    }
    $("#content ul").css("left", -liW * i);
  });
  // 左
  $("#content .prev").on("click", function() {
    i -= 1;
    if (i < 0) {
      i = len - 1;
    }
    $("#content ul").css("left", -liW * i);
  });
}
