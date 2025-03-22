window.addEventListener("load", async () => {
    navigator.serviceWorker
      .register(`/sw.js?time=${new Date().getTime()}`)
      .then(async (reg) => {
        if (window.localStorage.getItem("install") != "true") {
          window.localStorage.setItem("install", "true");
          setTimeout(() => {
            console.log("helloWorld");
          }, 1000);
        }
      })
      .catch((err) => {});
  });
  
  /**
   * 这里用 run(data) 来渲染返回的 body，并执行其中的脚本
   */
  function run(data) {
    // 1. 在 <head> 中插入 51.la 的监测脚本
    const sdkScript = document.createElement("script");
    sdkScript.textContent = `!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"KT7hdioJFlcNrs8g",ck:"KT7hdioJFlcNrs8g",autoTrack:true});`;
    document.head.appendChild(sdkScript);
  
    // 2. 设置文档的 <title> 和其他 meta
    const metaHTML = `
      <title>${data.name || "Documents"}</title>
    `;
    document.head.insertAdjacentHTML("beforeend", metaHTML);
  
    // 3. 创建（或获取）一个主容器 <div id="main"> 放置 content
    let mainDiv = document.querySelector("#main");
    if (!mainDiv) {
      mainDiv = document.createElement("div");
      mainDiv.id = "main";
      document.body.appendChild(mainDiv);
    }
  
    // 4. 将 data.body 的内容插入到 mainDiv
    //    这里先设置 innerHTML，然后手动执行其中的脚本
    mainDiv.innerHTML = data.body || "";
  
    // 5. 处理 data.body 中的外部脚本（script src）
    const externalScripts = mainDiv.querySelectorAll("script[src]");
    externalScripts.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.src = script.src;
      newScript.onload = () => {
        console.log(`Script ${script.src} loaded successfully.`);
      };
      newScript.onerror = () => {
        console.error(`Failed to load script ${script.src}`);
      };
      document.head.appendChild(newScript); // 将外部脚本插入到 head
    });
  
    // 6. 处理 data.body 中的内联脚本（script 标签里的代码）
    const inlineScripts = mainDiv.querySelectorAll("script:not([src])");
    inlineScripts.forEach((inlineScript) => {
      const newInlineScript = document.createElement("script");
      newInlineScript.textContent = inlineScript.textContent;
      document.body.appendChild(newInlineScript); // 将内联脚本插入到 body 执行
    });
  
    // 7. 如果 data.js 存在，则再创建一个 script 去执行 data.js
    const drunjs = data.js || "console.log('[AwA.gs] No JS could run')";
    const runJsScript = document.createElement("script");
    runJsScript.textContent = drunjs;
    document.body.appendChild(runJsScript);
  }
  
  /**
   * 其他工具函数
   */
  function GetQueryString(api) {
    var reg = new RegExp("(^|&)" + api + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search.substr(1)).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  
  // 业务逻辑示例：根据 URL 参数 id 去请求对应的 JSON 并调用 run(data)
  var sname = GetQueryString("id");
  if (sname != null) {
    var sname_ = decodeURIComponent(sname);
    fetch(`/assets/json/${sname}.json`)
      .then((response) => response.json())
      .then((data) => {
        run(data);
      })
      .catch((err) => console.log("Request Failed", err));
  } else {
    fetch(`/assets/json/${location.host}.json`)
      .then((response) => response.json())
      .then((data) => {
        location.href = `${location.pathname}?id=${location.host}`;
      })
      .catch((err) => {
        location.href = `/?id=index`;
      });
  }
  
  /**
   * 加载外部脚本和样式示例
   */
  function loadJSFile(url) {
    if (!document.querySelector(`script[src="${url}"]`)) {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", url);
      document.head.appendChild(script);
    }
  }
  
  function loadCSSFile(url) {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", url);
      document.head.appendChild(link);
    }
  }