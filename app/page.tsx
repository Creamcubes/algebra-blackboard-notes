import LectureReader from './reader';
import lecture from './lecture.json';
export default function Home() { return <LectureReader sections={lecture} />; }
