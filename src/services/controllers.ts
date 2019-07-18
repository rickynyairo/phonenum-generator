import { Request, Response } from "express";
import { GenerateNumbersValidator, validateRequest } from "./validators";
import { readFileSync, writeFile } from "fs";
// import { SortNumbers } from "./interfaces";
export class GeneratorController {
  numberOfGeneratedNumbers: number;
  constructor() {
    this.numberOfGeneratedNumbers = 0;
  }
  /**
  * @description Generates a list of random phone numbers
  * @param {number} num The number of phone numbers to be generated
  * @returns {object} the object contains a list of the generated
  * numbers and the date they were generated
  */
  static async generateNumbers(req: Request, res: Response) {
    const numbers: number[] = [];
    let generatedNumber: number;
    const validationErrors  = await validateRequest(
      GenerateNumbersValidator,
      req.body
    );
    if (validationErrors) {
      return res.status(400).send(validationErrors);
    }
    const num = req.body.number;
    for (let j = 0; j < num; j = j + 1) {
      generatedNumber = Math.floor(Math.random() * 1000000000);
      // while(!numbers.includes(generatedNumber)){
      numbers.push(generatedNumber);
      // }
    }
    const totalGenerated = GeneratorController.saveToFile(numbers);
    const responseObject =  {
      totalGenerated,
      dateGenerated: new Date(),
      numbers: GeneratorController.addZeros(numbers),
    };
    return res.status(201).send(responseObject);
  }
  /**
  * @description Returns the list of sorted numbers based on query
  * @param {sort} asc_desc The order in which to sort the numbers
  * @returns {object} the object contains a list of the sorted numbers
  */
  static sortNumbers(req: Request, res: Response): Response {
    const { phoneNumbers } = JSON.parse(
      readFileSync("src/dataStore.json", "utf-8")
    );
    const { sort } = req.query;
    // sort the numbers based on the query parameter
    if (!["asc", "desc"].includes(sort)) {
      return res.status(400).send({
        message: "Please specify sorting order as either 'desc' or 'asc'"
      });
    }
    phoneNumbers.sort(
      (num1: number, num2: number) =>
        sort === "asc"
        ? num1 - num2
        : num2 - num1

    );
    const maximum =
      sort === "asc"
      ? phoneNumbers[phoneNumbers.length - 1]
      : phoneNumbers[0]
    ;
    const minimum =
      sort === "asc"
      ? phoneNumbers[0]
      : phoneNumbers[phoneNumbers.length - 1]
    ;
    const responseObject =  {
      minimum: `${minimum}`.padStart(10, "0"),
      maximum: `${maximum}`.padStart(10, "0"),
      totalGenerated: phoneNumbers.length,
      numbers: GeneratorController.addZeros(phoneNumbers),
    };
    return res.status(200).send(responseObject);
  }
  /**
  * @description Adds zeros to generated numbers
  * @param {Array} numbers The array of generated phone numbers
  * @returns {object} the object contains a list of the generated
  * numbers with preceding zeros
  */
  static addZeros(numbers: number[]): string[] {
    const numbersWithZeros = numbers.map((num) => {
      // prepend zeros if digits are less than 9
      const numberOfZeros = 10 - num.toString().length;
      return `${"0".repeat(numberOfZeros) + num}`;
    });
    return numbersWithZeros;
  }
  /**
  * @description saves generated numbers to local json file
  * @param {Array} phoneNumbers The array of generated phone numbers
  * @returns {number} total number of generated phone numbers
  */
  static saveToFile(phoneNumbers: number[]) {
    const currentData = JSON.parse(
      readFileSync("src/dataStore.json", "utf-8")
    );
    const newData = {
      phoneNumbers: currentData.phoneNumbers.concat(phoneNumbers)
    };
    const totalNumbers = newData.phoneNumbers.length;
    writeFile(
      "src/dataStore.json",
      JSON.stringify(newData, undefined, 2),
      (err) => {
        if (err) throw err;
      }
    );
    return totalNumbers;
  }
}
