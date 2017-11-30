function createArray(length) {
    let arr=new Array(length||0),
        i=length;

    if(arguments.length>1){
        let args=Array.prototype.slice.call(arguments, 1)
        while(i--) arr[length-1 -i]=createArray.apply(this, args)
    }

    return arr
}

function get_search_url_as_array(){
  let query=window.location.search.substring(1),
      searcharr=query.split("&"),
      searcharr2dim=createArray(searcharr.length+1, 2)

  for(let i=0; i<searcharr.length; i++){
    searcharr2dim[i][0]=searcharr[i].split("=")[0]
    searcharr2dim[i][1]=searcharr[i].split("=")[1]
  }
  for(let i=0; i<searcharr2dim.length; i++){
    if(searcharr2dim[i][0]=="") searcharr2dim=searcharr2dim.splice(i,1)
  }

  return searcharr2dim
}

function set_search_url_from_array(array){
  let urlstr="?"

  for(let i=0; i<array.length; i++){
    urlstr+=array[i][0]+"="+array[i][1]
    if(i<array.length-1) urlstr+="&"
  }
  change_url("Test", urlstr)
}

function change_url(title, url) {
  if (typeof (history.pushState) != "undefined") {
    let obj = { Title: title, Url: url };
    history.pushState(obj, obj.Title, obj.Url);
  } else {
    raise_error("HTML 5 nicht unterstützt", "OK")
  }
}

function change_url_search_var(variable, newContent){
  let searcharr=get_search_url_as_array(),
      changed=false,
      hash=window.location.hash

  for(let i=0; i<searcharr.length; i++)
    if(searcharr[i][0]==variable){
      searcharr[i][1]=newContent
      changed=true
    }
  if(!changed){
    searcharr[searcharr.length-1][0]=variable
    searcharr[searcharr.length-1][1]=newContent
  }else{
    searcharr.pop()
  }
  set_search_url_from_array(searcharr)
  history.pushState(null, null, hash);
}

function get_url_search_var(variable) {
  let query = window.location.search.substring(1)
  let vars = query.split("&")
  for(let i=0; i<vars.length; i++){
    let pair=vars[i].split("=")
    if(pair[0]==variable){ return pair[1] }
  }
  return false
}

function createCookie(name, value, days) {
  let expires

  if(days){
    let date=new Date()
    date.setTime(date.getTime()+(days*24*60*60*1000))
    expires="; expires="+date.toGMTString()
  }else{
    expires=""
  }
  document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+expires+"; path=/"
}

function readCookie(name) {
  let nameEQ=encodeURIComponent(name)+"="
  let ca=document.cookie.split(';')
  for(let i=0; i<ca.length; i++){
    let c=ca[i]
    while(c.charAt(0)===' ') c=c.substring(1, c.length)
    if(c.indexOf(nameEQ)===0) return decodeURIComponent(c.substring(nameEQ.length, c.length))
  }
  return null
}

function eraseCookie(name) {
  createCookie(name, "", -1)
}

function auth_webuntis_user(uname, upass){
  let request=$.ajax({
    dataType: "json",
    contentType: "application/json",
    type: "POST",
    url: 'https://euterpe.webuntis.com/WebUntis/jsonrpc.do?school=htl-perg',
    data:'{"id":"'+Math.floor(Math.random()*10000000000000001)+'","method":"authenticate","params":{"user":"'+uname+'", "password":"'+upass+'", "client":"webauslese"},"jsonrpc":"2.0"}',
  })
  return request
}
