import CourseShell from './course-shell';
import lecture from './lecture.json';
import measure from './measure.json';
export default function Home() { return <CourseShell algebra={lecture} measure={measure} />; }
