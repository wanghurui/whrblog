(function () {
    el = $("article.page-content");
    if (el !== undefined) {
        el.innerHTML = '';
        fetch('data.json')
            .then(response =&gt; response.json())
            .then(data =&gt; {
                galleryContent = document.createElement("div");
                galleryContent.id = "gallery-content";
                galleryContent.class = "justified-gallery";
                function renderGallery(node) {
                    if (node.contents !== undefined &amp;&amp; node.contents.length &gt; 0) {
                        node.contents.forEach(sd =&gt; {
                            imgUrl = node.name + '/' + sd.name;
                            imgThumbUrl = node.name + '/thumbnails/thumb_' + sd.name;
                            galleryContent.innerHTML += `
                                <a href="`+ imgUrl + `" data-fancybox="images">
                                    <img src="`+ imgThumbUrl + `">
                                </a>
                            `;
                        });
                    }
                }
                data.forEach(d =&gt; renderGallery(d) );
                el.append(galleryContent);
                $('#gallery-content').justifiedGallery({ rowHeight: 150, margins: 5 });
            });
    }
})();


