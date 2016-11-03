/**
 * Created by ugo on 26/10/16.
 */

type Season = "winter" | "spring" | "summer" | "autumn";

export class Outfit {
  name: string;
  season: Season;
  year: number;
  clothes: any[];
  imageURL: string;

  constructor(outfit : Outfit) {
    ({name: this.name ,season: this.season, year: this.year,clothes: this.clothes, imageURL: this.imageURL} = outfit);
  }

  toString() {
    return `${this.name}: ${this.season} ${this.year}. URL image: ${this.imageURL}`
  }

}


