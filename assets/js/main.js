// target elements with the "draggable" class
var drag_pos = {x: 0, y: 0}
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,
      end: dragStopListener
      // call this function on every dragend event
      /*end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }*/
    }
  })

function dragMoveListener (e) {
  var target = e.target
  // keep the dragged position in the data-x/data-y attributes
  /*var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy*/
  drag_pos.x += e.dx;
  drag_pos.y += e.dy;

  e.target.style.transform = 'translate(' + drag_pos.x + 'px, ' + drag_pos.y + 'px)';

  // translate the element
  /*target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'*/

  // update the posiion attributes
  /*target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)*/

}

function dragStopListener(e) {
  /*var target = e.target;
  target.setAttribute('data-x', 0);
  console.log(target.getAttriute(data-x));*/
  if(!e.target.classList.contains('dropped')) {
    drag_pos.x = 0;
    drag_pos.y = 0;
    e.target.style.transform = 'translate(0px, 0px)';
  }
  
  /*console.log(e.target.classList);*/
}

interact('.dropzone')
  .dropzone({
  // only accept elements matching this CSS selector
  accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    draggableElement.textContent = 'Dragged in'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
  },
  ondrop: function (event) {
    var draggableElement = event.relatedTarget
    event.relatedTarget.textContent = 'Dropped'
    draggableElement.classList.add('dropped')
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')

  }
})

/*interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
  })*/