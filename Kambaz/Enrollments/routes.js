export default function EnrollmentRoutes(app, db) {
  app.get("/api/enrollments", (req, res) => {
    res.json(db.enrollments || []);
  });

  app.post("/api/enrollments", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { course } = req.body;
    const newEnrollment = {
      _id: Date.now().toString(),
      user: currentUser._id,
      course: course
    };
    db.enrollments = db.enrollments || [];
    db.enrollments.push(newEnrollment);
    res.json(newEnrollment);
  });

  app.delete("/api/enrollments/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    db.enrollments = db.enrollments?.filter(
      e => !(e.user === userId && e.course === courseId)
    ) || [];
    res.sendStatus(204);
  });

  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    const enrollments = db.enrollments?.filter(e => e.user === userId) || [];
    res.json(enrollments);
  });
}
