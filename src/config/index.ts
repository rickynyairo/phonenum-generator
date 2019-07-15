import dotenv from "dotenv";

dotenv.config();

const {
  env: {
    PORT,
  },
} = process;

export default Object.freeze({
    PORT
});
