import {addCommasToNumber} from "./utils/utils";


// Total donations and backers from stats section
const totalDonations = document.querySelector("#totalDonations");
const totalBackers = document.querySelector("#totalBackers");

// Progress bar
const progressBar = document.querySelector(".progress-bar__fill");

// Units left
const bambooUnitsLeft = document.querySelectorAll("[bamboo-units-left]");
const blackUnitsLeft = document.querySelectorAll("[black-units-left]");
const mahoganyUnitsLeft = document.querySelectorAll("[mahogany-units-left]");

class GlobalState {
    constructor() {
        this._totalDonations = 89914;
        this._totalBackers = 5007;

        this._hasUserBackedBefore = false;
    
        this._unitsLeft = {
            noReward: 1,
            bamboo: 101,
            black: 64,
            mahogany: 0,
        }
    }


    // UPDATE GLOBAL STATE DATA

    updateGlobalState(plan, value) {
        switch (plan) {
            case bamboo:
                if (this._unitsLeft.bamboo !== 0) {
                    this._unitsLeft.bamboo--;
                }
            break;

            case black:
                if (this._unitsLeft.black !== 0) {
                    this._unitsLeft.black--;
                }
            break;

            case mahogany:
                if (this._unitsLeft.mahogany !== 0) {
                    this._unitsLeft.mahogany--;
                }
            break;

            default:
            break;
        }

        "Tener cuidado con el no reward pledge, ya que añadiria $1, no 0"
        this._totalDonations += value;

        if (!this._hasUserBackedBefore) {
            this._hasUserBackedBefore = true;
            this._totalBackers++;
        }

        this._renderAll();
    }


    // RENDER DOM

    _renderStats() {
        totalDonations.textContent = addCommasToNumber(this._totalDonations);
        totalBackers.textContent = addCommasToNumber(this._totalBackers);
    }

    _renderProgressBar() {
        // Total donations divided by the target amount
        const percentage = (this._totalDonations / 100000).toFixed(2);
        progressBar.style.transform = `scale(${percentage})`;
    }

    _renderUnitsLeft() {
        bambooUnitsLeft.forEach(element => element.textContent = this._unitsLeft.bamboo);
        blackUnitsLeft.forEach(element => element.textContent = this._unitsLeft.black);
        mahoganyUnitsLeft.forEach(element => element.textContent = this._unitsLeft.mahogany);
    }

    _renderAll() {
        this._renderStats();
        this._renderProgressBar();
        this._renderUnitsLeft();
    }
}

const globalState = new GlobalState();

console.log(globalState);