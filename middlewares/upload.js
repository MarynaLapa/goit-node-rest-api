import multer from "multer";
import path from "node:path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../temp"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: multerConfig
});

export default upload;