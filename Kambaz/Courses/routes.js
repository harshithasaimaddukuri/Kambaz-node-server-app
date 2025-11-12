export default function CourseRoutes(app, db) {
  app.get("/api/courses", (req, res) => {
    res.json(db.courses || []);
  });
  
  app.get("/api/courses/:courseId", (req, res) => {
    const course = db.courses?.find(c => c._id === req.params.courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });
}
