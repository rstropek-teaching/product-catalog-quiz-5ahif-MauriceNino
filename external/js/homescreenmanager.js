//TODO: Delete this: ""October 14, 2017 08:00:00"" from everywhere

// https://stackoverflow.com/a/10124053/7901228
(function(){
    if (typeof Object.defineProperty === 'function'){
      try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
    }
    if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
  
    function sb(f){
      for (var i=this.length;i;){
        var o = this[--i];
        this[i] = [].concat(f.call(o,o,i),o);
      }
      this.sort(function(a,b){
        for (var i=0,len=a.length;i<len;++i){
          if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
        }
        return 0;
      });
      for (var i=this.length;i;){
        this[--i]=this[i][this[i].length-1];
      }
      return this;
    }
})();

// https://stackoverflow.com/a/30529222/7901228
function timeconvert(ds){
    var D, dtime, T, tz, off,
        dobj = ds.match(/(-?\d+)|([+-])|(\d{4})/g);

    T = parseInt(dobj[0], 10);
    tz = dobj[1];
    off = dobj[2];

    if (off) {
        off = (parseInt(off.substring(0, 2), 10) * 3600000) + (parseInt(off.substring(2), 10) * 60000);
        if(tz == '-') off *= -1;
    }
    else off= 0;
    return new Date(T += off);
}

function update_order_countdowns(){
    // TESTCODE
    let act_time=new Date("October 14, 2017 08:00:00")
    act_time.setMinutes(act_time.getMinutes()+timeAdd)
    for(let i=0; i<orders_arr.length; i++){
        let time_left=Math.floor((orders_arr[i].orderTime-act_time)/1000/60)
        let countdown=$("#order-"+orders_arr[i].orderId).find(".order_time_info_countdown");
        if(time_left>=0)
            countdown.html("In "+time_left+" Minuten")
        else
            countdown.html("Vor "+Math.abs(time_left)+" Minuten")
    }
    // One extra for the top right order
    $(".top_right_order").each(function() {
        topright_id=$(this).attr("id")
        let topright_id_onlyid=topright_id.replace("order-", "")
        topright_id_onlyid=topright_id_onlyid.replace("-topright", "")

        let time_for_id
        for(let i=0; i<orders_arr.length; i++){
            if(orders_arr[i].orderId==topright_id_onlyid){
                time_for_id=orders_arr[i].orderTime
            }
        }

        let time_left=Math.floor((time_for_id-act_time)/1000/60)
        let countdown=$("#"+topright_id).find(".order_time_info_countdown");
        if(time_left>=0)
            countdown.html("In "+time_left+" Minuten")
        else
            countdown.html("Vor "+Math.abs(time_left)+" Minuten")

    })
}

let orders_arr=[],
    orders_arr_sorted=[],
    orders_arr_upcoming_create=[],
    orders_arr_upcoming_takaway=[],

    orders_arr_new=[],
    orders_arr_sorted_new=[],
    orders_arr_upcoming_create_new=[],
    orders_arr_upcoming_takaway_new=[]

    //Testcode
let serviceurl_orders="http://ambrosia.htl-perg.ac.at/AmbrosiaREST.svc/GetOrders",
    serviceurl_toporder="http://ambrosia.htl-perg.ac.at/AmbrosiaREST.svc/GetTopOrder",
    serviceurl_orders_onlyids="http://ambrosia.htl-perg.ac.at/AmbrosiaREST.svc/GetOrderIdList"
/*
let serviceurl_orders="/AmbrosiaREST.svc/GetOrders",
    serviceurl_toporder="/AmbrosiaREST.svc/GetTopOrder",
    serviceurl_orders_onlyids="/AmbrosiaREST.svc/GetOrderIdList"*/

let serviceurl_user="/AmbrosiaREST.svc/GetUser?value=",
    order_layout="",
    comment_layout=""

let updateInterval=null

