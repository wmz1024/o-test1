window.addEventListener('load',async()=>{navigator.serviceWorker.register(`assets/js/sw.js?time=${new Date().getTime()}`).then(async reg=>{if(window.localStorage.getItem('install')!='true'){window.localStorage.setItem('install','true');setTimeout(()=>{console.log('helloWorld')},1000)}}).catch(err=>{})});function GetQueryString(api){var reg=new RegExp("(^|&)"+api+"=([^&]*)(&|$)");var r=decodeURI(window.location.search.substr(1)).match(reg);if(r!=null)return unescape(r[2]);return null}var sname=GetQueryString("p");if(sname!=null){var sname_=decodeURIComponent(sname)}if(sname!=null){fetch('/assets/json/'+sname+'.json').then(function(a){return a.json()}).then(function(a){document.getElementById("main").innerHTML=a.body;}).catch(err => console.log('Request Failed', err));}else{location.replace('?p=1')}
