function run(js){
    document.write(`<script>${js}</script>`)
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
        document.getElementById("main").innerHTML = data.body;
        document.querySelector("title").innerHTML = data.name;
        run(data.js || "console.log('[AwA.gs] No JS could run')");
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
  
  