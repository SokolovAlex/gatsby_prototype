import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js"; // Define the element's API using an ES2015 class

class KlButton extends PolymerElement {
  // Define optional shadow DOM template
  static get template() {
    return html`
      <style>
        :host button {
            display: block;
            width: 150px;
            height: 50px;
            margin: 5px;
            padding: 10px 20px;
        }
      </style>
      <button on-click="clickBtn"
        style$="color: {{color}};"
        class$="{{ customclass }}">{{text}}</button>
    `;
  } // Declare properties for the element's public API


  static get properties() {
    return {
      text: {
        type: String
      },
      customclass: {
        type: String,
        value: 'primary'
      },
      color: {
        type: String,
        value: 'green'
      }
    };
  }

  constructor() {
    super();
  } // Add methods to the element's public API


  clickBtn() {
    console.log(this.text);
  }

} // Register the kl-button element with the browser


customElements.define('kl-button', KlButton);