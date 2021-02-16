function animateText(h1) {
    let text = "What is the best thing in the world?";
    let to = text.length,
      from = 0;
    animate({
      duration: 3000,
      timing: bounce,
      draw: function(progress) {
        let result = (to - from) * progress + from;
        document.getElementById("textExample").innerHTML = text.substr(0, Math.ceil(result))
      }
    });
  }

  function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      }
    }
  }