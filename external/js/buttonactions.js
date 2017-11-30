function GetToOrderBase(element){
  if(element.classList.contains("order_base")){
    return element
  }
  else{
    let nextElement=element.parentElement
    return GetToOrderBase(nextElement)
  }
}

$(document.body).on('click', '.order_comment_show' ,function(){
  let element=this
  let base=GetToOrderBase(element)

  $(base).fadeOut(300)
})

// TODO: Saving the data is not working for multiple orders
let savedhiddeninput=null,
    savedcommentsbutton=null
$(document.body).on('click', '.order_check' ,function(){
  let element=this
  element.classList.toggle("flip")
  element.classList.toggle("checked")

  let base=GetToOrderBase(element),
      userinfo=base.children[0].children[0].children[0].children[0],
      userpic=base.children[0].children[0].children[0].children[0].children[0],
      username=base.children[0].children[0].children[0].children[0].children[1],
      settings=base.children[0].children[0].children[0].children[0].children[2],
      ordertext=base.children[0].children[0].children[0].children[1].children[0],
      hiddencommentinput=base.children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].children[0],
      showcommentsbutton=base.children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].children[1].children[0]

  if(element.classList.contains("checked")){
    savedhiddeninput=$(hiddencommentinput).html()
    savedcommentsbutton=$(showcommentsbutton).html()
    //$(base).fadeOut(1000)
    $(userpic).hide(300)
    $(username).fadeOut(300)
    $(settings).fadeOut(300)
    $(ordertext).fadeOut(300)
    //$(hiddencommentinput).fadeOut(1000)
    $(userinfo).css("height","0")
    //$(showcommentsbutton).fadeOut(500)
    $(hiddencommentinput).css("opacity", "1")
    $(hiddencommentinput).html($(username).html())
    $(hiddencommentinput).css("padding-left","5px")

    $(showcommentsbutton).fadeIn(300)
    //showcommentsbutton.classList.remove("trans")
    //$(showcommentsbutton).html('<i class="fa fa-trash" aria-hidden="true"></i>')
    
    
    //$(hiddencommentinput).fadeIn(0)
    $(base.children[1]).hide()
  }else{
    $(userpic).fadeIn(500)
    $(username).fadeIn(500)
    $(settings).fadeIn(500)
    $(ordertext).fadeIn(500)
    $(userinfo).css("height","50px")
    $(hiddencommentinput).css("opacity", "0")
    $(hiddencommentinput).html(savedhiddeninput)
    //showcommentsbutton.classList.add("trans")
    //$(showcommentsbutton).html(savedcommentsbutton)
    $(showcommentsbutton).fadeOut(300)
  }

})

$(document.body).on('click', '#main_topbar_heading', function(){
  let element=this
  change_to_site($(element).attr("href"))
})

$(document.body).on('click', '.order_options_button', function(){
  let element=this;
  element.classList.toggle("order_options_button_clicked")
  element.parentElement.children[1].classList.toggle("show")
  if(element.parentElement.children[1].classList.contains("show")){
    $("#dropdown_bg").addClass("show")
    $("#dropdown_bg").animate({opacity:"0.1"},350)
  }else{
    $("#dropdown_bg").removeClass("show")
    $("#dropdown_bg").animate({opacity:"0"},350)
  }
})

$(document.body).on('click', '#dropdown_bg', function(){
  $("#dropdown_bg").removeClass("show")
  $("#dropdown_bg").animate({opacity:"0"},350)
  $(".order_options_button").each(function(){
    if(this.classList.contains("order_options_button_clicked"))
      this.classList.toggle("order_options_button_clicked")
    if(this.parentElement.children[1].classList.contains("show"))
      this.parentElement.children[1].classList.toggle("show")
  })
})

function main_sidebar_button_click(){
  let element=$("#main_sidebar_button").get(0),
      sidebar=$("#main_sidebar"),
      newwidth=0
  element.children[0].classList.toggle("trans")
  if(!element.children[0].classList.contains("trans")){
    let main_content_width_tmp=act_width-50-$("#main_sidebar_button_container").width()
    let main_content=$("#main_content")
    $(element).css({"height":"100px"})
    $("#main_sidebar").animate({width:"50"},350,'swing')
    $(main_content).animate({width: main_content_width_tmp+"px"},370)
    $(".sidebar_list_a").hide()
    $(".sidebar_list_item_arrow_right").hide()
    change_url_search_var("nav","hide")
    newwidth=50
  }
  else{
    let main_content_width_tmp=act_width-220-$("#main_sidebar_button_container").width()
    let main_content=$("#main_content")
    $(main_content).animate({width: main_content_width_tmp+"px"},330)
    
    $(element).css({"height":"100%"})
    $("#main_sidebar").animate({width:"220"},350,'swing', function(){
      $(".sidebar_list_a").show()
      $(".sidebar_list_item_arrow_right").show()
    })
    change_url_search_var("nav","show")
    newwidth=220
  }
  //main_content_width_change(newwidth)
}

$(document.body).on('click', '#main_sidebar_button' ,function(){
  main_sidebar_button_click()
})
$(document).ready(function () {
  if(get_url_search_var("nav")=="hide") main_sidebar_button_click()
})

$(document.body).on('click', '#popup_box_close_icon' ,function(){
  close_popup_box()
})

$(document.body).on('click', '#popup_box_bg' ,function(){
  close_popup_box()
})


function enable_order_input_button(){
  $("#home_content_right_top_enter").removeClass("gray")
  $(document.body).on('click', '#home_content_right_top_enter', function(){
    open_popup_box()
    fill_popup_box(`Enter id: <input id="order_id_input_value" name="orderid" type="text" maxlength="1000"></div>
      <div class="ambrosia_button border" id="order_id_input_submit">Bestätigen</div>`)
    $("#order_id_input_value").keyup(function(event){
      if(event.keyCode == 13){
        send_button_press_search_id()
      }
    })
    $("#order_id_input_value").focus();
    $(document.body).on('click', '#order_id_input_submit', send_button_press_search_id)
  })
}

function send_button_press_search_id(){
  let input=$("#order_id_input_value").val()
  let order
  for(let i=0; i<orders_arr.length; i++){
    if(orders_arr[i].orderId==input){
      order=orders_arr[i]
    }
  }
  if(order!=null){
    $("#home_content_right_top_order").empty();
    insert_single_order_to_div(order, "#home_content_right_top_order", 0, "order-"+order.orderId+"-topright")
    $("#order-"+order.orderId+"-topright").css("height","90%")
    $("#order-"+order.orderId+"-topright").children(0).css("height","98%")
    $("#order-"+order.orderId+"-topright").children(0).children(0).css("height","100%")
    $("#order-"+order.orderId+"-topright").find(".order_bottom_part").hide()
    $("#order-"+order.orderId+"-topright").addClass("top_right_order")
    
    update_order_countdowns()

    $("#home_content_right_top_taken").removeClass("gray")

    $(document.body).on('click', '#home_content_right_top_taken' ,function(){
      $("#order-"+order.orderId+"-topright").fadeOut(200, function(){
        $("#order-"+order.orderId+"-topright").remove()
        $("#order-"+order.orderId).remove()
        $("#home_content_right_top_taken").addClass("gray")

        /*
        TODO: SET THE ORDER TO TAKEN

        - remove from arrays
        - set date to null in db
        */
      })
    })
    close_popup_box()
  }
}