jQuery(function($){
	$(document).on('click', '#HeaderBtn', function(){
		$(this).toggleClass("active");
	  $("#AsideMenu").toggleClass("active");
	  $("#LayoutWrap").toggleClass("active");
	  $("#table_pending_custom").toggleClass("active");
	  $("#Footer").toggleClass("active");
	});
	$(document).on('click', '.hidden-menu', function () {
		$('#HeaderBtn').removeClass("active")
		$("#AsideMenu").removeClass("active")
		$("#LayoutWrap").removeClass("active")
		$("#table_pending_custom").removeClass("active")
		$("#Footer").removeClass("active")
	});

	$(window).on("resize",function(){
		if($(window).width() < 961){
			if($("#AsideMenu").hasClass("active")){
				$("#HeaderBtn").removeClass("active");
				$("#AsideMenu").removeClass("active");
				$("#table_pending_custom").removeClass("active");
			}
			$("#Footer").removeClass("active");
		}else{
			$("#LayoutWrap").removeClass("active");
			$("#Footer").removeClass("active");
			if($("#AsideMenu").hasClass("active")){
				$("#HeaderBtn").removeClass("active");
				$("#AsideMenu").removeClass("active");
				$("#table_pending_custom").removeClass("active");
				$("#Footer").addClass("active");
			}
		}
	});

  var Header_H
  $(window).on("load resize",function(){
	  /* header */
	  Header_H = $(".header_wrap").outerHeight();

	  $('a[href^="#"]').on("click",function(){
	  	var speed = 500;
	  	var href= $(this).attr("href");
	  	var target = $(href == "#" || href == "" ? 'html' : href);
	  	if(target.length){
		  	var position = target.offset().top;
	  	}

	  	$("body,html").stop().animate({scrollTop:position}, speed, 'swing');
	  	return false;
	  });
  });

  $(document).on('click', '.TabBtn', function(){
	  var TargetTab = $(this).data("tab");
	  $(this).addClass("active").siblings().removeClass("active");
	  $("."+TargetTab).addClass("active").siblings().removeClass("active");
  });

  $(document).on('click', '.PopBtn', function(){
    var TargetPop = $(this).data("pop");
    $("#"+TargetPop+"Filter").fadeIn();
    $("#"+TargetPop+"Window").show();
  });

  $(document).on('click', '.PopCloseBtn', function(){
    $(this).parents().prev(".PopupFilter").fadeOut();
    $(this).parents(".PopupWrap").hide();
  });

  $(".AsideBtn").on("click",function(){
	  $(this).toggleClass("active").next().stop().slideToggle();
  });

  $(window).on("scroll",function(){
	  if($(window).scrollTop() > 60 ){
			$("#ScoutSearchSp").addClass("active");
		}else{
			$("#ScoutSearchSp").removeClass("active");
		}
  });

  $(document).on('click', '.OpenBtn', function(){
    $(this).toggleClass("active").prev().stop().slideToggle();
  });

  $(".RadioInput").on("change",function(){
	  var TargetRadio = $(this).data("radio");
	  if( TargetRadio == "type02" ){
		  $(".RadioTarget").show();
	  }else{
		  $(".RadioTarget").hide();
	  }
  });

  $(".PopSwitchBtn input").on("change",function(){
	  $(this).parents(".PopSwitchBtn").find(".SwitchText").toggleClass("active");
  });

  $("#SearchBtn").on("click",function(){
	  $("#SearchWrap").fadeIn();
  });
  $("#SearchCloseBtn").on("click",function(){
	  $("#SearchWrap").fadeOut();
  });
  $(document).on('click', '.PwdBtn', function(){
    $(this).toggleClass("active").find("img").toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).prev("input").attr("type", "text");
    } else {
       $(this).prev("input").attr("type", "password");
    }
  });

//   $('.ColorBtn').contextmenu(function(){
//   	$(this).find(".ColorBox").show();
//   	return false;
// 	});
//   $(document).on('click', '.ColorSubmitBtn', function(){
//     // var ColorVal = $(this).prev().find("input:checked").val();
//     // $(this).parents(".ColorBox").hide().parent().css({"background": ColorVal});
//     $(this).parents(".ColorBox")
//   });
//   $(document).on('click', '.ColorClearBtn', function(){
//     // $(this).parents(".ColorBox").hide().parent().css({"background": '#fff'});
//     $(this).parents(".ColorBox")
//   });
//   $(document).on('click', '.ColorCloseBtn', function(){
//     $(this).parents(".ColorBox").hide();
//   });

});
