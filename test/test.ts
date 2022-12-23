import {assert, fixture, html} from '@open-wc/testing'
import '../src/star-rating-element'

describe('star-rating', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('star-rating')
      assert.equal('STAR-RATING', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.StarRatingElement()
      assert.equal('STAR-RATING', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    beforeEach(async function () {
      await fixture(html` <star-rating></star-rating>`)
    })

    it('initiates', function () {
      const ce = document.querySelector('star-rating')
      assert.equal(ce?.textContent, ':wave:')
    })
  })
})
