import logo from "./assets/milano-2.png";
import { BsCaretDownSquareFill } from "react-icons/bs";

const GoogleForm = "https://forms.gle/vDuLfQ7Bc9iKxT2o8";

function NavigationBar() {
  return (
    <nav className="navbar is-light has-shadow py-4 mb-2">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img src={logo} style={{ maxHeight: "150px" }} />
        </a>
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="title-subtitle-container">
              <p className="title">Milan Standup Comedy Map</p>
              <p className="subtitle">Perform comedy near you</p>
            </div>
          </div>
          <div
            className="navbar-burger"
            onClick={() =>
              document.getElementById("nav-links").classList.toggle("is-active")
            }
          >
            <BsCaretDownSquareFill fontSize="3em" />
          </div>
        </div>
      </div>
      <div className="navbar-menu" id="nav-links">
        <div className="navbar-end">
          <a className="navbar-item navbar-item-centered" href={GoogleForm}>
            🎤 Submit an open mic night
          </a>
          <a
            className="js-modal-trigger navbar-item-centered"
            data-target="modal-js-example"
          >
            ❓ F.A.Q.
          </a>
          <a
            className="navbar-item navbar-item-centered"
            href="https://www.instagram.com/_anarchytect/"
          >
            📣 Contact me for feedbacks!
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});
