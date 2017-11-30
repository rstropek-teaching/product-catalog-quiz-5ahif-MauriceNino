<div id="product_list_settingsbar">
  <div id="product_list_settingsbar_heading">Product List View</div>
  <div id="product_list_settingsbar_listraster_switch">
    <i id="product_list_settingsbar_listraster_switch_raster" class="fa fa-th-large" aria-hidden="true"></i>
    <div id="product_list_settingsbar_listraster_switch_seperator"></div>
    <i id="product_list_settingsbar_listraster_switch_list" class="fa fa-bars" aria-hidden="true"></i>
  </div>
</div>
<div id="product_list_view">

</div>
<!--
TODO: List/Raster Option
SCSS Styles for List/Raster productview
JS for updating
-->
<script type="text/javascript">
  function loadHomescreenWhenReady(){
    if(typeof load_products!='undefined')
      load_products()
    else
      setTimeout(loadHomescreenWhenReady, 100)
  }
  $(document).ready(()=>{
    loadHomescreenWhenReady()
    $("#loading_gif").hide()
  })
</script>