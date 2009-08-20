/*
 * Chive - web based MySQL database management
 * Copyright (C) 2009 Fusonic GmbH
 * 
 * This file is part of Chive.
 *
 * Chive is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * Chive is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 */

var chive = {
	
	currentLocation: window.location.href,
	
	/*
	 * Initialize chive
	 */
	init: function()
	{
		// Initialize location checker
		setInterval(chive.checkLocation, 100);
		
		// Load first page if anchor is set
		if(chive.currentLocation.indexOf('#') > -1)
		{
			chive.refresh();
		}
		
		// Set keyboard shortcuts for Yii pager
		$(document)
		.bind('keydown', {combi: 'right', disableInInput: true }, function() {
			var li = $('ul.yiiPager li.selected').next('li');
			if(li.length > 0)
			{
				location.href = li.children('a').attr('href');
			}
		})
		.bind('keydown', {combi: 'left', disableInInput: true }, function() {
			var li = $('ul.yiiPager li.selected').prev('li');
			if(li.length > 0)
			{
				location.href = li.children('a').attr('href');
			}
		});
	
		// Send keep-alive to server every 5 minutes
		setInterval(function() {
			$.post(baseUrl + '/site/keepAlive', function(response) {
				if(response != 'OK') 
				{
					reload();
				}
			});
		}, 300000);
	},
	
	/*
	 * Loads the specified page.
	 */
	goto: function(location)
	{
		window.location.hash = location;
		chive.currentLocation = window.location.href;
		chive.refresh();
	},
	
	/*
	 * Refreshes the current page using the anchor name.
	 */
	refresh: function()
	{	
		// Build url
		var url = chive.currentLocation
			.replace(/\?(.+)#/, '')
			.replace('#', '/')					// Replace # with /
			.replace(/([^:])\/+/g, '$1/');		// Remove multiple slashes
			
		// Load page into content area
		$.post(url, globalPost, function(response) {
			var content = document.getElementById('content');
			content.innerHTML = response;
			var scripts = content.getElementsByTagName('script');
			for(var i = 0; i < scripts.length; i++)
			{
				$.globalEval(scripts[i].innerHTML);
			}
			init();
			var globalPost = {};
			AjaxResponse.handle(response);
		});
	},
	
	/*
	 * Reloads the whole page.
	 */
	reload: function()
	{
		window.location.reload();
	},
	
	/*
	 * Checks if current location has changed.
	 */
	checkLocation: function()
	{
		if(window.location.href != chive.currentLocation) 
		{
			chive.currentLocation = window.location.href;
			chive.refresh();
		}
	}
	
};