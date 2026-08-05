import { Distro } from "../models/distro";

export class MatchingAlgorithm {
    distributionList: Distro[];
    constructor(distros: Distro[]) { 
        this.distributionList = distros;
    }

    public getRandomDistro() {
        const randomIndex = Math.floor(Math.random() * this.distributionList.length);
        return this.distributionList[randomIndex];
    }
}