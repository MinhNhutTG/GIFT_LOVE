const multer = require("multer");

// Lưu tạm trong bộ nhớ (không lưu ra ổ cứng)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/", "video/", "audio/"];
  const isAllowed = allowed.some(type => file.mimetype.startsWith(type));

  if (isAllowed) cb(null, true);
  else cb(new Error("Chỉ được upload hình, video, hoặc audio"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
