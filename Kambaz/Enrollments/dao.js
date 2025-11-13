export default function EnrollmentsDao(db) {
    function findEnrollmentsForUser(userId) {
      return db.enrollments.filter((e) => e.user === userId);
    }
  
    function findEnrollmentsForCourse(courseId) {
      return db.enrollments.filter((e) => e.course === courseId);
    }
  
    function enrollUserInCourse(userId, courseId) {
      const exists = db.enrollments.some(
        (e) => e.user === userId && e.course === courseId
      );
      
      if (!exists) {
        const newEnrollment = {
          _id: uuidv4(),
          user: userId,
          course: courseId
        };
        db.enrollments.push(newEnrollment);
        return newEnrollment;
      }
      return null;
    }
  
    function unenrollUserFromCourse(userId, courseId) {
      db.enrollments = db.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    }
  
    return {
      findEnrollmentsForUser,
      findEnrollmentsForCourse,
      enrollUserInCourse,
      unenrollUserFromCourse
    };
  }