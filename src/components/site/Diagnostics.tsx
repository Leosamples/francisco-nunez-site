/**
 * On-device diagnostics, only when the URL has ?diag. Plain ES5 inline script,
 * so it runs even if the app bundles fail to parse on an older browser — which
 * is exactly the failure it exists to catch. It reports the iOS version, Reduce
 * Motion, whether React hydrated (window.__fnHydrated, set by MotionProvider),
 * laser shots fired (window.__fnShots, from LaserShow), WebGL, and any script
 * errors. Without ?diag it returns immediately and renders nothing.
 */
const script = `(function(){
  if(!/[?&]diag\\b/.test(location.search)) return;
  var errs=[];
  window.addEventListener('error',function(e){
    var src=(e.filename||(e.target&&e.target.src)||'').split('/').pop();
    errs.push((e.message||('failed to load '+src))+(src?' @ '+src:''));
  },true);
  function webgl(){try{var c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(x){return false}}
  function render(){
    var el=document.getElementById('fn-diag');
    if(!el){el=document.createElement('div');el.id='fn-diag';
      el.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483647;background:#111;color:#f5f1ea;font:12px/1.45 ui-monospace,Menlo,monospace;padding:10px 12px;border:1px solid #c41e1e;border-radius:6px;white-space:pre-wrap';
      document.body.appendChild(el);}
    var ua=navigator.userAgent, m=ua.match(/OS (\\d+)_(\\d+)(?:_(\\d+))? like Mac/);
    el.textContent=[
      'FN diagnostics',
      'iOS: '+(m?m[1]+'.'+m[2]+(m[3]?'.'+m[3]:''):'(not iOS)'),
      'Reduce Motion on: '+(window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)').matches:'?'),
      'App started (React): '+(window.__fnHydrated?'YES':'NO'),
      'Laser shots fired: '+(window.__fnShots||0),
      'WebGL: '+webgl(),
      'Errors: '+(errs.length?errs.join(' | '):'none'),
      'UA: '+ua
    ].join('\\n');
  }
  document.addEventListener('DOMContentLoaded',render);
  setInterval(render,1000);
})();`;

export function Diagnostics() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
