// import { GenFunction } from "./interfaces";
import { Request, Response } from "express";
import { GenerateNumbersValidator, validateRequest } from "./validators";
import { readFileSync, writeFile } from "fs";
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
  static async generateNumbers(req: Request, res: Response): Promise<object> {
    const numbers: number[] = [];
    let generatedNumber: number;
    const validationErrors  = await validateRequest(
      GenerateNumbersValidator,
      req.body
    );
    if (validationErrors) {
      res.status(400).send(validationErrors);
      return validationErrors;
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
    res.status(200).send(responseObject);
    return responseObject;
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
