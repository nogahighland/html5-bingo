'use strict'

var chosen = [];
try {
	chosen = JSON.parse(sessionStorage['chosen']);
} catch(e) {
}

var app = angular.module('app', []);
app.controller('BingoCtrl', function($scope, $timeout) {
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
			var isExist = _.find(this.chosen, function(ball) {
				return ball.num === num;
			});
			if (isExist) {
				return;
			}
			var ball = { num: this.current * 1};
			this.chosen.push(ball);
			sessionStorage['chosen'] = JSON.stringify(this.chosen);

			$timeout(function() {
				ball.class = 'added';
				$timeout(function(argument) {
					ball.class = '';
				}, 200);
			}, 100);
		},
		remove : function(num) {
			_.remove(this.chosen, _.bind(function(obj) {
				return num == obj.num;
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
