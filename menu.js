document.getElementById("btn").onclick = function() {btn()};

function btn() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
}
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});