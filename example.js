var emitter = Emitter();
var ct1 = document.getElementById('ct1');
var ct2 = document.getElementById('ct2');
var ct3 = document.getElementById('ct3');
var ct4 = document.getElementById('ct4');
var ct5 = document.getElementById('ct5');

ct1.addEventListener('click', function(){
  emitter.emit('click');
});

emitter.on('click', function(value){
  value = value ? '; value = ' + value : '';
  ct1.innerHTML += '; Click Event ' + value;
});

emitter.on('start', function(value){
  value = value ? '; value = ' + value : '';
  ct1.innerHTML += '; Start Event ' + value;
});

emitter.once('middle', function(value){
  value = value ? '; value = ' + value : '';
  ct2.innerHTML += '; Middle Event ' + value;
});

emitter.on('middle', function(value){
  value = value ? '; value = ' + value : '';
  ct3.innerHTML += '; Middle Event ' + value;
});

emitter.once('middle', function(value){
  value = value ? '; value = ' + value : '';
  ct4.innerHTML += '; Middle Event ' + value;
});

emitter.on('end', function(value){
  value = value ? '; value = ' + value : '';
  ct5.innerHTML += '; End Event ' + value;
});

setTimeout(function(){
  emitter.emit('start', 'foo');

  setTimeout(function(){
    emitter.emit('middle');
    // emitter.off('middle');
    setTimeout(function(){
      emitter.emit('middle', 'bar');

      setTimeout(function(){
        emitter.emit('end', 5);
      }, 1000);

    }, 1000);

  }, 1000);

}, 1000);
