export default function ModuleRoutes(app, db) {
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const modules = db.modules?.filter(m => m.course === req.params.courseId) || [];
    res.json(modules);
  });
}
