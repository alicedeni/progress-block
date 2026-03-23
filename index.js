(function () {
  var progressRoot = document.getElementById('progress-root');
  var valueInput = document.getElementById('control-value');
  var animateInput = document.getElementById('control-animate');
  var hideInput = document.getElementById('control-hide');
  var progress = attachProgressBlock(progressRoot, {
    value: parseInt(valueInput.value, 10) || 0,
    animated: animateInput.checked,
    hidden: hideInput.checked
  });

  function syncValue() {
    var value = parseInt(valueInput.value, 10);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    valueInput.value = String(value);
    progress.setValue(value);
  }

  valueInput.addEventListener('input', function () {
    if (valueInput.value === '' || valueInput.value === '-') return;
    syncValue();
  });

  valueInput.addEventListener('change', syncValue);
  animateInput.addEventListener('change', function () {
    progress.setAnimated(animateInput.checked);
  });
  hideInput.addEventListener('change', function () {
    progress.setHidden(hideInput.checked);
  });

  window.__progressBlock = progress;
})();