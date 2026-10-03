'use client';

import { useState } from 'react';
import LectureReader from './reader';
import MeasureReader from './measure-reader';
import type { MeasureSection } from './measure-reader';
import type { ComponentProps } from 'react';
import './courses.css';

type Props = {
  algebra: ComponentProps<typeof LectureReader>['sections'];
  measure: MeasureSection[];
};

export default function CourseShell({ algebra, measure }: Props) {
  const [course, setCourse] = useState<'algebra' | 'measure'>('algebra');
  function selectCourse(next: 'algebra' | 'measure') {
    if (next === course) return;
    setCourse(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  return (
    <div className="course-shell">
      <nav className="course-switcher" aria-label="选择学习课程">
        <span className="course-label">数学学习</span>
        <div className="course-options">
          <button type="button" aria-pressed={course === 'algebra'} onClick={() => selectCourse('algebra')}>高等代数</button>
          <button type="button" aria-pressed={course === 'measure'} onClick={() => selectCourse('measure')}>测度论</button>
        </div>
        <span className="course-caption">{course === 'algebra' ? '英文讲稿与板书' : '中文讲义 · 英文术语'}</span>
      </nav>
      {course === 'algebra'
        ? <LectureReader sections={algebra} />
        : <MeasureReader sections={measure} returnToAlgebra={() => selectCourse('algebra')} />}
    </div>
  );
}
