'use strict'

var chosen = [];
try {
	chosen = JSON.parse(sessionStorage['chosen']);
} catch(e) {
}

var app = angular.module('app');
app.controller('BingoCtrl', function($scope) {
	_.assign($scope, {
		current : "",
		chosen : chosen,
		isFinished : false,
		add : function() {
			if (!this.current) {
				return;
			}
			var num = this.current * 1;
			if (_.isNaN(num) || num < 1 || num > 75) {
				return;
			}
			var tempList = this.chosen;
			tempList.push(this.current * 1);
			tempList = _.uniq(tempList), function(num) {
				return num;
			};
			this.chosen = tempList;
			sessionStorage['chosen'] = JSON.stringify(this.chosen);
		},
		remove : function() {
			_.remove(this.chosen, _.bind(function(num) {
				return this.num == num;
			}, this));
			sessionStorage['chosen'] = JSON.stringify(this.chosen);
		},
		handleKeyDown : function(e) {
			if (e.which == 13) { //enter
				this.add();
			}
		}
	});
});
