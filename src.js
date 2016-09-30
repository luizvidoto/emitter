function Emitter(){
	var fac = {};
	var actions = {};
	var register = function(once, action, callback){
		if (!actions.hasOwnProperty(action)) actions[action] = [];
		actions[action].push({
			name: callback.name,
			once: once,
			fn: callback
		});
	};

	fac.on = function(action, callback){
		register(false, action, callback);
	};

	fac.once = function(action, callback){
		register(true, action, callback);
	};

	fac.off = function(action, callback){
		if (action) {
			if (callback) {
				for (var i = 0; i < actions[action].length; i++) {
					var item = actions[action][i];
					if (item.fn.name) {
						if (item.fn.name === callback.name) {
							actions[action].splice(i, 1);
							i--;
						}

					} else {
						var a = item.fn.toString().replace(/\s/g, '');
						var b = callback.toString().replace(/\s/g, '');
						if (a === b) {
							actions[action].splice(i, 1);
							i--;
						}
					}
				}

			} else {
				actions[action] = [];
			}
		} else {
			actions = {};
		}
	};

	fac.listeners = function(action){
		if (actions.hasOwnProperty(action)) return actions[action];
		return actions;
	};

	fac.emit = function(action, value){
		if (actions.hasOwnProperty(action)) {
			for (var i = 0; i < actions[action].length; i++) {
				var item = actions[action][i];
				item.fn(value);
				if (item.once) {
					actions[action].splice(i, 1);
					i--;
				}
			}
		}
	};

	return fac;
}
