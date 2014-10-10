'use strict'

var app = angular.module('app', []);
app.controller('BingoCtrl', function($scope) {
	_.assign($scope, {
		current : "",
		chosen : [],
		isFinished : false,
		add : function() {
			if (!this.current) {
				return;
			}
			var num = this.current * 1;
			if (num < 1 || num > 75) {
				return;
			}
			var tempList = this.chosen;
			tempList.push(this.current * 1);
			tempList = _.uniq(tempList), function(num) {
				return num;
			};
			tempList = _.sortBy(tempList, function(num) {
				return num;
			});
			this.chosen = tempList;
		},
		remove : function() {
			_.remove(this.chosen, _.bind(function(num) {
				return this.num == num;
			}, this)); 
		},
		handleKeyDown : function(e) {
			if (e.which == 13) { //enter
				this.add();
			}
		}
	});
});
