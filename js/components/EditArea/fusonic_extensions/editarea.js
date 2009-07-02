/**
 * this function sets up the autogrow functionality for the EditArea
 * its called by the EditArea EA_load_callback
 * @param: _id =  id of the textarea
 * @return void
 */
function setupEditAreaAutoGrow(_id){
    var ua = navigator.userAgent;
    
    // select the iframe
    var frame = $('#frame_' + _id).get(0);
    
    // getting the maxheight, saved in the textarea's style attribute
    var maxHeight = parseInt($('#' + _id).css('max-height'));
    
    // getting the minheight, saved in the textarea's style attribute
    var minHeight = parseInt($('#' + _id).css('min-height'));
    
    // setting maxheight of the iframe
    $('#frame_' + _id).css('max-height', maxHeight);
    
    // setting minheight of the iframe
    $('#frame_' + _id).css('min-height', minHeight);
    
    var resultDiv = frame.contentWindow.document.getElementById('result');
    
    
    // getting the toolbars of the editor
    var toolbar1 = frame.contentWindow.document.getElementById('toolbar_1');
    var toolbar2 = frame.contentWindow.document.getElementById('toolbar_2');
    
    // get the div containing the number of lines
    var nbLineDiv = frame.contentWindow.document.getElementById('nbLine');
    
    var lineHeight = parseInt(frame.contentWindow.document.getElementById('line_1').offsetHeight);
    
    // set overflow-y of the resultDiv auto
    // resultDiv.style.border = "1px solid black";
    //$(resultDiv).css('border','1px solid black;');   
    
    var autoGrowHandler = function(){
    
        // get the number of lines
        var lines = parseInt(nbLineDiv.innerHTML);
        
        // set the new height of the iframe 
        // lineheight * number of lines + 25px savety-height + the height of the two toolbars
        var newHeight = (lineHeight * lines) + 18 +
        toolbar1.offsetHeight +
        toolbar2.offsetHeight;
        
        
        if (minHeight > newHeight) {
            newHeight = minHeight;
        }
        
        
        // set the height of the editor iframe 
        frame.style.height = newHeight + "px";
        
        // sets the overflow att of the result Div to auto if 
        // the new textarea height is greater then its max height
        if (newHeight > maxHeight) {
            resultDiv.style.overflowY = "auto";
        }
        else {
            resultDiv.style.overflowY = "";
        }
    }
    
    //sets up an interval and calls all 500 milliseconds the autoGrowHandler()
    setInterval(autoGrowHandler, 500);
    
    // calls the autoGrowHandler 
    // to set the correct editor height at the start
    autoGrowHandler();
    
    if (document.addEventListener) {
        frame.contentWindow.document.addEventListener('keyup', autoGrowHandler, true);
    }
    else 
        if (document.attachEvent) {
            frame.contentWindow.document.attachEvent('onkeyup', autoGrowHandler, true);
        }
    
}

/**
 * this function sets the overflow attribute to auto if the
 * editarea is not allowed to autogrow
 * its called by the EditArea EA_load_callback
 * @param: _id =  id of the textarea
 * @return void
 */
function setoverflow(_id){
    // select the iframe
    var frame = $('#frame_' + _id).get(0);
    var resultDiv = frame.contentWindow.document.getElementById('result');
    resultDiv.style.overflowY = "auto";
}


function toggleEditor(id){

    var isFrameVisible = $('#frame_' + id).css('display');
	var isThere = $('#frame_' + id).length;
	var value;
	
	
	if(isThere != 0)
	{
	    if (isFrameVisible == 'none') 
		{
	        value = 1;
			var img = 'square_green.png';
			var class = 'icon icon16 icon_square_green';
	    }
	    else {
	        value = 0;
			var img = 'square_red.png';
			var class = 'icon icon16 icon_square_red';
	    }
	}
	else
	{
		 value = 1;
		 var img = 'square_green.png';
		 var class = 'icon icon16 icon_square_green';
	}
	
    $.post(baseUrl + '/ajaxSettings/set', {
        name: 'sqlEditorOn',
        value: value
    }, function(){
		$('#aToggleEditor img').attr('src',baseUrl+'/images/icons/fugue/16/'+img);
		$('#aToggleEditor img').attr('class',class);
        eAL.toggle(id);
    });
}
