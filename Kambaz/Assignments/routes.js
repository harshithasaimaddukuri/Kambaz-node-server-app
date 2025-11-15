export default function AssignmentRoutes(app, db) {
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const assignments = db.assignments?.filter(a => a.course === req.params.courseId) || [];
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      _id: `A${Date.now()}`,
      course: req.params.courseId,
    };
    db.assignments.push(newAssignment);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentIndex = db.assignments.findIndex(a => a._id === assignmentId);
    if (assignmentIndex !== -1) {
      db.assignments[assignmentIndex] = { ...db.assignments[assignmentIndex], ...req.body };
      res.json(db.assignments[assignmentIndex]);
    } else {
      res.sendStatus(404);
    }
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    db.assignments = db.assignments.filter(a => a._id !== assignmentId);
    res.sendStatus(200);
  });
}