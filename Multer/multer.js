const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

// storage setting for file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // 파일 원본이름 저장
  },
});

const upload = multer({ storage: storage }); // 미들웨어 생성

// 단일 파일 업로드
app.post("/", upload.single("img"), (req, res, next) => {
  res.status(201).send({
    message: "이미지 저장 성공",
    fileInfo: req.file,
  });
});

// 다중 파일 업로드
app.post("/multipart", upload.array("img"), (req, res, next) => {
  // console check
  req.files.map((data) => {
    console.log(data);
  });

  res.status(201).send({
    message: "이미지 저장 성공",
    fileInfo: req.files,
  });
});

app.listen(3000, () => {
  const dir = "./uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  console.log("connecting server: http://localhost:" + 3000);
});
