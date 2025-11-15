export default function ModuleRoutes(app, db) {
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const modules = db.modules?.filter(m => m.course === req.params.courseId) || [];
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const newModule = {
      ...req.body,
      _id: `M${Date.now()}`,
      course: req.params.courseId,
    };
    db.modules.push(newModule);
    res.json(newModule);
  });

  app.delete("/api/courses/:courseId/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    db.modules = db.modules.filter(m => m._id !== moduleId);
    res.sendStatus(200);
  });

  app.put("/api/courses/:courseId/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const moduleIndex = db.modules.findIndex(m => m._id === moduleId);
    if (moduleIndex !== -1) {
      db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...req.body };
      res.json(db.modules[moduleIndex]);
    } else {
      res.sendStatus(404);
    }
  });
}