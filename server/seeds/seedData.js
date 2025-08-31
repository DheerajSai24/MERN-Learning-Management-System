require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Discussion = require('../models/Discussion');
const Note = require('../models/Note');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB for seeding'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Clear existing data
const clearCollections = async () => {
    try {
        await User.deleteMany({});
        await Course.deleteMany({});
        await Assignment.deleteMany({});
        await Discussion.deleteMany({});
        await Note.deleteMany({});
        console.log('All collections cleared');
    } catch (error) {
        console.error('Error clearing collections:', error);
        process.exit(1);
    }
};

// Create seed users
const createUsers = async () => {
    try {
        // Create a teacher user
        const teacherPassword = await bcrypt.hash('teacher123', 8);
        const teacher = new User({
            name: 'John Teacher',
            email: 'teacher@example.com',
            password: teacherPassword,
            role: 'teacher',
            profileInfo: {
                avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
                bio: 'Experienced web development instructor with 8 years in the industry.',
                phone: '555-123-4567'
            }
        });
        await teacher.save();
        
        // Create student users
        const studentPassword = await bcrypt.hash('student123', 8);
        
        const student1 = new User({
            name: 'Alice Student',
            email: 'alice@example.com',
            password: studentPassword,
            role: 'student',
            profileInfo: {
                avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
                bio: 'Computer Science student interested in web development.',
                phone: '555-987-6543'
            }
        });
        await student1.save();
        
        const student2 = new User({
            name: 'Bob Student',
            email: 'bob@example.com',
            password: studentPassword,
            role: 'student',
            profileInfo: {
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                bio: 'Learning full-stack development to build my startup idea.',
                phone: '555-456-7890'
            }
        });
        await student2.save();
        
        console.log('Users created successfully');
        return { teacher, student1, student2 };
    } catch (error) {
        console.error('Error creating users:', error);
        process.exit(1);
    }
};

// Create courses
const createCourses = async (teacher) => {
    try {
        const course1 = new Course({
            title: 'Introduction to React',
            description: 'Learn the basics of React, including components, state, and props.',
            teacherId: teacher._id,
            resources: [
                {
                    title: 'React Fundamentals PDF',
                    link: '/resources/course-materials/React Js.pdf',
                    type: 'pdf',
                    uploadedAt: new Date()
                },
                {
                    title: 'Components and Props',
                    link: 'https://reactjs.org/docs/components-and-props.html',
                    type: 'link',
                    uploadedAt: new Date()
                }
            ],
            syllabus: [
                {
                    unit: 'Unit 1: React Basics',
                    topics: ['Introduction to React', 'Components', 'JSX', 'Props and State']
                },
                {
                    unit: 'Unit 2: React Hooks',
                    topics: ['useState', 'useEffect', 'Custom Hooks']
                },
                {
                    unit: 'Unit 3: Routing and State Management',
                    topics: ['React Router', 'Context API', 'Redux Basics']
                }
            ],
            startDate: new Date(),
            endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
        });
        await course1.save();
        
        const course2 = new Course({
            title: 'Advanced JavaScript',
            description: 'Deep dive into JavaScript, covering closures, prototypes, async programming, and more.',
            teacherId: teacher._id,
            resources: [
                {
                    title: 'JavaScript Cheatsheet',
                    link: '/resources/course-materials/JS_Chapterwise_Notes (1).pdf',
                    type: 'pdf',
                    uploadedAt: new Date()
                },
                {
                    title: 'Asynchronous JavaScript',
                    link: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
                    type: 'link',
                    uploadedAt: new Date()
                }
            ],
            syllabus: [
                {
                    unit: 'Unit 1: JavaScript Fundamentals Review',
                    topics: ['Variables and Data Types', 'Functions', 'Objects and Arrays']
                },
                {
                    unit: 'Unit 2: Advanced Concepts',
                    topics: ['Closures', 'Prototypes', 'This keyword', 'Call, Apply, and Bind']
                },
                {
                    unit: 'Unit 3: Asynchronous JavaScript',
                    topics: ['Callbacks', 'Promises', 'Async/Await', 'Error Handling']
                }
            ],
            startDate: new Date(),
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
        });
        await course2.save();
        
        console.log('Courses created successfully');
        return { course1, course2 };
    } catch (error) {
        console.error('Error creating courses:', error);
        process.exit(1);
    }
};

