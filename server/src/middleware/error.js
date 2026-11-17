export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: Object.values(err.errors)[0].message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  res.status(err.status || 500).json({ message: err.message || "Lỗi máy chủ" });
};