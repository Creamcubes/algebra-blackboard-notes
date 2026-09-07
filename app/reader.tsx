'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock3, PanelLeft, NotebookPen } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
type Block = { type: string; text: string; latex?: string; html?: string };
type Section = { id: string; title: string; zh: string; time: string; blocks: Block[] };
function Navigation({ sections, current, select }: { sections: Section[]; current: number; select: (i: number) => void }) {
 const { setOpenMobile } = useSidebar();
 return <Sidebar className="lecture-sidebar"><SidebarHeader className="brand"><span className="brand-mark">A<span>Ⅰ</span></span><div><strong>高等代数</strong><p>ENGLISH BLACKBOARD</p></div></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>第一讲 · 行列式与排列</SidebarGroupLabel><SidebarMenu>{sections.map((s,i)=><SidebarMenuItem key={s.id}><SidebarMenuButton className="chapter-link" isActive={i===current} onClick={()=>{select(i);setOpenMobile(false)}}><span className="chapter-number">{String(i+1).padStart(2,'0')}</span><span>{s.zh}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroup></SidebarContent><SidebarFooter className="source-note"><BookOpen size={17}/><p>北大《高等代数》第五版<br/>第二章 §1—§3 · 第33—40页</p></SidebarFooter></Sidebar>;
}
function MenuButton(){const {toggleSidebar}=useSidebar();return <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="展开或收起目录"><PanelLeft size={20}/></Button>}
export default function LectureReader({ sections }: { sections: Section[] }) {
 const [current,setCurrent]=useState(1); const [mode,setMode]=useState('script'); const [notes,setNotes]=useState(true);
 const section=sections[current]; const select=(i:number)=>{setCurrent(i);window.scrollTo({top:0,behavior:'instant'});};
 const blocks=section.blocks; const boardBlocks=blocks.filter(b=>b.type==='math'||b.type==='heading'||(notes&&b.type==='cue'));
 function renderBlock(b:Block,i:number){
  if(b.type==='math')return <div key={i} className="equation" tabIndex={0} aria-label="数学公式，可横向滚动" dangerouslySetInnerHTML={{__html:b.html||''}}/>;
  if(b.type==='cue')return notes?<aside className="board-cue" key={i}><NotebookPen size={16}/><span>{b.text.replace(/^板书与节奏\s*/, '')}</span></aside>:null;
  if(b.type==='heading')return <h3 key={i}>{b.text}</h3>;
  return <p key={i} lang={/[\u3400-\u9fff]/.test(b.text)?'zh-CN':'en'}>{b.text}</p>;
 }
 return <SidebarProvider style={{'--sidebar-width':'280px'} as React.CSSProperties}><a className="skip-link" href="#lecture-content">跳转到讲稿</a><Navigation sections={sections} current={current} select={select}/><main className="main-surface"><header className="topbar"><div className="breadcrumb"><MenuButton/><span>Lecture 01</span><span className="crumb-divider">/</span><span>Determinants & Permutations</span></div><span className="duration"><Clock3 size={15}/>50 min</span></header><div className="reading-shell" id="lecture-content"><div className="section-eyebrow"><span>CHAPTER TWO</span><span>{String(current+1).padStart(2,'0')} / {String(sections.length).padStart(2,'0')}</span></div><h1>{section.title}</h1><div className="section-meta"><span>{section.zh}</span><span className="meta-dot">·</span><span>{section.time}</span></div><Tabs value={mode} onValueChange={v=>setMode(String(v))} className="reading-tabs"><div className="reading-controls"><TabsList variant="line" aria-label="阅读方式"><TabsTrigger value="script">讲稿与板书</TabsTrigger><TabsTrigger value="board">纯板书</TabsTrigger></TabsList><label className="notes-toggle"><Switch checked={notes} onCheckedChange={setNotes} aria-label="显示中文板书提示"/><span>中文提示</span></label></div><TabsContent value="script"><article className="lecture-prose">{blocks.map(renderBlock)}</article></TabsContent><TabsContent value="board"><article className="lecture-prose board-mode"><div className="board-label">BLACKBOARD / {section.zh}</div>{boardBlocks.length?boardBlocks.map(renderBlock):<p className="empty-board">这一节以口头表达为主，请切换到「讲稿与板书」阅读。</p>}</article></TabsContent></Tabs><nav className="chapter-pagination" aria-label="讲稿章节导航"><Button variant="outline" disabled={current===0} onClick={()=>select(current-1)}><ArrowLeft size={16}/>上一节</Button><span>{current+1} / {sections.length}</span><Button disabled={current===sections.length-1} onClick={()=>select(current+1)}>下一节<ArrowRight size={16}/></Button></nav><footer className="reader-footer">第一讲 · 定义、定理与证明<span>时间包含板书，试讲后校准</span></footer></div></main></SidebarProvider>;
}

