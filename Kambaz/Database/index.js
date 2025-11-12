const courses = [
  {
    _id: "RS101",
    name: "Rocket Propulsion",
    number: "RS4550",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    credits: 4,
    description: "Fundamentals of rocket propulsion",
    image: "/images/reactjs.jpg"
  },
  {
    _id: "RS102",
    name: "Aerodynamics",
    number: "RS4560",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    credits: 3,
    description: "Principles of aerodynamics",
    image: "/images/reactjs.jpg"
  },
  {
    _id: "RS103",
    name: "Spacecraft Design",
    number: "RS4570",
    startDate: "2023-01-10",
    endDate: "2023-05-15",
    credits: 4,
    description: "Spacecraft systems and design",
    image: "/images/reactjs.jpg"
  }
];

const modules = [
  {
    _id: "M101",
    name: "Introduction to Rocketry",
    description: "Basic rocket concepts",
    course: "RS101",
    lessons: []
  },
  {
    _id: "M102",
    name: "Fuel and Combustion",
    description: "Understanding rocket fuel",
    course: "RS101",
    lessons: []
  },
  {
    _id: "M103",
    name: "Nozzle Design",
    description: "Principles of nozzle design",
    course: "RS101",
    lessons: []
  }
];

const assignments = [
  {
    _id: "A101",
    title: "Propulsion Assignment",
    course: "RS101",
    points: 100,
    due: "2024-05-13",
    available: "2024-05-06",
    description: "Submit your propulsion system analysis"
  },
  {
    _id: "A102",
    title: "Combustion Analysis",
    course: "RS101",
    points: 100,
    due: "2024-05-20",
    available: "2024-05-13",
    description: "Analyze combustion efficiency"
  }
];

const users = [
  {
    _id: "123",
    username: "iron_man",
    password: "stark123",
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    role: "FACULTY"
  },
  {
    _id: "234",
    username: "dark_knight",
    password: "wayne123",
    firstName: "Bruce",
    lastName: "Wayne",
    email: "bruce@wayne.com",
    role: "STUDENT"
  }
];

const enrollments = [
  { _id: "1", user: "123", course: "RS101" },
  { _id: "2", user: "123", course: "RS102" },
  { _id: "3", user: "234", course: "RS101" }
];

export default { 
  courses,
  modules,
  assignments,
  users,
  enrollments
};
