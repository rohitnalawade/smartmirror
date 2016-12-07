/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("compliments",{

	// Module config defaults.
	defaults: {
		compliments: {
			morning: [
				" Good thoughts precede great deeds. Great deeds precede success. Have a great day!",
				"If yesterday was a good day, don’t stop. Maybe your winning streak has just begun. Good morning.",
				" The biggest sources of motivation are your own thoughts, so think big and motivate yourself to win. Good morning."
			],
			afternoon: [
				"May you live every day of your life!",
				"You look nice, Good Afternoon",
				"Looking good today!"
			],
			evening: [
				"Wow, you look handsom!",
				"You look nice!, Good evening",
				"Hi , How was your day ?"
			]
		},
		updateInterval: 30000,
		fadeSpeed: 4000
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		// Schedule update timer.
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function(compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function() {
		var hour = moment().hour();

		if (hour >= 3 && hour < 12) {
			return this.config.compliments.morning;
		} else if (hour >= 12 && hour < 17) {
			return this.config.compliments.afternoon;
		} else {
			return this.config.compliments.evening;
		}
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = this.randomIndex(compliments);

		return compliments[index];
	},

	// Override dom generator.
	getDom: function() {
		var complimentText = this.randomCompliment();

		var compliment = document.createTextNode(complimentText);
		var wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(compliment);

		return wrapper;
	}

});
