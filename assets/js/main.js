function GetQueryString(api){var reg=new RegExp("(^|&)"+api+"=([^&]*)(&|$)");var r=decodeURI(window.location.search.substr(1)).match(reg);if(r!=null)return unescape(r[2]);return null}var sname=GetQueryString("p");if(sname!=null){var sname_=decodeURIComponent(sname)}if(sname!=null){fetch('/assets/json/'+sname+'.json').then(function(a){return a.json()}).then(function(a){document.getElementById("main").innerHTML=a.body;});}else{location.replace('?p=1')}
