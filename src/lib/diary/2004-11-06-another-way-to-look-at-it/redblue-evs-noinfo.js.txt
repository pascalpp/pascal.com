dw('<div class="noinfo" style="margin-bottom:38px">')
for (s=0; s<states.length; s++) {
	evheight = parseInt(states[s].ev);
	dwn('<div class="'+states[s].votedfor+'" style="height:'+evheight+'px">');
	dwn('<div class="fill" style="height:'+evheight+'px">');
	dwn('<div class="winner" style="width:'+(states[s].majority*5)+'px;height:'+evheight+'px"></div>');
	dwn('<div class="loser" style="width:'+(states[s].minority*5)+'px;height:'+evheight+'px"></div>');
	dwn('</div>');
	dwn('</div>');
}
dw('</div>');
