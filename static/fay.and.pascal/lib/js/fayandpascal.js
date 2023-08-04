/* query parser functions */
function getQuery(key,loc) {
	var query = "";
	key = key || '?';
	loc = loc || document.location.href;
	if (loc.indexOf(key) > -1) {
		query = loc.substring(loc.indexOf(key)+key.length,loc.length);
	}
	return query;
};

function parseQuery(key,loc,argsplit,chunksplit) {
	var qq = new Array();
	var query = getQuery(key,loc);
	var argsplit = argsplit || '\&';
	if (chunksplit === null) chunksplit = '='; // set chunksplit to false if you just want the args
	if (query) {
		var args = query.split(argsplit);
		if (chunksplit) {
			for (i=0; i<args.length; i++) {
				var chunk = args[i];
				qq[chunk.split(chunksplit)[0]] = unescape(chunk.split(chunksplit)[1]);
			}
		} else {
			qq = args;
		}
	}
	return qq;
};


var FP = {
	top: 1,

	init: function() {
		//FP.treatPhotos();
		
		var qq = parseQuery('/#/');
		
		if (false && $.inArray('goldenticket',qq) > -1) {
			$('body').addClass('goldenticket');
		} else {
			$('.page.goldenticket').remove();
		}

		if ($.inArray('emailpreview',qq) > -1) {
			$('body').addClass('emailpreview');
			$('.page').not('.invite').remove();
			$('.clicktorsvp').remove();
		} else {
			$('.clicktoopen').remove();
		}

		if ($.inArray('print',qq) > -1) {
			$('body').addClass('print');
		} else {
			//$('.clicktoopen').remove();
		}

		$('a').each(function() {
			var h = this.href.replace(/http:\/\/fay\.and\.pascal\.com\//,'');
			if (h.indexOf('#') != 0 && h.indexOf('mailto:') != 0) this.target = "_blank";
		});
		
		FP.showPages();
		FP.loadRSVPForm();
		
	},

	showPages: function() {
		var pages = $('.page');
		FP.top = pages.length;
		
		pages.not('.plain').not('.setup').each(function(i) {
			var $this = $(this);
			var hh = $this.html();
			$this.empty().html('<div class="top"></div><div class="middle"></div><div class="bottom"></div>');
			$this.find('.middle').html(hh);
		});
		
		pages.filter('.plain').each(function() {
			var $this = $(this);
			var hh = $this.html();
		});
		
		/* pages.draggable({
			containment: 'document'
		}); */
		
		pages.each(function(i) {
			$(this).css('z-index',FP.top-i);
		}).on('mousedown',function() {
			$(this).css('z-index',FP.top++);
		}).show();
		
		$('.page.goldenticket').css('z-index',FP.top++);
	
	},
	
	treatPhotos: function() {
		$('.photo').append('<span class="photocorner TL" />')
			.append('<span class="photocorner TR" />')
			.append('<span class="photocorner BL" />')
			.append('<span class="photocorner BR" />');
	},
	
	loadRSVPForm: function() {
		window.z7x3k1 = null;
		
		var options = {
			'userName':'fayandpascal', 
			'formHash':'z7x3k1', 
			'autoResize':true,
			'height':'320',
			'async':true,
			'header':'hide'
		}

		var qq = parseQuery('/#/',null,'/');
		if (qq[0] == "fields") {
			qq.shift();
			var labels = ['Field1','Field2','Field4','Field5'];
			var dv = [];
			for (i in qq) {
				dv.push(labels[i]+'='+qq[i]);
			}
			options['defaultValues'] = dv.join('&');
		}

		(function(d, t) {
			var s = d.createElement(t);
			s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
			s.onload = s.onreadystatechange = function() {
				var rs = this.readyState;
				if (rs) if (rs != 'complete') if (rs != 'loaded') return;
				try {
					z7x3k1 = new WufooForm();
					z7x3k1.initialize(options);
					z7x3k1.display();
				} catch (e) {}
			};
			var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);
		})(document, 'script');
	
	}
};
$(document).ready(FP.init);
