
//player.js
(function() {

	var ANIMATION_INTERVAL = 50;

	/**
	 * Constructor-like function that creates a new player and returns the entity.
	 * @param {String} name   name of the entity
	 * @param {Boolean} isFlipped    if true, horizontally flip
	 */
	Game.newPlayer = function(name, isFlipped) {
		var entity;
		if(isFlipped) {
			//frame = next row... not implemented in spritesheet yet
		}

		entity = Game.createEntity({
			sprite : sprites.wizard,
			name   : name,
			type   : 'player',
			hp     : 100,
			x      : 0,
			y      : 0,
			speed  : 5,
			frame  : 0,
			flipped : isFlipped
		}, [Game.component.drawable,
			Game.component.moveable,
			Game.component.walks,
			Game.component.healthBar]);

		return entity;
	}

	Game.component.healthBar = {
		drawHealthBar : function(context) {
			var healthWidth = 32 * (this.hp / 100),
			width = this.sprite.width;
			height = 5;

			context.fillStyle = 'black';
			context.fillRect(this.x, this.y-16, width, height);
			context.fillStyle = 'red';
			context.fillRect(this.x, this.y-16, healthWidth, height);
		}
	}

	Game.component.walks = {
		walk : function() {
			var self = this;

			this.frame +=1;
			this.walkId = setInterval(function() {
				if(self.frame === self.sprite.framesPerRow - 1) {
					self.frame = 0;
				} else {
					self.frame +=1;
				}

			}, ANIMATION_INTERVAL);
		},

		stopWalk : function() {
			clearInterval(this.walkId);
			this.frame = 0;
		}
	}
})();