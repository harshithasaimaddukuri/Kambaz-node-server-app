import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  const findModulesForCourse = (courseId) => {
    return model.find({ course: courseId });
  };

  const findModuleById = (moduleId) => {
    return model.findById(moduleId);
  };

  const createModule = (module) => {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
  };

  const updateModule = (moduleId, moduleUpdates) => {
    return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  };

  const deleteModule = (moduleId) => {
    return model.deleteOne({ _id: moduleId });
  };

  const deleteModulesForCourse = (courseId) => {
    return model.deleteMany({ course: courseId });
  };

  return {
    findModulesForCourse,
    findModuleById,
    createModule,
    updateModule,
    deleteModule,
    deleteModulesForCourse,
  };
}