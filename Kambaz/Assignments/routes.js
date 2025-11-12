export default function AssignmentRoutes(app, db) {
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const assignments = db.assignments?.filter(a => a.course === req.params.courseId) || [];
    res.json(assignments);
  });
}
