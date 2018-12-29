$(document).ready(function () {
  // 设定banner高度
  var contentHeight = $(window).height() - $("#head").height();
  $("#content").height(contentHeight);
  $("#content .contentBox").height(contentHeight);
  $("#content .contentBox .bannerBox").height(contentHeight);
  $("#content .contentBox .bannerBox ul").height(contentHeight);
  // $("#content .contentBox .bannerBox ul li").height(contentHeight)
  $("#content .contentBox .bannerBox span").height(contentHeight);
  var imgarr = [];
  var msgarr = [];
  var exparr = [];
  var skillarr = [];
  var contactarr = [];
  var endarr = [];
  $.ajax({
    url: "./json/msg.json",
    type: "post",
    dataType: "json",
    async: false,
    success: function (data) {
      imgarr = data.imgarr;
      msgarr = data.msgarr;
      exparr = data.exparr;
      skillarr = data.skillarr;
      contactarr = data.contactarr;
      endarr = data.endarr;
    }
  });
  // 切换tab栏效果
  tabClick();
  rebanner(imgarr, msgarr);
  reexperience(exparr);
  // reinterest(skillarr);
  recontact(contactarr);
  reend(endarr);
  reinterest2(skillarr);
  $(window).resize(function () {
    var width = document.body.clientWidth;
    $("#content .bannerBox").width(width);
    $("#content .bannerBox ul li").width(width);
  })
});
// 切换tab栏效果
function tabClick() {
  // 切换tab
  $("#head li").on("click", function () {
    $("li").removeClass("now");
    $(this).addClass("now");
    $("#content").find(".contentBox").hide(500);
    var index = $(this).index();
    $("#content").find(".contentBox").eq(index).show(500);
  });
}
// 渲染banner内容
function rebanner(imgarr, msgarr) {
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
function reexperience(exparr) {
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
  $(".experienceBox .boxcontain .block").on("mouseenter", function () {
    $(this).find("i").addClass("lime")
  })
  $(".experienceBox .boxcontain .block").on("mouseleave", function () {
    $(this).find("i").removeClass("lime")
  })

}
// 渲染interest内容
function reinterest(skillarr) {
  var str = "";
  for (var i = 0; i < skillarr.length; i++) {
    str += `
        <li>
          <div class="frount">
              <div class="behind" data-percent="` + skillarr[i].percent + `"></div>
          </div>
          <p>` + skillarr[i].skillName + `</p>
        </li>
        `
  }
  $("#content .interest ul").html(str)
  $("#content .interest .behind").each(function () {
    var percent = parseInt($(this).attr("data-percent"));
    $(this).css({
      "top": 180 - percent * 1.8
    });
    if (percent <= 20) {
      $(this).css({
        "background": "#EB524D"
      })
    } else if (percent > 20 && percent <= 40) {
      $(this).css({
        "background": "#F07643"
      })
    } else if (percent > 40 && percent <= 60) {
      $(this).css({
        "background": "#F9BE0A"
      })
    } else if (percent > 60 && percent <= 80) {
      $(this).css({
        "background": "#CDCD47"
      })
    } else if (percent > 80 && percent <= 100) {
      $(this).css({
        "background": "#748950"
      })
    }
  })
}
// 渲染contact内容
function recontact(contactarr) {
  var str = "";
  for (var i = 0; i < contactarr.length; i++) {
    str += `
    <div class="cblock">
      <div class="top" style="color:#ccc"><i class="iconfont iconfont3 icon-` + contactarr[i].name + `"></i><br><span>` + contactarr[i].num + `</span></div>
      <div class="bottom"><img src="` + contactarr[i].img + `" alt=""></div>
    </div>
    `
  };
  $("#content .contactBox").html(str);

}
// 渲染end内容
function reend(endarr) {
  var str = "";
  for (var i = 0; i < endarr.length; i++) {
    str += `<div>
      <a href="` + endarr[i].src + `" class="iconfont iconfont4 icon-` + endarr[i].name + `"></a>
    </div>
    `
  };
  //$("#content .endBox div").html(str)
}

function reinterest2(skillarr) {
  var str = "";
  for (var i = 0; i < skillarr.length; i++) {
    
    var temp="";
    for(var j=0;j<skillarr[i].data.length;j++) {
      temp += `<div percent="` + skillarr[i].data[j].percent + `">` + skillarr[i].data[j].skillName + `</div>`
    }
    str += "<li class='clearfloat'>"+temp+"</li>"
  }
  $(".interestBox ul").html(str);
  $(".interestBox li div").each(function () {
    var percent = $(this).attr("percent");
    var html=$(this).html();
    $(this).mouseenter(function () {
      $(this).html(percent)
    });
    $(this).mouseleave(function () {
      $(this).html(html)
    })
  })
}