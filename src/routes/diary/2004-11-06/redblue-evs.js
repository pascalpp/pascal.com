states = new Array();
i = 0;
function ns(name,majority,minority,income,votedfor,ev) {
	states[i] = new Array();
	states[i].name = name;
	states[i].majority = majority;
	states[i].minority = minority;
	states[i].income = income;
	states[i].votedfor = votedfor;
	states[i].ev = ev;
	i++;
}

function dw(txt) {
	document.writeln(txt);
}

function dwn(txt) {
	document.write(txt);
}


ns('California','55','44', '33749', 'Kerry', '55');
ns('Texas','61','38', '28372', 'Bush', '34');
ns('New York','58','40', '36574', 'Kerry', '31');
ns('Florida','52','47', '30446', 'Bush', '27');
ns('Illinois','55','45', '33590', 'Kerry', '21');
ns('Pennsylvania','51','49', '31998', 'Kerry', '21');
ns('Ohio','51','49', '29944', 'Bush', '20');
ns('Michigan','51','48', '30439', 'Kerry', '17');
ns('Georgia','58','41', '29442', 'Bush', '15');
ns('New Jersey','53','46', '40427', 'Kerry', '15');
ns('North Carolina','56','44', '28235', 'Bush', '15');
ns('Virginia','54','45', '33671', 'Bush', '13');
ns('Massachusetts','62','37', '39815', 'Kerry', '12');
ns('Indiana','60','39', '28783', 'Bush', '11');
ns('Missouri','53','46', '28252', 'Bush', '11');
ns('Tennessee','57','42', '28455', 'Bush', '11');
ns('Washington','53','46', '33332', 'Kerry', '11');
ns('Arizona','55','44', '26838', 'Bush', '10');
ns('Maryland','56','43', '37331', 'Kerry', '10');
ns('Minnesota','51','48', '34443', 'Kerry', '10');
ns('Wisconsin','50','49', '30898', 'Kerry', '10');
ns('Alabama','63','37', '26338', 'Bush', '9');
ns('Colorado','52','47', '34238', 'Bush', '9');
ns('Louisiana','57','42', '26100', 'Bush', '9');
ns('Kentucky','60','40', '26252', 'Bush', '8');
ns('South Carolina','58','41', '26132', 'Bush', '8');
ns('Connecticut','54','44', '43173', 'Kerry', '7');
ns('Iowa','50','49', '29043', 'Bush', '7');
ns('Oklahoma','66','34', '26656', 'Bush', '7');
ns('Oregon','51','48', '29340', 'Kerry', '7');
ns('Arkansas','54','45', '24289', 'Bush', '6');
ns('Kansas','62','36', '29935', 'Bush', '6');
ns('Mississippi','60','40', '23448', 'Bush', '6');
ns('Nebraska','67','32', '30758', 'Bush', '5');
ns('Nevada','50','48', '31266', 'Bush', '5');
ns('New Mexico','50','49', '25541', 'Bush', '5');
ns('Utah','71','26', '24977', 'Bush', '5');
ns('West Virginia','56','43', '24379', 'Bush', '5');
ns('Hawaii','54','45', '30913', 'Kerry', '4');
ns('Idaho','68','30', '25811', 'Bush', '4');
ns('Maine','53','45', '28831', 'Kerry', '4');
ns('New Hampshire','50','49', '34702', 'Kerry', '4');
ns('Rhode Island','60','39', '31996', 'Kerry', '4');
ns('Alaska','62','35', '33568', 'Bush', '3');
ns('Delaware','53','46', '32810', 'Kerry', '3');
ns('District of Columbia','90','9', '48342', 'Kerry', '3');
ns('Montana','59','39', '25920', 'Bush', '3');
ns('North Dakota','63','35', '29204', 'Bush', '3');
ns('South Dakota','60','38', '29234', 'Bush', '3');
ns('Vermont','59','39', '30740', 'Kerry', '3');
ns('Wyoming','69','29', '32808', 'Bush', '3');

dw('<div style="margin-bottom:30px">')

dw('<div class="stateheader">');
dw('<div class="stateinfo">');
dw('<div class="statename">State</div>');
dw('<div class="ev">Electoral Votes</div>');
dw('</div>');
dw('</div>');

for (s=0; s<states.length; s++) {
	evheight = states[s].ev * 4;
	dw('<div class="'+states[s].votedfor+'" style="height:'+evheight+'px">');
	dw('<div class="fill" style="height:'+evheight+'px">');
	dw('<div class="winner" style="width:'+(states[s].majority*5)+'px;height:'+evheight+'px"><span class="pad">'+states[s].majority+'%</span></div>');
	dw('<div class="loser" style="width:'+(states[s].minority*5)+'px;height:'+evheight+'px"><span class="pad">'+states[s].minority+'%</span></div>');
	dw('</div>');
	dw('<div class="stateinfo">');
	dw('<div class="statename">'+states[s].name+'</div>');
	dw('<div class="ev">'+states[s].ev+'</div>');
	dw('</div>');
	dw('</div>');
}
dw('</div>');
