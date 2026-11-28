import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
export const metadata: Metadata = { title: '高等代数英文讲堂 · 线性空间与线性变换', description: '以定义、定理和证明为核心的英文讲稿。覆盖第二章至第六章正文及第七章线性变换§1—§3，按教材顺序提供完整板书、简单英文口述和记号读法。' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }

