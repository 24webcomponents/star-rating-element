const styles = new CSSStyleSheet()
styles.replaceSync(`
  fieldset {
   border: 0;
   padding: 0;
  }
  input[type="radio"] {
    appearance: none;
    width: 24px;
    aspect-ratio: 1;
  }
  input[type="radio"]:after {
    content: '';
    display: block;
    width: 24px;
    aspect-ratio: 1;
    -webkit-mask: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcuNzcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMiI+PC9wb2x5Z29uPjwvc3ZnPgo=');
    -webkit-mask-size: contain;
    background: deeppink;
  }
  fieldset:has(input[type="radio"]:hover) input[type="radio"]:after {
    background: gold;
  }
  label:has(input[type="radio"]:hover) ~ label input[type=radio]:after {
    background: deeppink;
  }
  fieldset:has(input[type="radio"]:checked) input[type="radio"]:after {
    background: gold;
  }
  label:has(input[type="radio"]:checked) ~ label input[type=radio]:after {
    background: deeppink;
  }
`)
/**
 * An example Custom Element. This documentation ends up in the
 * README so describe how this elements works here.
 *
 * You can event add examples on the element is used with Markdown.
 *
 * ```
 * <star-rating></star-rating>
 * ```
 */
class StarRatingElement extends HTMLElement {
  #renderRoot!: ShadowRoot
  static observedAttributes = ['max']
  static formAssociated = true

  #internals = this.attachInternals()
  #styles = new CSSStyleSheet()

  get max() {
    return Number(this.getAttribute('max')) || 4
  }

  set max(value: number) {
    this.setAttribute('max', `${value}`)
  }

  #value = 0
  get value() {
    return this.#value
  }

  set value(value: number) {
    value = Number(value)
    this.#value = Math.min(value, this.max)
    this.#styles.replaceSync(`:host { --value: ${this.#value} }`)
    this.#internals.setFormValue(String(this.#value))
  }

  connectedCallback(): void {
    this.#renderRoot = this.attachShadow({mode: 'open'})
    this.#renderRoot.adoptedStyleSheets.push(styles, this.#styles)
    this.#renderRoot.addEventListener('change', this)
    this.#setStars()
  }

  handleEvent(event: Event) {
    if (event.type === 'change') {
      this.value = event.target.value
    }
  }

  attributeChangedCallback(name: 'max', oldValue: string | null, newValue: string | null) {
    if (!this.#renderRoot) return
    this.#setStars()
  }

  #setStars() {
    const fieldset = document.createElement('fieldset')
    for (let i = 1; i <= this.max; i += 1) {
      const label = document.createElement('label')
      label.innerHTML = ` <input type="radio" name="stars" value="${i}"/> `
      fieldset.append(label)
    }
    this.#renderRoot.replaceChildren(fieldset)
  }

  formResetCallback() {
    console.log('reset!')
  }
}

declare global {
  interface Window {
    StarRatingElement: typeof StarRatingElement
  }
}

export default StarRatingElement

if (!window.customElements.get('star-rating')) {
  window.StarRatingElement = StarRatingElement
  window.customElements.define('star-rating', StarRatingElement)
}
