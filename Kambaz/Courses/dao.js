export default function CoursesDao(db) {
    function findAllCourses() {
      return db.courses;
    }
  
    function createCourse(course) {
      const newCourse = { ...course, _id: uuidv4() };
      db.courses = [...db.courses, newCourse];
      return newCourse;
    }
  
    function deleteCourse(courseId) {
      db.courses = db.courses.filter((course) => course._id !== courseId);
    }
  
    function updateCourse(courseId, courseUpdates) {
      const course = db.courses.find((course) => course._id === courseId);
      if (course) {
          Object.assign(course, courseUpdates);
      }
      return course;
    }
    
    return { 
      findAllCourses, 
      createCourse, 
      deleteCourse, 
      updateCourse 
    };
  }