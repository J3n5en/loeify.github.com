/* http://lorem.in  @author Loeify@gmail.com */ 
var API={section_height:0,section_pos:"#home",scroll_mark:!0,slider_pos:0,setSize:function(a){$(a).css("height",window.innerHeight),$(a).css("width",window.innerWidth)},touchDevice:function(){return!!("ontouchstart"in window)}};API.doAction=function(a,b){if(a){var b="#"+$("#"+b).next()[0].id;if("#pot"==b)return}else{if(!$(API.section_pos).prev()[0])return;var b="#"+$(API.section_pos).prev()[0].id}var c=API.getPorperty(b);API.sectionMove(c.pos*API.section_height),API.section_pos=b,API.pushUrl(c.title,c.url,c.pos)},API.getPorperty=function(a){var b,c,d;switch(a){case"#home":b=0,c="Lorem Ipsum 2014",d="/";break;case"#portfolio":b=1,c="Portfolio | Lorem Ipsum 2014",d="/portfolio/";break;case"#about":b=2,c="About | Lorem Ipsum 2014",d="/about/"}return{pos:b,title:c,url:d}},API.pushUrl=function(a,b,c){history.pushState({pos:c,title:a},a,b),document.title=a},API.sectionMove=function(a,b){var b=b||function(){};$("body, html").animate({scrollTop:a},700,"easeInOutQuint",function(){b()})},API.tapPlot=function(a,b,c){$(a).hammer({prevent_default:!0}).on("tap",function(a){var d=a.position[0].x,e=a.position[0].y;$(b).css({visibility:"visible",width:"30px",height:"30px",left:d-15+"px",top:e-15+"px",opacity:.4}).animate({height:"40px",width:"40px",opacity:0,left:"-=5px",top:"-=5px"},300,function(){$(b).css("visibility","hidden")}),c(a.target.id,d)})},API.sliderMove=function(a,b){$(a).animate({left:-b*window.innerWidth},700,"easeInOutQuint",function(){0==b&&$(a).css("left",0)})},API.sliderAction=function(a,b){b?API.slider_pos++:API.slider_pos--;var c=$(a).length;return API.slider_pos>c-1?void(API.slider_pos=c-1):API.slider_pos<0?void(API.slider_pos=0):void API.sliderMove("#slider",API.slider_pos)},$(function(){function a(){API.section_height=window.innerHeight,API.setSize("#home, #portfolio, #about"),""!=API.section_pos&&(API.sectionMove(API.getPorperty(API.section_pos).pos*API.section_height),$("#slider").css("width",$(".item").length*window.innerWidth),API.sliderMove("#slider",API.slider_pos),$(".item").each(function(){$(this).css("width",window.innerWidth).find("img").css({marginLeft:-$(this).find("img").width()/2+"px",marginTop:-$(this).find("img").height()/2+"px"}).on("load",function(){$(this).css({marginLeft:-$(this).width()/2+"px",marginTop:-$(this).height()/2+"px"})})}))}a(),$(window).on("resize orientationchange",function(){setTimeout(a,0)}),window.scrollTo(0,0),$("#home").css("top",0),API.tapPlot("#home, #portfolio, #about","#pot",function(a,b){"portfolio"==a?API.slider_pos<$(".item").length-1&&b/window.innerWidth>.5?API.sliderAction(".item",!0):API.slider_pos>0&&b/window.innerWidth<.5?API.sliderAction(".item",!1):API.doAction(!0,a):API.doAction(!0,a)}),$(document).keydown(function(a){40==a.keyCode&&API.doAction(!0,API.section_pos.split("#")[1]),38==a.keyCode&&API.doAction(!1,API.section_pos.split("#")[1]);var b=window.location.pathname;-1!=b.indexOf("portfolio")&&(39==a.keyCode&&API.sliderAction(".item",!0),37==a.keyCode&&API.sliderAction(".item",!1))}),$("#home, #portfolio, #about").on("mousewheel DOMMouseScroll",function(a){a.preventDefault();var b=a.originalEvent.wheelDelta||-1*a.originalEvent.detail;API.scroll_mark&&(API.scroll_mark=!1,0>b&&API.doAction(!0,API.section_pos.split("#")[1]),b>0&&API.doAction(!1,API.section_pos.split("#")[1]),setTimeout(function(){API.scroll_mark=!0},1e3))}),window.addEventListener("popstate",function(){var a=window.location.pathname;a=a.substring(1,a.length-1),"/"==a&&(a="home");var b=API.getPorperty("#"+a);API.sectionMove(b.pos*API.section_height,function(){document.title=b.title})}),$("html").hammer({prevent_default:!0}).on("swipe",function(a){"up"==a.direction&&API.doAction(!0,API.section_pos.split("#")[1]),"down"==a.direction&&API.doAction(!1,API.section_pos.split("#")[1]),-1!=window.location.pathname.indexOf("portfolio")&&("left"==a.direction&&API.sliderAction(".item",!0),"right"==a.direction&&API.sliderAction(".item",!1))})});