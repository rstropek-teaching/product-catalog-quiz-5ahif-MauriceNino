let product_view="#product_list_view",
    product_layout
function load_products(){
    $.get("content/home_product.html", (home_product_html)=>{
        product_layout=home_product_html
        
        let rand_prod_list=["Semmerl", "Wurst", "Salamiwurst", "Kakao", "Würschtl"]

        for(let i=0; i<10; i++){
            let act_prod=product_layout

            act_prod=act_prod.replace("%%PRODUCT_ID%%","#"+i)
            act_prod=act_prod.replace("%%PRODUCT_NAME%%", rand_prod_list[Math.floor(Math.random() * (rand_prod_list.length-1 - 0 + 1)) + 0])
            act_prod=act_prod.replace("%%PRODUCT_DESC%%","Ein geschmackiges Semmerl mit ganz viel Liebe zubereitet!")
            act_prod=act_prod.replace("%%PRODUCT_PRICE%%","1.00€")

            $(product_view).append(act_prod)
        }
        if(act_vers!="raster") change_to_list()
    })
}

function execute_product_search(){
    let input=$("#main_topbar_productsearch_input").val()
    $(".product_titlebar_name").each((index, title_elem)=>{
        let title=$(title_elem).text()

        if(title.toLowerCase().indexOf(input.toLowerCase())!==-1){
            $(title_elem).parent().parent().show()
        }else{
            $(title_elem).parent().parent().hide()
        }
    })
}
$("#main_topbar_productsearch_input").on("change paste keyup", ()=>{
    execute_product_search()
})