export default function EnrollmentRoutes(app, db) {
  app.get("/api/enrollments", (req, res) => {
    res.json(db.enrollments || []);
  });
}