let orders_arr_tmp=[]
let error_c=0
function load_orders(callback, retrys_until_error=0){
    $.get(serviceurl_orders, function(json_orders_raw){
        error_c=0
        let json_orders=json_orders_raw.GetOrdersResult

        // Build the array
        orders_arr_tmp=[]
        for(let i=0; i<json_orders.length; i++){
            let orderId_param=json_orders[i].orderId,           // Shortcuts to the parameters
                time_param=timeconvert(json_orders[i].time),    //
                user_param=json_orders[i].orderUser,            //
                products_arr_param=json_orders[i].productList   //

            // Building the array of products to add them to the order
            let products_arr_processed=[]
            $.each(products_arr_param, function(j, product){
                products_arr_processed.push({
                    productAmount: product.Value,
                    productName: product.Key.productName,
                    productId: product.Key.productId
                })
            })

            orders_arr_tmp.push({
                orderId: orderId_param,
                userInformation: {
                    userId: user_param.userId
                },
                orderTime: time_param,
                orderProducts: products_arr_processed,
                comments: []
            })
        }
        callback()
    }).fail(function() {
        error_c++
        if(error_c>=retrys_until_error){
            raise_error("<font style='color: #FF3B3F; font-weight: bold;'>FEHLER:</font> Kein Zugriff auf die Datenbank möglich.<br><br>Vielleicht sind gerade Wartungsarbeiten am laufen?<br>Kontaktieren Sie bitte ihren Netzwerkadministrator.", "RELOAD", "homescreen_load")
            
            $("#loading_gif").hide()
        }
    })
}

// TESTCODE
let testTimeAdder, timeAdd=0

function homescreen_load(){
    $("#loading_gif").show()
    $.get("content/home_order.html", function(home_order_html){
        order_layout=home_order_html

        $.get("content/home_order_comment.html", function(comment_html){
            comment_layout=comment_html
            load_orders(function(){
                orders_arr=orders_arr_tmp.slice()
                orders_arr_sorted=orders_arr.slice()
                orders_arr_sorted.sortBy(function(o){ return o.orderTime })

                // TESTCODE
                let lowerlimit=new Date("October 14, 2017 08:00:00")
                    lowerlimit.setMinutes(lowerlimit.getMinutes()-20)
                
                let upperlimit=new Date("October 14, 2017 08:00:00")
                    upperlimit.setMinutes(upperlimit.getMinutes()+90)

                let date_seperator=new Date("October 14, 2017 08:00:00")
                    date_seperator.setMinutes(date_seperator.getMinutes()+20)

                for(let i=0; i<orders_arr_sorted.length; i++){
                    if(orders_arr_sorted[i].orderTime>date_seperator&&orders_arr_sorted[i].orderTime<upperlimit){
                        orders_arr_upcoming_create.push(orders_arr_sorted[i])
                    }
                    else if(orders_arr_sorted[i].orderTime<=date_seperator&&orders_arr_sorted[i].orderTime>lowerlimit){
                        orders_arr_upcoming_takaway.push(orders_arr_sorted[i])
                    }
                }
                insert_orders_to_div(orders_arr_upcoming_create, "#home_content_left_orders")
                insert_orders_to_div(orders_arr_upcoming_takaway, "#home_content_right_bottom_orders")
                update_order_countdowns()
                enable_order_input_button()
                
                updateInterval=setInterval(function(){ homescreen_orders_update(4) }, 5000)

                // TESTCODE (Simulate time)
                testTimeAdder=setInterval(function(){
                    timeAdd+=1
                }, 60000)
                // END TESTCODE

                $("#loading_gif").hide()
            })
        })
    })
}

function insert_orders_to_div(orders_arr, div){
    for(let i=0; i<orders_arr.length; i++){
        insert_single_order_to_div(orders_arr[i], div, i)
    }
}

function insert_single_order_to_div(order, div, index=0, predefinedId=""){
    let act_order=order_layout,
        act_order_productInfoHTML="",
        act_order_commentsHTML=""


    let orderProducts=order.orderProducts
    for(let j=0; j<orderProducts.length; j++){
        act_order_productInfoHTML+=orderProducts[j].productAmount+"x "+orderProducts[j].productName+"<br>"
    }

    let comments=order.comments
    for(let j=0; j<comments.length; j++){
        act_order_commentHTML=comment_layout
        act_order_commentHTML=act_order_commentHTML.replace("%%COMMENT_USER%%", comments[j].username)
        act_order_commentHTML=act_order_commentHTML.replace("%%COMMENT_TEXT%%", comments[j].commenttext)
        act_order_commentsHTML+=act_order_commentHTML
    }

    let orderTimeStr=('0'+order.orderTime.getHours()).slice(-2)+":"+('0'+order.orderTime.getMinutes()).slice(-2)

    //act_order=act_order.replace("%%USERNAME_ORDERED%%", orders_arr[i].userInformation.userId) // USERID NOT NAME
    if(predefinedId!="")
        act_order=act_order.replace("%%ORDER_ID%%", predefinedId)
    else
        act_order=act_order.replace("%%ORDER_ID%%", "order-"+order.orderId)
    act_order=act_order.replace("%%TIME_ORDERED%%", "Wird um "+orderTimeStr+"  abgeholt")
    act_order=act_order.replace("%%TIME_COUNTDOWN%%", " -- in 0 minuten")
    act_order=act_order.replace("%%ORDER_TEXT%%", act_order_productInfoHTML)
    act_order=act_order.replace("%%ORDER_COMMENTS%%", act_order_commentsHTML)
    act_order=act_order.replace('Ã¤', 'ä') //QUICKFIX

    if(index==0)
        $(div).prepend($(act_order).fadeIn(500))
    else
        $(div +" > div:nth-child("+(index)+")").after($(act_order).fadeIn(500));
}

