(function (root) {
  var SVG_NS = 'http://www.w3.org/2000/svg';

  function clamp(value, min, max) {
    var number = Number(value);
    if (Number.isNaN(number)) return min;
    if (number < min) return min;
    if (number > max) return max;
    return number;
  }

  function buildProgressArcPath(cx, cy, r, percent) {
    var p = clamp(percent, 0, 100);
    if (p <= 0) return '';
    var startX = cx;
    var startY = cy - r;

    if (p >= 100) {
      return (
        'M ' + startX + ' ' + startY +
        ' A ' + r + ' ' + r + ' 0 1 1 ' + cx + ' ' + (cy + r) +
        ' A ' + r + ' ' + r + ' 0 1 1 ' + startX + ' ' + startY
      );
    }

    var angle = (2 * Math.PI * p) / 100;
    var endX = cx + r * Math.sin(angle);
    var endY = cy - r * Math.cos(angle);
    var largeArc = p > 50 ? 1 : 0;

    return (
      'M ' + startX + ' ' + startY +
      ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + endX + ' ' + endY
    );
  }

  function attachProgressBlock(container, initialState) {
    if (!container || container.nodeType !== 1) {
      throw new TypeError('type_err');
    }

    var value = clamp(initialState && initialState.value, 0, 100);
    var animated = !!(initialState && initialState.animated);
    var hidden = !!(initialState && initialState.hidden);
    var cx = 50;
    var cy = 50;
    var r = 39;

    container.classList.add('pr');

    var spinner = document.createElement('div');
    spinner.className = 'pr__spinner';

    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'pr__svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-valuemin', '0');
    svg.setAttribute('aria-valuemax', '100');

    var track = document.createElementNS(SVG_NS, 'circle');
    track.setAttribute('class', 'pr__track');
    track.setAttribute('cx', String(cx));
    track.setAttribute('cy', String(cy));
    track.setAttribute('r', String(r));
    track.setAttribute('fill', 'none');

    var arc = document.createElementNS(SVG_NS, 'path');
    arc.setAttribute('class', 'pr__arc');
    arc.setAttribute('fill', 'none');

    svg.appendChild(track);
    svg.appendChild(arc);
    spinner.appendChild(svg);
    container.appendChild(spinner);

    function renderValue() {
      arc.setAttribute('d', buildProgressArcPath(cx, cy, r, value));
      arc.style.opacity = value > 0 ? '1' : '0';
      svg.setAttribute('aria-valuenow', String(Math.round(value)));
    }

    function renderAnimated() {
      if (animated) spinner.classList.add('pr__spinner--animated');
      else spinner.classList.remove('pr__spinner--animated');
    }

    function renderHidden() {
      if (hidden) {
        container.classList.add('pr--hidden');
        container.setAttribute('aria-hidden', 'true');
      } else {
        container.classList.remove('pr--hidden');
        container.removeAttribute('aria-hidden');
      }
    }

    function sync() {
      renderValue();
      renderAnimated();
      renderHidden();
    }

    sync();

    return {
      setValue: function (nextValue) {
        value = clamp(nextValue, 0, 100);
        renderValue();
        return this;
      },
      getValue: function () {
        return value;
      },
      setAnimated: function (nextAnimated) {
        animated = !!nextAnimated;
        renderAnimated();
        return this;
      },
      isAnimated: function () {
        return animated;
      },
      setHidden: function (nextHidden) {
        hidden = !!nextHidden;
        renderHidden();
        return this;
      },
      isHidden: function () {
        return hidden;
      },
      getState: function () {
        return { value: value, animated: animated, hidden: hidden };
      },
      setState: function (patch) {
        if (!patch || typeof patch !== 'object') return this;
        if ('value' in patch) this.setValue(patch.value);
        if ('animated' in patch) this.setAnimated(patch.animated);
        if ('hidden' in patch) this.setHidden(patch.hidden);
        return this;
      },
      destroy: function () {
        while (container.firstChild) container.removeChild(container.firstChild);
        container.classList.remove('pr', 'pr--hidden');
        container.removeAttribute('aria-hidden');
      }
    };
  }

  root.attachProgressBlock = attachProgressBlock;
  root.ProgressBlock = function ProgressBlock(container, options) {
    return attachProgressBlock(container, options);
  };
})(typeof window !== 'undefined' ? window : this);