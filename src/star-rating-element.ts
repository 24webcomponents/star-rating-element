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
  connectedCallback(): void {
    this.textContent = ':wave:'
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
