function appStoreAssistant(appId){
  console.log('document ready');
  //select key DOM nodes only once
  //var $results = $('#appInfo');
  var $results = document.getElementById('appInfo'); 
  
  //keep track of result metadata
  var dataArray = [];
  var resultList = [];
  var resultHtml = null;
  
  //send request whenever user types key
  if(appId){
    $.ajax({
      url: "http://itunes.apple.com/lookup?id="+appId,
      dataType: 'JSONP'
    }).done(function(data){
      finished = true;
      if(!data){
	$results.text('no data');
        return;
      }

      $resultHtml = null;
      $results.empty();
      dataArray = [];
      
      //for each results, add element to result list
      for(var i = 0, len = data.results.length; i < len; i++){
        var res = new result(data.results[i]);
        resultHtml += res.html;
        resultList.push(res);
        $results.append(res.html);
      }
    })
    .fail(function(data){
	$results.text('data error');
    });
  }
}

//result object
function result(data){
  this.data = data;
  this.image = data.artworkUrl100;
  this.url = data.artistViewUrl;
  this.description = data.description;
  this.name = data.trackName;

  //this.html = '<li class="list-template" title="'+data.artistName+'"><a href="'+data.artistViewUrl + '"><img src="'+this.image+'" /></a></li>';
  
  this.html = '<div class="entry-wrap">'
    + '<div class="entry">'
    + '<h2 class="title"><a href="' + this.url + '" title="' + this.name + '">' + this.name + '</a></h2>'
    + '<p class="date">'
    + '<span class="month">Mar</span>'
    + '<span class="day">02</span>'
    + '</p>'
    + '<div class="entry-content clearfix">'
    + '<div class="thumb">'
    + '<img src="' + this.image + '" alt="' + this.name + '" width="175" height="175" />'
    + '<a class="appTitle" href="' + this.url + '" title="' + this.name + '"><span class="overlay"></span></a>'
    + '</div> <!-- end .thumb -->'
    + '<p>' + this.description + '</p>'
    + '<a href="' + this.url + '" title="' + this.name + '" class="readmore"><span>Read More</span></a>'
    + '</div> <!-- end .entry-content -->'
    + '<div class="post-meta-top"></div>'
    + '<div class="post-meta clearfix">'
    + '<span class="meta-info categories">'
    + '<span class="right-sep">'
    + '<a href="' + this.url + '" title="' + this.name + '" rel="category tag">Finance</a></span>'
    + '</span>'
    + '</div> <!-- end .post-meta -->'
    + '</div> <!-- end .entry -->'
    + '</div> <!-- end .entry-wrap -->';
}
