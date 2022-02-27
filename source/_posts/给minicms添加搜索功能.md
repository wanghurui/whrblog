---
title: 给minicms添加搜索功能
tags:
  - IT
  - MINICMS
  - 折腾
  - Hexo
id: '667'
categories:
  - - uncategorized
date: 2018-05-25 07:25:35
hidden: true
---

修改/index.php文件，在14行添加以下代码：
<!-- more -->
```
else if (preg_match('^search/([^/]+)/(?page=([0-9]+)){0,1}$', $qs, $matches)) {
  $mc_get_type = 'search';
  $mc_get_name = urldecode($matches[1]);
  $mc_page_num = isset($matches[2]) ? $matches[3] : 1;
}
```

然后在67行添加以下代码

```
else if ($mc_get_type == 'search') {
  require 'files/posts/index/publish.php';
  $mc_post_ids = array_keys($mc_posts);
  $mc_post_count = count($mc_post_ids);
  $mc_search_posts = array();
  foreach($mc_posts as $k=>$v){
    if(preg_match('/'.$mc_get_name.'/i',$v['title'])){
        $mc_search_posts[$k] = $mc_posts[$k];
    }
  }
  $mc_posts = $mc_search_posts;
  $mc_post_ids = array_keys($mc_posts);
  $mc_post_count = count($mc_post_ids);
}
```

修改/files/tags.php文件，在最后的?>之前添加以下代码

```
function mc_is_search() {
  global $mc_get_type;
  return $mc_get_type == 'search';
}

function mc_search_name($print=true) {
  global $mc_get_name;
  if ($print) {
    echo htmlspecialchars($mc_get_name);
    return;
  }
  return $mc_get_name;
}
```

现在在地址栏你的域名后面添加/?search/关键字/，就可以看到搜索的结果了。 接下来修改主题 修改主题目录下的index.php，在标签中添加以下代码

```
code class="language-<script">
```

然后再合适的地方添加一个文本框

```
<div class="search"> <input type="text" name="search" class="text" id="text" value="" /> <input type="button" class="submit" value="搜索" onclick="Search()" /> </div>
```

到这里搜索功能就添加完成了