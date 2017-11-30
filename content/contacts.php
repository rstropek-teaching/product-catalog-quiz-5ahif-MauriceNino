<?php
$contacts=file_get_contents(__DIR__."/contacts.json");
$contacts_decode=json_decode($contacts, true);
echo '<div class="contacts_bg" style="float: left; width: 100%; min-width: 100%; height: 100%; min-height:100%; margin-top: 10px; overflow: auto;">
<div style="padding-left: 50px; padding-top: 50px; padding-right: 50px;" >
';
for($i=0; $i<count($contacts_decode); $i++){
  $imgpath=$contacts_decode[$i]["imgFilePath"];
  $name=$contacts_decode[$i]["name"];
  $email=$contacts_decode[$i]["email"];
  $skype=$contacts_decode[$i]["skype"];
  $tel=$contacts_decode[$i]["tel"];
  $contact=file_get_contents(__DIR__."/contacts_contact.html");
  $contact=str_replace("%%CONTACT_IMG%%", $imgpath, $contact);
  $contact=str_replace("%%CONTACT_MAIL%%", $email, $contact);
  $contact=str_replace("%%CONTACT_SKYPE%%", $skype, $contact);
  $contact=str_replace("%%CONTACT_TEL%%", $tel, $contact);
  $rand=rand(0,1);
  if($rand==0){
    $contact=str_replace("%%BASE_TURN%%", "left_turn", $contact);
    $contact=str_replace("%%PIN_TURN%%", "right_turn", $contact);
    $contact=str_replace("%%PIN_SIDE%%", "right_side", $contact);
  }else{
    $contact=str_replace("%%BASE_TURN%%", "right_turn", $contact);
    $contact=str_replace("%%PIN_TURN%%", "left_turn", $contact);
    $contact=str_replace("%%PIN_SIDE%%", "left_side", $contact);
  }

  echo $contact;
}
echo '</div></div>';



 ?>
<script>
  $(document).ready(function () {
    $(".contact_spacer").each(function(){
      let element=this,
          randw=Math.floor((Math.random()*15) + 10)
          randh=Math.floor((Math.random()*50) + 100)
      $(element).css({
        "height":randh,
        "width":randw
      })
    })
    $("#loading_gif").hide()
  })
</script>