// Enroll students in courses
const enrollStudents = async (students, courses) => {
    try {
        const { student1, student2 } = students;
        const { course1, course2 } = courses;
        
        // Add students to courses
        course1.students.push(student1._id, student2._id);
        course2.students.push(student1._id);
        
        await course1.save();
        await course2.save();
        
        // Add courses to students
        student1.enrolledCourses.push(course1._id, course2._id);
        student2.enrolledCourses.push(course1._id);
        
        // Add progress for student1
        student1.progress.push({
            course: course1._id,
            completedUnits: ['Unit 1: React Basics'],
            lastAccessed: new Date()
        });
        
        student1.progress.push({
            course: course2._id,
            completedUnits: [],
            lastAccessed: new Date()
        });
        
        // Add progress for student2
        student2.progress.push({
            course: course1._id,
            completedUnits: [],
            lastAccessed: new Date()
        });
        
        await student1.save();
        await student2.save();
        
        console.log('Students enrolled in courses successfully');
    } catch (error) {
        console.error('Error enrolling students:', error);
        process.exit(1);
    }
};

// Create assignments
const createAssignments = async (courses) => {
    try {
        const { course1, course2 } = courses;
        
        const assignment1 = new Assignment({
            courseId: course1._id,
            title: 'Build a Counter App',
            description: 'Create a simple counter application using React hooks that increments, decrements, and resets a counter.',
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
            totalPoints: 100
        });
        await assignment1.save();
        
        const assignment2 = new Assignment({
            courseId: course1._id,
            title: 'Todo List Application',
            description: 'Build a todo list application that allows adding, removing, and marking todos as complete.',
            deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
            totalPoints: 150
        });
        await assignment2.save();
        
        const assignment3 = new Assignment({
            courseId: course2._id,
            title: 'Implement Async Functions',
            description: 'Convert a callback-based API to use promises and async/await.',
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
            totalPoints: 100
        });
        await assignment3.save();
        
        console.log('Assignments created successfully');
    } catch (error) {
        console.error('Error creating assignments:', error);
        process.exit(1);
    }
};

// Create discussions
const createDiscussions = async (students, courses) => {
    try {
        const { student1, student2 } = students;
        const { course1, course2 } = courses;
        
        const discussion1 = new Discussion({
            courseId: course1._id,
            userId: student1._id,
            title: 'Help with React Hooks',
            content: 'I\'m having trouble understanding the useEffect dependency array. Can someone explain when to include dependencies?',
            comments: [
                {
                    userId: student2._id,
                    content: 'Dependencies should be added when your effect uses variables from the component scope.',
                    createdAt: new Date()
                }
            ],
            tags: ['react', 'hooks', 'help']
        });
        await discussion1.save();
        
        const discussion2 = new Discussion({
            courseId: course2._id,
            userId: student1._id,
            title: 'Best practices for async/await',
            content: 'What are some best practices when using async/await for error handling?',
            comments: [],
            tags: ['javascript', 'async', 'error-handling']
        });
        await discussion2.save();
        
        console.log('Discussions created successfully');
    } catch (error) {
        console.error('Error creating discussions:', error);
        process.exit(1);
    }
};

// Create notes
const createNotes = async (students, courses) => {
    try {
        const { student1, student2 } = students;
        const { course1, course2 } = courses;
        
        const note1 = new Note({
            studentId: student1._id,
            courseId: course1._id,
            title: 'React Components Notes',
            content: 'Components are the building blocks of React applications.\n\nFunctional components use hooks for state.\n\nClass components use this.state and lifecycle methods.',
            tags: ['react', 'components']
        });
        await note1.save();
        
        const note2 = new Note({
            studentId: student1._id,
            courseId: course2._id,
            title: 'JavaScript Closure Notes',
            content: 'A closure is the combination of a function bundled together with references to its surrounding state.\n\nClosures allow a function to access variables from an outer function even after the outer function has finished execution.',
            tags: ['javascript', 'closures']
        });
        await note2.save();
        
        const note3 = new Note({
            studentId: student2._id,
            courseId: course1._id,
            title: 'React Props vs State',
            content: 'Props are passed to the component from outside and are immutable within the component.\n\nState is managed within the component and can be updated using setState or useState hook.',
            tags: ['react', 'props', 'state']
        });
        await note3.save();
        
        console.log('Notes created successfully');
    } catch (error) {
        console.error('Error creating notes:', error);
        process.exit(1);
    }
};

// Main seeding function
const seedDatabase = async () => {
    try {
        await clearCollections();
        const users = await createUsers();
        const courses = await createCourses(users.teacher);
        await enrollStudents(users, courses);
        await createAssignments(courses);
        await createDiscussions(users, courses);
        await createNotes(users, courses);
        
        console.log('Database seeded successfully!');
        console.log('\nLogin credentials:');
        console.log('Teacher: email=teacher@example.com, password=teacher123');
        console.log('Student 1: email=alice@example.com, password=student123');
        console.log('Student 2: email=bob@example.com, password=student123');
        
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeding function
seedDatabase();
