window.addEventListener('load',async()=>{navigator.serviceWorker.register(`assets/js/sw.js?time=${new Date().getTime()}`).then(async reg=>{if(window.localStorage.getItem('install')!='true'){window.localStorage.setItem('install','true');setTimeout(()=>{window.location.search=`?time=${new Date().getTime()}`},1000)}}).catch(err=>{})});
fetch('/assets/json/1.json').then(function(a){return a.json()}).then(function(a){document.getElementById("main").innerHTML=a.body;});