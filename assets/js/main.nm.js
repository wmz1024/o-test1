window.addEventListener("load",async()=>{navigator.serviceWorker.register(`/sw.js?time=${new Date().getTime()}`).then(async(reg)=>{if(window.localStorage.getItem("install")!="true"){window.localStorage.setItem("install","true");setTimeout(()=>{console.log("helloWorld")},1000)}}).catch((err)=>{})});
function run(data){
  document.write("<head></head>")
  document.write("<script>!function(p){\"use strict\";!function(t){var s=window,e=document,i=p,c=\"\".concat(\"https:\"===e.location.protocol?\"https://\":\"http://\",\"sdk.51.la/js-sdk-pro.min.js\"),n=e.createElement(\"script\"),r=e.getElementsByTagName(\"script\")[0];n.type=\"text/javascript\",n.setAttribute(\"charset\",\"UTF-8\"),n.async=!0,n.src=c,n.id=\"LA_COLLECT\",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:\"KT7hdioJFlcNrs8g\",ck:\"KT7hdioJFlcNrs8g\",autoTrack:true});</script>")
    dbody=data.body;
    dname=data.name;
    drunjs=data.js || "console.log('[AwA.gs] No JS could run')";
    document.querySelector("head").innerHTML+=`<title>Documents</title><meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">`
    document.write("<div id='main'></div>")
    document.querySelector("#main").innerHTML = data.body;
    document.querySelector("title").innerHTML = data.name;
    document.write(`<script>${drunjs}</script>`)
  }
  function GetQueryString(api) {
    var reg = new RegExp("(^|&)" + api + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search.substr(1)).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var sname = GetQueryString("p");
  if (sname != null) {
    var sname_ = decodeURIComponent(sname);
  }
  if (sname != null) {
    fetch(`/assets/json/${sname}.json`)
      .then(response => response.json())
      .then(data => {
        run(data);
      })
      .catch(err => console.log("Request Failed", err));
  } else {
    fetch(`/assets/json/${location.host}.json`)
      .then(response => response.json())
      .then(data => {
        location.href = `/?p=${location.host}`;
      })
      .catch(err => {
        location.href = `/?p=index`;
      });
  }
  
  
