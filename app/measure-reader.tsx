'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, PanelLeft, X } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

type MeasureBlock = { type: string; text: string; html?: string };
export type MeasureSection = {
  id: string;
  lecture: number;
  title: string;
  term: string;
  source: { file: string; start: string; end: string };
  blocks: MeasureBlock[];
};
const lectureTitles: Record<number, string> = {
  1: '长度与不可测集合',
  2: '集合族与可加性',
  3: '连续性与第一步延拓',
  4: 'Carathéodory 延拓定理',
};

function Navigation({ sections, current, select }: { sections: MeasureSection[]; current: number; select: (index: number) => void }) {
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar className="lecture-sidebar measure-sidebar">
      <SidebarHeader className="brand">
        <span className="brand-mark">μ</span>
        <div><strong>测度论</strong><p>MEASURE THEORY</p></div>
        <button className="measure-close-menu" type="button" aria-label="关闭测度论目录" onClick={() => setOpenMobile(false)}><X size={20} /></button>
      </SidebarHeader>
      <SidebarContent>
        {[1, 2, 3, 4].map(lecture => (
          <SidebarGroup key={lecture}>
            <SidebarGroupLabel>第{lecture}讲 · {lectureTitles[lecture]}</SidebarGroupLabel>
            <SidebarMenu>
              {sections.map((section, index) => section.lecture === lecture ? (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton className="chapter-link" isActive={index === current} aria-current={index === current ? 'page' : undefined} onClick={() => { select(index); setOpenMobile(false); }}>
                    <span className="chapter-number">{String(sections.slice(0, index + 1).filter(item => item.lecture === lecture).length).padStart(2, '0')}</span>
                    <span>{section.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : null)}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="source-note"><BookOpen size={17} /><p>依据第1—4讲课程字幕整理<br />定义、定理、证明与课程原例<br />共 {sections.length} 个知识点</p></SidebarFooter>
    </Sidebar>
  );
}

function MenuButton() {
  const { toggleSidebar } = useSidebar();
  return <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="展开或收起测度论目录"><PanelLeft size={20} /></Button>;
}

function Block({ block }: { block: MeasureBlock }) {
  if (block.type === 'math') return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Long equations need keyboard focus for horizontal scrolling.
    <div className="equation" tabIndex={0} aria-label="数学公式，可横向滚动" dangerouslySetInnerHTML={{ __html: block.html || '' }} />
  );
  if (block.type === 'statement') return <p className="measure-statement"><strong>{block.text}</strong></p>;
  if (block.type === 'heading') return <h2>{block.text}</h2>;
  if (block.type === 'note' || block.type === 'supplement') return <aside className={`measure-note ${block.type}`}><span className="measure-note-label">{block.type === 'note' ? '字幕核对与课程说明' : '补充说明'}</span><p>{block.text.replace(/^补充说明：/, '')}</p></aside>;
  return <p>{block.text}</p>;
}

export default function MeasureReader({ sections, returnToAlgebra }: { sections: MeasureSection[]; returnToAlgebra: () => void }) {
  const [current, setCurrent] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const section = sections[current];
  function select(index: number) {
    setCurrent(index);
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  }
  return (
    <SidebarProvider className="measure-reader" style={{ '--sidebar-width': '300px' } as React.CSSProperties}>
      <a className="skip-link" href="#measure-content">跳转到测度论讲义</a>
      <Navigation sections={sections} current={current} select={select} />
      <main className="main-surface">
        <header className="topbar">
          <div className="breadcrumb"><MenuButton /><span>测度论学习讲义</span><span className="crumb-divider">/</span><span>第{section.lecture}讲</span></div>
          <button className="return-algebra" type="button" onClick={returnToAlgebra}><ArrowLeft size={14} />高等代数</button>
        </header>
        <div className="reading-shell" id="measure-content">
          <div className="section-eyebrow"><span>LECTURE {section.lecture} / 第{section.lecture}讲</span><span>{String(current + 1).padStart(2, '0')} / {sections.length}</span></div>
          <h1 ref={heading} tabIndex={-1}>{section.title}</h1>
          <p className="measure-term" lang="en">{section.term}</p>
          <div className="measure-source"><span>{section.source.file}</span><span>{section.source.start} — {section.source.end}</span></div>
          <article className="lecture-prose measure-prose" key={section.id} lang="zh-CN">{section.blocks.map((block, index) => <Block key={index} block={block} />)}</article>
          <nav className="chapter-pagination" aria-label="测度论知识点导航">
            <Button variant="outline" disabled={current === 0} onClick={() => select(current - 1)}><ArrowLeft size={16} />上一节</Button>
            <span>{current + 1} / {sections.length}</span>
            <Button disabled={current === sections.length - 1} onClick={() => select(current + 1)}>下一节<ArrowRight size={16} /></Button>
          </nav>
          <footer className="reader-footer"><span>中文讲解 · 英文术语 · 完整推导</span><span>原字幕未展开的证明在文中注明</span></footer>
        </div>
      </main>
    </SidebarProvider>
  );
}