let mode=0;
function homescreen_orders_update(retrys_until_error=0){
    console.log("Updating the orders list")
    // load orders in orders_arr_new
    if(mode%3!=0)
    $.get(serviceurl_toporder, function(json_order_raw){
        console.log("Get Top Id")
        let json_toporder_id=json_order_raw.GetTopOrderResult
        if(orders_arr[orders_arr.length-1].orderId!=json_toporder_id)
            homescreen_update()
    }).fail(function() {
        error_c++
        if(error_c>=retrys_until_error){
            raise_error("<font style='color: #FF3B3F; font-weight: bold;'>FEHLER:</font> Kein Zugriff auf die Datenbank möglich.<br><br>"+
                        "Vielleicht sind gerade Wartungsarbeiten am laufen?<br>"+
                        "Kontaktieren Sie bitte ihren Netzwerkadministrator.", "RELOAD", "homescreen_load")
            clearInterval(updateInterval)
        }
    })

    if(mode%3==0)
    $.get(serviceurl_orders_onlyids, function(json_orders_raw){
        console.log("Get All Ids")
        let json_orders=json_orders_raw.GetOrderIdListResult

        // Build the array
        orders_arr_new=[]
        for(let i=0; i<json_orders.length; i++){
            let orderId_param=json_orders[i]

            orders_arr_new.push({
                orderId: orderId_param,
                userInformation: {
                    userId: null
                },
                orderTime: null,
                orderProducts: null,
                comments: null
            })
        }
        
        if(orders_different())
            homescreen_update()
    }).fail(function() {
        error_c++
        if(error_c>=retrys_until_error){
            raise_error("<font style='color: #FF3B3F; font-weight: bold;'>FEHLER:</font> Kein Zugriff auf die Datenbank möglich.<br><br>Vielleicht sind gerade Wartungsarbeiten am laufen?<br>Kontaktieren Sie bitte ihren Netzwerkadministrator.", "RELOAD", "homescreen_load")
            clearInterval(updateInterval)
        }
    })

    if(mode%3==0){
        console.log("Update time left")
        homescreen_update_from_orders_arr(orders_arr)
    }
    mode++;
}

function orders_different(){
    let different=false

    // Check if different 
    // => orders_arr_new != orders_arr?
    if(orders_arr.length!=orders_arr_new.length) different=true
    else{
        for(let i=0; i<orders_arr_new.length; i++){
            let act_orderId=orders_arr_new[i].orderId

            let orderId_found=false
            for(let j=0; j<orders_arr.length; j++){
                let act_orderId_old=orders_arr[j].orderId

                if(act_orderId==act_orderId_old){
                    orderId_found=true
                    break;
                }
            }
            if(!orderId_found) different=true
        }
        for(let i=0; i<orders_arr.length; i++){
            let act_orderId=orders_arr[i].orderId

            let orderId_found=false
            for(let j=0; j<orders_arr_new.length; j++){
                let act_orderId_old=orders_arr_new[j].orderId

                if(act_orderId==act_orderId_old){
                    orderId_found=true
                    break;
                }
            }
            if(!orderId_found) different=true
        }
    }
    return different
}

