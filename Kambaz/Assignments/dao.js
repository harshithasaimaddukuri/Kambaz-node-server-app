import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = (courseId) => {
    return model.find({ course: courseId });
  };

  const findAssignmentById = (assignmentId) => {
    return model.findById(assignmentId);
  };

  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
  };

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  };

  const deleteAssignment = (assignmentId) => {
    return model.deleteOne({ _id: assignmentId });
  };

  const deleteAssignmentsForCourse = (courseId) => {
    return model.deleteMany({ course: courseId });
  };

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    deleteAssignmentsForCourse,
  };
}