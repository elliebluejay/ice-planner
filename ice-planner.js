import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "ice-planner";
  }

  static get properties() {
    return {
      ...super.properties,
      iceCost: { type: Number },
      slots: { type: Number },
      fee: { type: Number },
      coach: { type: Number },
      jersey: { type: Number },
      players: { type: Number },
      total: { type: Number },
      perPlayer: { type: Number },
      jerseyTotal: { type: Number },
      team: { type: String },

      logo: { type: String },
    };
  }

  constructor() {
    super();
    this.iceCost = 300;
    this.slots = 50;
    this.fee = 2;
    this.coach = 3000;
    this.jersey = 0;
    this.players = 10;
    this.team = "beavers";
    this.logo = "";
    this.total = 0;
    this.perPlayer = 0;
    this.jerseyTotal = 0;
  }

  firstUpdated() {
    this.initIceCounter();
  }

  initIceCounter() {
    const el = {
      iceCost: document.querySelector("#iceCost"),
      slots: document.querySelector("#slots"),
      fee: document.querySelector("#fee"),
      coach: document.querySelector("#coachCost"),
      jersey: document.querySelector("#jerseyCost"),
      players: document.querySelector("#numplayers"),
      jerseyTotal: document.querySelector("#jerseytotal"),
      total: document.querySelector("#totalCost"),
      perPlayer: document.querySelector("#costPerPlayer"),
      team: document.querySelector("#teamName"),
      logo: document.querySelector("#teamLogo"),
    };

    const teamLogos = {
      beavers: "https://thumbs.dreamstime.com/b/beaver-icon-simple-style-white-background-79538857.jpg?w=768",
      bears: "https://t4.ftcdn.net/jpg/05/12/00/91/360_F_512009117_3LDLJIpHLKQyo05cHo9SkibkLxBZ080K.jpg",
      penguins: "https://media.istockphoto.com/id/931877984/vector/penguin-icon.jpg?s=612x612&w=0&k=20&c=n50abm_m8cViki2PFE7aEAh_jtRjT5O_Vg_dUkorH9Y="
    };

    const toggleButton = document.getElementById("toggleDarkMode");
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });

  document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleDarkMode");

  // Initialize button text based on localStorage or default
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "Light Mode";
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
    toggleButton.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
});


    function calculate() {
      const iceTotal = Number(el.iceCost.value) * Number(el.slots.value);
      const jerseyTotal = Number(el.jersey.value) * Number(el.players.value); // Total jersey cost
      const subtotal = iceTotal + Number(el.coach.value) + jerseyTotal;
      const total = subtotal * (1 + Number(el.fee.value) / 100);
      const players = Math.max(1, Number(el.players.value));
      const perPlayer = total / players;

      if (el.jerseyTotal) el.jerseyTotal.textContent = "$" + jerseyTotal.toFixed(2);
      if (el.total) el.total.textContent = "$" + total.toFixed(2);
      if (el.perPlayer) el.perPlayer.textContent = "$" + perPlayer.toFixed(2);
    }

    function updateLogo() {
      const selected = el.team.value.toLowerCase();
      el.logo.src = teamLogos[selected] || "";
      el.logo.alt = selected + " logo";
    }

    // Event listeners for jersey cost and number of players
    if (el.jersey) el.jersey.addEventListener("input", calculate);
    if (el.players) el.players.addEventListener("input", calculate);

    // + / − buttons
    const groups = document.querySelectorAll(".number-input");
    groups.forEach(group => {
      const input = group.querySelector("input");
      const plus = group.querySelector(".plus");
      const minus = group.querySelector(".minus");

      if (plus) plus.addEventListener("click", () => {
        input.value = Number(input.value) + 1;
        calculate();
      });

      if (minus) minus.addEventListener("click", () => {
        if (input.id === "numplayers" && Number(input.value) <= 1) return;
        input.value = Math.max(0, Number(input.value) - 1);
        calculate();
      });

      if (input) input.addEventListener("input", calculate);
    });

    if (el.team) el.team.addEventListener("change", () => {
      updateLogo();
      calculate();
    });

    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });


    // Initial render
    updateLogo();
    calculate();
  }
}

customElements.define(IcePlanner.tag, IcePlanner);
