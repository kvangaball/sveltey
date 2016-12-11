(function () {
'use strict';

const config = {
    apiKey: "AIzaSyBFx6s5DDMhDzrfsYF8GnbZ-BCfFhT0UyA",
    authDomain: "slaeck-35944.firebaseapp.com",
    databaseURL: "https://slaeck-35944.firebaseio.com",
    storageBucket: "slaeck-35944.appspot.com",
    messagingSenderId: "533570292396"
  };

const firebaseApp = firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();

const brukere = firebase.database().ref('users/');
const meldinger = firebase.database().ref('chat/');

firebase.auth().onAuthStateChanged(function(user) {
  if(!user){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log("autentisert");
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      brukere.set({name: user.displayName});

      // ...
    }).catch(function(error) {

      console.log("feil", error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
  } else {
    console.log("wuu", user);
    brukere.set({name: user.displayName});
  }
});

var FirebaseApp = {
  meldinger,
  brukere
};

var template$1 = (function () {
return {
  onrender() {
    const component = this;

    FirebaseApp.meldinger.on('child_added', (msg) => {
      const alle = component.get('meldinger');
      alle.push(msg.val());
      component.set({
        'meldinger': alle
      });
    });
  },
  data() {
    return {
      meldinger: []
    }
  }
};
}());

let addedCss$1 = false;
function addCss$1 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \n  ol[svelte-2398454431], [svelte-2398454431] ol {\n    list-style: none;\n  }\n";
	document.head.appendChild( style );

	addedCss$1 = true;
}

function renderMainFragment$1 ( root, component, target ) {
	var main = document.createElement( 'main' );
	main.setAttribute( 'svelte-2398454431', '' );
	main.className = "meldinger";
	
	var ol = document.createElement( 'ol' );
	
	var eachBlock_0_anchor = document.createComment( "#each meldinger" );
	ol.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.meldinger;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	main.appendChild( ol );
	
	target.appendChild( main );

	return {
		update: function ( changed, root ) {
			var eachBlock_0_value = root.meldinger;
			
			for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
				if ( !eachBlock_0_iterations[i] ) {
					eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
				} else {
					eachBlock_0_iterations[i].update( changed, root, eachBlock_0_value, eachBlock_0_value[i], i );
				}
			}
			
			for ( var i = eachBlock_0_value.length; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( true );
			}
			
			eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
			eachBlock_0_iterations.length = eachBlock_0_value.length;
		},

		teardown: function ( detach ) {
			if ( detach ) main.parentNode.removeChild( main );
			
			
			
			for ( var i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
		}
	};
}

function renderEachBlock_0 ( root, eachBlock_0_value, m, m__index, component, target ) {
	var li = document.createElement( 'li' );
	
	var text = document.createTextNode( m );
	li.appendChild( text );
	
	target.appendChild( li );

	return {
		update: function ( changed, root, eachBlock_0_value, m, m__index ) {
			var m = eachBlock_0_value[m__index];
			
			text.data = m;
		},

		teardown: function ( detach ) {
			if ( detach ) li.parentNode.removeChild( li );
		}
	};
}

function Meldinger ( options ) {
	var component = this;
	var state = Object.assign( template$1.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	if ( !addedCss$1 ) addCss$1();
	
	var mainFragment = renderMainFragment$1( state, this, options.target );
	
	if ( options.parent ) {
		options.parent.__renderHooks.push({ fn: template$1.onrender, context: this });
	} else {
		template$1.onrender.call( this );
	}
}

var template$2 = (function () {
return {
  data() {
    return {
      "melding": ''
    }
  },
  methods: {
    endre(){
      const mld = this.get('melding');
      if(!mld) return;

      FirebaseApp.meldinger.push();
      FirebaseApp.meldinger.set(mld);

      this.set({
        'melding' : ''
      });
    },
    keydown(evt) {
      if(evt.code === 'Enter'){
          this.endre();
      }
    }
  }
}
}());

let addedCss$2 = false;
function addCss$2 () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  \n\ninput[svelte-408349965], [svelte-408349965] input {\n  width: 100%;\n  height: 3em;\n  font-size: 1.5em;\n  border: none;\n}\n";
	document.head.appendChild( style );

	addedCss$2 = true;
}

function renderMainFragment$2 ( root, component, target ) {
	var main = document.createElement( 'main' );
	main.setAttribute( 'svelte-408349965', '' );
	main.className = "msgbox";
	
	var input = document.createElement( 'input' );
	input.type = "text";
	input.placeholder = "Skriv noe";
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component.set({ melding: input.value });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.melding;
	function keydownHandler ( event ) {
		component.keydown(event);
	}
	
	input.addEventListener( 'keydown', keydownHandler, false );
	function blurHandler ( event ) {
		component.endre();
	}
	
	input.addEventListener( 'blur', blurHandler, false );
	
	main.appendChild( input );
	
	target.appendChild( main );

	return {
		update: function ( changed, root ) {
			if ( !input_updating ) input.value = root.melding;
		},

		teardown: function ( detach ) {
			if ( detach ) main.parentNode.removeChild( main );
			
			input.removeEventListener( 'input', inputChangeHandler, false );
			input.removeEventListener( 'keydown', keydownHandler, false );
			input.removeEventListener( 'blur', blurHandler, false );
		}
	};
}

function SkrivMelding ( options ) {
	var component = this;
	var state = Object.assign( template$2.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	if ( !addedCss$2 ) addCss$2();
	
	var mainFragment = renderMainFragment$2( state, this, options.target );
}

SkrivMelding.prototype = template$2.methods;

var template$3 = (function () {

return {
  onrender(){
    const component = this;

    FirebaseApp.brukere.on('child_added', function(user){
      console.log(user.val());
      const brukere = component.get('brukere');
      brukere.push(user.val());

      component.set('brukere', brukere);
    });
  },
  data(){
    return {
      brukere: []
    }
  }
};

}());

function renderMainFragment$3 ( root, component, target ) {
	var aside = document.createElement( 'aside' );
	aside.className = "brukere";
	
	var ol = document.createElement( 'ol' );
	ol.style.cssText = "list-style: none";
	
	var eachBlock_0_anchor = document.createComment( "#each brukere" );
	ol.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.brukere;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0$1( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	aside.appendChild( ol );
	
	target.appendChild( aside );

	return {
		update: function ( changed, root ) {
			var eachBlock_0_value = root.brukere;
			
			for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
				if ( !eachBlock_0_iterations[i] ) {
					eachBlock_0_iterations[i] = renderEachBlock_0$1( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
				} else {
					eachBlock_0_iterations[i].update( changed, root, eachBlock_0_value, eachBlock_0_value[i], i );
				}
			}
			
			for ( var i = eachBlock_0_value.length; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( true );
			}
			
			eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
			eachBlock_0_iterations.length = eachBlock_0_value.length;
		},

		teardown: function ( detach ) {
			if ( detach ) aside.parentNode.removeChild( aside );
			
			
			
			for ( var i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
		}
	};
}

function renderEachBlock_0$1 ( root, eachBlock_0_value, b, b__index, component, target ) {
	var li = document.createElement( 'li' );
	
	var text = document.createTextNode( b );
	li.appendChild( text );
	
	target.appendChild( li );

	return {
		update: function ( changed, root, eachBlock_0_value, b, b__index ) {
			var b = eachBlock_0_value[b__index];
			
			text.data = b;
		},

		teardown: function ( detach ) {
			if ( detach ) li.parentNode.removeChild( li );
		}
	};
}

function Brukere ( options ) {
	var component = this;
	var state = Object.assign( template$3.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment$3( state, this, options.target );
	
	if ( options.parent ) {
		options.parent.__renderHooks.push({ fn: template$3.onrender, context: this });
	} else {
		template$3.onrender.call( this );
	}
}

var template = (function () {
return {
  components: {
    Meldinger,
    SkrivMelding,
    Brukere
  }
};

}());

let addedCss = false;
function addCss () {
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                      \n.chat[svelte-1214702622], [svelte-1214702622] .chat {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.container[svelte-1214702622], [svelte-1214702622] .container {\n  display: flex;\n  flex: 1 0 auto; \n  flex-direction: row;\n}\n.brukere[svelte-1214702622], [svelte-1214702622] .brukere {\n  border: 1px solid;\n  flex: 1 0 auto;\n}\n.meldinger[svelte-1214702622], [svelte-1214702622] .meldinger {\n  border: 1px solid;\n  flex: 3 0 auto; \n}\n.msgbox[svelte-1214702622], [svelte-1214702622] .msgbox {\n  border: 1px solid;\n  flex:none;\n}\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component, target ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-1214702622', '' );
	div.className = "chat";
	
	var h1 = document.createElement( 'h1' );
	
	var text = document.createTextNode( "Chat" );
	h1.appendChild( text );
	
	div.appendChild( h1 );
	
	var text1 = document.createTextNode( "\n  " );
	div.appendChild( text1 );
	
	var div1 = document.createElement( 'div' );
	div1.className = "container";
	
	var meldinger_initialData = {
		ref: root.ref
	};
	
	var meldinger = new template.components.Meldinger({
		target: div1,
		parent: component,
		data: meldinger_initialData
	});
	
	var text2 = document.createTextNode( "\n    " );
	div1.appendChild( text2 );
	
	var brukere = new template.components.Brukere({
		target: div1,
		parent: component
	});
	
	div.appendChild( div1 );
	
	var text3 = document.createTextNode( "\n\n  " );
	div.appendChild( text3 );
	
	var skrivMelding_initialData = {
		ref: root.ref
	};
	
	var skrivMelding = new template.components.SkrivMelding({
		target: div,
		parent: component,
		data: skrivMelding_initialData
	});
	
	target.appendChild( div );

	return {
		update: function ( changed, root ) {
			var meldinger_changes = {};
			
			if ( 'ref' in changed ) meldinger_changes.ref = root.ref;
			
			if ( Object.keys( meldinger_changes ).length ) meldinger.set( meldinger_changes );
			
			var skrivMelding_changes = {};
			
			if ( 'ref' in changed ) skrivMelding_changes.ref = root.ref;
			
			if ( Object.keys( skrivMelding_changes ).length ) skrivMelding.set( skrivMelding_changes );
		},

		teardown: function ( detach ) {
			if ( detach ) div.parentNode.removeChild( div );
			
			
			
			if ( detach ) text.parentNode.removeChild( text );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			
			
			meldinger.teardown( false );
			
			if ( detach ) text2.parentNode.removeChild( text2 );
			
			brukere.teardown( false );
			
			if ( detach ) text3.parentNode.removeChild( text3 );
			
			skrivMelding.teardown( false );
		}
	};
}

function Chat ( options ) {
	var component = this;
	var state = options.data || {};

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
		
		while ( this.__renderHooks.length ) {
			var hook = this.__renderHooks.pop();
			hook.fn.call( hook.context );
		}
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	if ( !addedCss ) addCss();
	
	this.__renderHooks = [];
	
	var mainFragment = renderMainFragment( state, this, options.target );
	
	while ( this.__renderHooks.length ) {
		var hook = this.__renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

var chat = new Chat({
  target: document.querySelector( '#root' ),
  data: {
    
  }
});

}());
