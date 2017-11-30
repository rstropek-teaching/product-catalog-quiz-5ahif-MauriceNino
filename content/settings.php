<?php
$settings=file_get_contents(__DIR__."/settings.json");
$settings_decode=json_decode($settings, true);

for($i=0; $i<count($settings_decode); $i++){
  $name=$settings_decode[$i]["name"];
  $imgpath=$settings_decode[$i]["imgFilePath"];
  $action=$settings_decode[$i]["action"];
  $setting=file_get_contents(__DIR__."/settings_setting.html");
  $setting=str_replace("%%SETTING_IMG%%", $imgpath, $setting);
  $setting=str_replace("%%SETTING_NAME%%", $name, $setting);
  $setting=str_replace("%%SETTING_ACTION%%", $action, $setting);
  echo $setting;
}
 ?>
<script>
$(document).ready(()=>{
  $("#loading_gif").hide()
  resize_listener()
  setTimeout(() => {
    $(".settings_base").css("height", $(".settings_base").first().width())
  }, 1000);

  $.get("content/settings.json", (settings_file) => {
    for(let i=0; i<settings_file.length; i++){
      $(document.body).on('click', '.'+settings_file[i].action, () =>{
        open_popup_box()
        if(settings_file[i].content=="undefined")
          fill_popup_box(settings_file[i].name)
        else
          $("#popup_box_content").load(settings_file[i].content)
      })
    }
  })
})
</script>