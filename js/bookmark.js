var Bookmark = {
	
	add: function(_schema, _query) 
	{
		$.post(baseUrl + '/ajaxSettings/add', {
					name: 'bookmarks',
					value: _query,
					scope: 'database',
					object: _schema
		}, function(data, _query) {
			alert(dump(data));
			sideBar.accordion('activate', 2);
			$('#bookmarkList').append('<li id="bookmark_1">asdf</li>');
			$('#bookmark_1').effect('highlight', {}, 2000);
			
			AjaxResponse.handle(data);
			
		});
	}
	
};
