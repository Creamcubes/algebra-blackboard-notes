import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
export const metadata: Metadata = { title: '高等代数英文讲堂 · 行列式与排列', description: '以定义、定理和证明为核心的英文讲稿。第二章排列与 n 阶行列式，包含一般项符号与转置不变性的证明。' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }

