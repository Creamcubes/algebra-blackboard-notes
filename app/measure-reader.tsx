'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, NotebookPen, PanelLeft, X } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

type MeasureBlock = { type: string; text: string; html?: string };
export type MeasureSection = {
  id: string;
  lecture: number;
  title: string;
  term: string;
  source: { file: string; start: string; end: string };
  blocks: MeasureBlock[];
  englishTitle: string;
  englishBlocks: MeasureBlock[];
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

function Block({ block, english = false, notes = true }: { block: MeasureBlock; english?: boolean; notes?: boolean }) {
  if (block.type === 'math') return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Long equations need keyboard focus for horizontal scrolling.
    <div className="equation" tabIndex={0} aria-label="数学公式，可横向滚动" dangerouslySetInnerHTML={{ __html: block.html || '' }} />
  );
  if (block.type === 'statement') return <p className="measure-statement"><strong>{block.text}</strong></p>;
  if (block.type === 'heading') return <h2>{block.text}</h2>;
  if (block.type === 'cue') return notes ? <aside className="board-cue" lang="zh-CN"><NotebookPen size={16} /><span>{block.text}</span></aside> : null;
  if (block.type === 'note' || block.type === 'supplement') return <aside lang={block.type === 'note' ? 'zh-CN' : english ? 'en' : 'zh-CN'} className={`measure-note ${block.type}`}><span className="measure-note-label">{block.type === 'note' ? '字幕核对与课程说明' : english ? 'Supplementary explanation / 补充说明' : '补充说明'}</span><p>{block.text.replace(/^补充说明：/, '')}</p></aside>;
  return <p>{block.text}</p>;
}

export default function MeasureReader({ sections, returnToAlgebra }: { sections: MeasureSection[]; returnToAlgebra: () => void }) {
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState('chinese');
  const [notes, setNotes] = useState(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const section = sections[current];
  const boardBlocks = section.englishBlocks.filter(block => ['statement', 'math', 'heading', 'note', 'cue'].includes(block.type));
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
          <h1 ref={heading} tabIndex={-1} lang={mode === 'chinese' ? 'zh-CN' : 'en'}>{mode === 'chinese' ? section.title : section.englishTitle}</h1>
          <p className="measure-term" lang={mode === 'chinese' ? 'en' : 'zh-CN'}>{mode === 'chinese' ? section.term : section.title}</p>
          <div className="measure-source"><span>{section.source.file}</span><span>{section.source.start} — {section.source.end}</span></div>
          <Tabs value={mode} onValueChange={value => setMode(String(value))} className="reading-tabs">
            <div className="reading-controls measure-controls">
              <TabsList variant="line" aria-label="测度论阅读方式">
                <TabsTrigger value="chinese">中文讲义</TabsTrigger>
                <TabsTrigger value="english">英文讲稿</TabsTrigger>
                <TabsTrigger value="board">纯板书</TabsTrigger>
              </TabsList>
              {mode !== 'chinese' && <label className="notes-toggle" htmlFor="measure-notes"><Switch id="measure-notes" checked={notes} onCheckedChange={setNotes} aria-label="显示测度论中文板书提示" /><span>中文提示</span></label>}
            </div>
            <TabsContent value="chinese"><article className="lecture-prose measure-prose" key={section.id} lang="zh-CN">{section.blocks.map((block, index) => <Block key={index} block={block} />)}</article></TabsContent>
            <TabsContent value="english"><article className="lecture-prose measure-prose measure-english" key={section.id} lang="en">{section.englishBlocks.map((block, index) => <Block key={index} block={block} english notes={notes} />)}</article></TabsContent>
            <TabsContent value="board"><article className="lecture-prose measure-prose measure-english board-mode" key={section.id} lang="en"><div className="board-label">BLACKBOARD / {section.title}</div>{boardBlocks.map((block, index) => <Block key={index} block={block} english notes={notes} />)}</article></TabsContent>
          </Tabs>
          <nav className="chapter-pagination" aria-label="测度论知识点导航">
            <Button variant="outline" disabled={current === 0} onClick={() => select(current - 1)}><ArrowLeft size={16} />上一节</Button>
            <span>{current + 1} / {sections.length}</span>
            <Button disabled={current === sections.length - 1} onClick={() => select(current + 1)}>下一节<ArrowRight size={16} /></Button>
          </nav>
          <footer className="reader-footer"><span>中文讲义 · 英文讲稿 · 板书提示</span><span>原字幕未展开的证明在文中注明</span></footer>
        </div>
      </main>
    </SidebarProvider>
  );
}
