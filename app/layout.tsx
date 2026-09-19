import type { Metadata } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
export const metadata: Metadata = { title: '高等代数英文讲堂 · 行列式、线性方程组与矩阵', description: '以定义、定理和证明为核心的英文讲稿。覆盖第二章行列式、第三章线性方程组及第四章矩阵§1—§7，按教材顺序提供完整板书、简单英文口述和记号读法。' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN"><body>{children}</body></html>; }

