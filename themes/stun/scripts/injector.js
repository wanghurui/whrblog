hexo.extend.injector.register('head_end', 
`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css">
<link rel="stylesheet" href="/assets/justifiedGallery.min.css" />
`,
'gallery')
hexo.extend.injector.register('body_end', 
`
  <script src="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
  <script src="/assets/jquery.justifiedGallery.min.js"></script>
  <script src="/assets/gallery.js"></script>
`,
'gallery')
