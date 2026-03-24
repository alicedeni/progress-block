# Progress

Прототип блока Progress для использования в мобильных web-приложениях.
Основное предназначение блока отображать процесс выполнения процессов и их прогресс
выполнения

_HTML, CSS, JavaScript_

## Структура

| Файл          | Назначение      |
| ------------- | --------------- |
| `styles.css`  | Стили и адаптив |
| `progress.js` | Блок и API      |
| `index.html`  | Разметка        |
| `index.js`    | Связка          |

**Демо:** [https://alicedeni.github.io/progress-block/](https://alicedeni.github.io/progress-block/)

---

**Блок:** круговой индикатор (svg), опции: вращение и скрытие. Вставляется в контейнер через `progress.js` + стили классов `pr`, `pr__*`

**API:** `attachProgressBlock(container, { value, animated, hidden })`:

Объект с `setValue` / `getValue`, `setAnimated` / `isAnimated`, `setHidden` / `isHidden`, `getState`, `setState`, `destroy`

Алиас: `ProgressBlock`
