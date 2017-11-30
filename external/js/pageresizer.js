let act_width,
    act_height,
    act_mobile_desktop = "desktop",
    max_desktop_width = 1000,
    start = true


$(window).resize(function () { resize_listener() })
$(document).ready(function () {
  resize_listener()
})

function resize_listener() {
  act_width = window.innerWidth
  act_height = window.innerHeight
  main_content_width_change()
  main_content_height_change()
  if(act_width<max_desktop_width&&act_mobile_desktop=="desktop") act_mobile_desktop=="mobile"
  if(act_width>max_desktop_width&&act_mobile_desktop=="mobile") act_mobile_desktop=="dektop"
  start=false;
}

function main_content_width_change() {
  main_content_width_change(-1)
}

function main_content_width_change(new_sidebar_width) {
  let main_content=$("#main_content")
  if(new_sidebar_width>(-1)) main_content_width=act_width-new_sidebar_width-$("#main_sidebar_button_container").width()
  else main_content_width=act_width-$("#main_sidebar").width()-$("#main_sidebar_button_container").width()
  $(main_content).css({
    "width":main_content_width+"px"
  })


  $(".settings_base").css("height", $(".settings_base").first().width())
  $(".settings_img").css("width", $(".settings_img").first().height())

}
function mobile_desktop_swapper() {

}

function main_content_height_change() {
  let main_content=$("#main_content"),
      main_content_height=window.innerHeight-$("#main_topbar").height()
  $(main_content).css({
    "height":main_content_height+"px"
  })

  $("body").css({
    "height":window.innerHeight+"px"
  })
}
