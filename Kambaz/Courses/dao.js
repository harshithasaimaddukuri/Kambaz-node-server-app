import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  const findAllCourses = () => {
    return model.find();
  };

  const findCourseById = (courseId) => {
    return model.findById(courseId);
  };

  const createCourse = (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  };

  const updateCourse = (courseId, courseUpdates) => {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  };

  const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
  };

  return {
    findAllCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}