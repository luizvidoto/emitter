function Emitter(){
	var actions = {};
	var register = function(once, action, callback){
		actions[action] = [{
			name: callback.name,
			once:once,
			fn:callback
		}];
	};

	this.on = function(action, callback){
		register(false, action, callback);
	};

	this.once = function(action, callback){
		register(true, action, callback);
	};

	this.off = function(action, callback){
		if (action) {
			if (callback) {
				for (var i = 0; i < actions[action].length; i++) {
					var item = actions[action][i];
					if (item.fn.name) {
						if (item.fn.name === callback.name) actions[action].splice(i, 1);

					} else {
						var a = item.fn.toString().replace(/\s/g, '');
						var b = callback.toString().replace(/\s/g, '');
						if (a === b) actions[action].splice(i, 1);
					}
				}

			} else {
				actions[action] = null;
			}
		}
	}

	this.listeners = function(action){
		if (actions.hasOwnProperty(action)) {
			return actions[action];
		}
		return actions;
	};

	this.emit = function(action){
		if (actions.hasOwnProperty(action)) {
			for (var i = 0; i < actions[action].length; i++) {
				var item = actions[action][i];
				item.fn(arguments);
				if (item.once) actions[action].splice(i, 1);
			}
		}
	};
}
