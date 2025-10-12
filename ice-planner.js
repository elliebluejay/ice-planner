/**
 * Copyright 2025 elliebluejay
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ice-planner`
 * 
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ice-planner";
  }

  /* constructor initializes the component */
  constructor() {
    super();
    /* this.title = ""; */
    this.t = this.t || {};
    this.t = {
      ...this.t,
      /* title: "Title", */
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ice-planner.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  // Re-renders whenever these properties change
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      heading: { type: String },
      count: { type: Number },
      min: { type: Number },
      max: { type: Number },
      plusButton: { type: String },
      minusButton: { type: String },
      constant: { type: Number },
    };
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}</span> ${this.title}</h3>
  <slot></slot>
</div>`;
  }

  firstUpdated() {
    // Ensure the page DOM (light DOM controls) is ready before
    // trying to query and attach listeners to the number-input groups.
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => this.initIceCounter());
    } else {
      // If DOM already parsed, run on next tick so other elements are present.
      setTimeout(() => this.initIceCounter(), 0);
    }
  }

  // defines the variables using querySelector
  initIceCounter() {
    var el = {
      iceCost: document.querySelector("#iceCost"),
      slots: document.querySelector("#slots"),
      fee: document.querySelector("#fee"),
      coach: document.querySelector("#coachCost"),
      jersey: document.querySelector("#jerseyCost"),
      players: document.querySelector("#numplayers"),
      total: document.querySelector("#totalCost"),
      perPlayer: document.querySelector("#costPerPlayer"),
      team: document.querySelector("#teamName"),
      logo: document.querySelector("#teamLogo"),
    };
    // defines the team logos for each selection
    const teamLogos = {
      beavers: "https://www.shutterstock.com/image-vector/badger-logo-on-isolated-background-600w-2466779549.jpg",
      bears: "https://t4.ftcdn.net/jpg/05/12/00/91/360_F_512009117_3LDLJIpHLKQyo05cHo9SkibkLxBZ080K.jpg",
      penguins: "https://media.istockphoto.com/id/931877984/vector/penguin-icon.jpg?s=612x612&w=0&k=20&c=n50abm_m8cViki2PFE7aEAh_jtRjT5O_Vg_dUkorH9Y="
    }
    // calculates the total cost and the per player cost
    function calculate() {
      var iceTotal = el.iceCost.value * el.slots.value; // ice cost * hours
      var subtotal = iceTotal + +el.coach.value + +el.jersey.value; // ice total + coach + jersey
      var total = subtotal * (1 + el.fee.value / 100); // adds the fee percentage
      var players = Math.max(1, el.players.value); // div by num of players, at least 1
      var perPlayer = total / players; // cost per player

      el.total.textContent = "$" + total.toFixed(2);   // total cost, 2 decimals
      el.perPlayer.textContent = "$" + perPlayer.toFixed(2); // cost per player, 2 decimals
    }

    // updates the logo with the team info
    function updateLogo() {
      var selected = el.team.value;
      el.logo.src = teamLogos[selected];
      el.logo.alt = selected + " logo";
    }

    // Setup + / − buttons
    var groups = document.querySelectorAll(".number-input");
    for (var i = 0; i < groups.length; i++) {
      (function (group) {
        var input = group.querySelector("input");
        var plus = group.querySelector(".plus");
        var minus = group.querySelector(".minus");

        // Event.Listener - Increase the input value by one and calls calculate function
        plus.addEventListener("click", function () {
          input.value = +input.value + 1;
          calculate();
        });

        // Event.Listener - Decrease the input value by one and calls calculate function
        minus.addEventListener("click", function () {
          if (input.id === "players" && +input.value <= 1) return; // players must be at least one
          input.value = Math.max(0, +input.value - 1);
          calculate();
        });

        input.addEventListener("input", calculate);
      })(groups[i]);
    }

    // Update logo when team changes
    el.team.addEventListener("change", function () {
      updateLogo();
      calculate();
    });

    // Initialize the functions
    updateLogo();
    calculate();
  };

  // call HaxProperties - haxProperties.json
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(IcePlanner.tag, IcePlanner);


/**
 * haxProperties integration via file reference
 */