function homescreen_update_from_orders_arr(orders_arr_tmp){
    orders_arr_new=orders_arr_tmp.slice()
    orders_arr_sorted_new=orders_arr_new.slice()
    orders_arr_sorted_new.sortBy(function(o){ return o.orderTime })

    // TESTCODE
    let lowerlimit=new Date("October 14, 2017 08:00:00")
        lowerlimit.setMinutes(lowerlimit.getMinutes()-20+timeAdd)

    let upperlimit=new Date("October 14, 2017 08:00:00")
        upperlimit.setMinutes(upperlimit.getMinutes()+90+timeAdd)

    let date_seperator=new Date("October 14, 2017 08:00:00")
        date_seperator.setMinutes(date_seperator.getMinutes()+20+timeAdd)

    orders_arr_upcoming_create_new=[]
    orders_arr_upcoming_takaway_new=[]

    for(let i=0; i<orders_arr_sorted_new.length; i++){
        if(date_seperator<orders_arr_sorted_new[i].orderTime&&orders_arr_sorted_new[i].orderTime<upperlimit){
            orders_arr_upcoming_create_new.push(orders_arr_sorted_new[i])
        }
        else if(date_seperator>=orders_arr_sorted_new[i].orderTime&&orders_arr_sorted_new[i].orderTime>lowerlimit){
            orders_arr_upcoming_takaway_new.push(orders_arr_sorted_new[i])
        }
    }

    
    //Check if there are some orders left in the new one that are in the old one (upcoming_create)
    let orderIds_left=[]
    for(let i=0; i<orders_arr_upcoming_create.length; i++){
        let old_order_id=orders_arr_upcoming_create[i].orderId

        let found_id_in_new_orders=false
        for(let j=0; j<orders_arr_upcoming_create_new.length; j++){
            let new_order_id=orders_arr_upcoming_create_new[j].orderId

            if(old_order_id==new_order_id)
                found_id_in_new_orders=true
        }
        if(!found_id_in_new_orders)
            orderIds_left.push(old_order_id)
    }
    for(let i=0; i<orderIds_left.length; i++){
        let act_id=orderIds_left[i]
        $("#order-"+act_id).fadeOut(500, function(){
            $("#order-"+act_id).remove()
        })
    }

    //Check if there are some orders in the new one that are not in the old one
    let orderIds_added=[]
    for(let i=0; i<orders_arr_upcoming_create_new.length; i++){
        let new_order_id=orders_arr_upcoming_create_new[i].orderId

        let found_in_old_orders=false
        for(let j=0; j<orders_arr_upcoming_create.length; j++){
            let old_order_id=orders_arr_upcoming_create[j].orderId

            if(old_order_id==new_order_id)
                found_in_old_orders=true
        }
        if(!found_in_old_orders)
            orderIds_added.push([i, orders_arr_upcoming_create_new[i]])
    }
    for(let i=0; i<orderIds_added.length; i++){
        insert_single_order_to_div(orderIds_added[i][1], "#home_content_left_orders", orderIds_added[i][0])
    }


    //Check if there are some orders left in the new one that are in the old one (upcoming_takaway)
    orderIds_left=[]
    for(let i=0; i<orders_arr_upcoming_takaway.length; i++){
        let old_order_id=orders_arr_upcoming_takaway[i].orderId

        let found_id_in_new_orders=false
        for(let j=0; j<orders_arr_upcoming_takaway_new.length; j++){
            let new_order_id=orders_arr_upcoming_takaway_new[j].orderId

            if(old_order_id==new_order_id)
                found_id_in_new_orders=true
        }
        if(!found_id_in_new_orders)
            orderIds_left.push(old_order_id)
    }
    for(let i=0; i<orderIds_left.length; i++){
        let act_id=orderIds_left[i]
        $("#order-"+act_id).fadeOut(500, function(){
            $("#order-"+act_id).remove()
        })
    }

    //Check if there are some orders in the new one that are not in the old one
    orderIds_added=[]
    for(let i=0; i<orders_arr_upcoming_takaway_new.length; i++){
        let new_order_id=orders_arr_upcoming_takaway_new[i].orderId

        let found_in_old_orders=false
        for(let j=0; j<orders_arr_upcoming_takaway.length; j++){
            let old_order_id=orders_arr_upcoming_takaway[j].orderId

            if(old_order_id==new_order_id)
                found_in_old_orders=true
        }
        if(!found_in_old_orders)
            orderIds_added.push([i, orders_arr_upcoming_takaway_new[i]])
    }
    for(let i=0; i<orderIds_added.length; i++){
        insert_single_order_to_div(orderIds_added[i][1], "#home_content_right_bottom_orders", orderIds_added[i][0])
    }

    orders_arr=orders_arr_new.slice()
    orders_arr_sorted=orders_arr_sorted_new.slice()
    orders_arr_upcoming_create=orders_arr_upcoming_create_new.slice()
    orders_arr_upcoming_takaway=orders_arr_upcoming_takaway_new.slice()
    update_order_countdowns()
}

function homescreen_update(){
    load_orders(function(){
        homescreen_update_from_orders_arr(orders_arr_tmp)
    }, 5)
}