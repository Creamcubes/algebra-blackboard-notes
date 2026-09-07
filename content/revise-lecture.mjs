import fs from 'node:fs';
const sections=[];
let s;
const section=(id,title,zh,time)=>{s={id,title,zh,time,blocks:[]};sections.push(s)};
const text=t=>s.blocks.push({type:'text',text:t});
const cue=t=>s.blocks.push({type:'cue',text:t});
const heading=t=>s.blocks.push({type:'heading',text:t});
const math=t=>s.blocks.push({type:'math',text:'',latex:t});

section('plan','Lecture plan','范围与时间安排','50分钟 · 第二章 §1简述、§2与§3重点内容');
text('本次演讲围绕定义、定理、性质与证明展开。§1只保留行列式与解线性方程组的联系；§2保留全部定义和定理证明；新增§3至转置性质及下三角行列式结论，止于§4之前。');
text('英文正文可以直接口述；公式用于板书，中文提示不读出。时间包括书写与停顿，是试讲前的目标。中文学习仍可逐点完整进行，演讲材料按重要性取舍。');
heading('50 minute running order');
for(const t of ['00–02  Motivation and the second order determinant','02–07  Permutations, inversions and parity','07–09  Transpositions','09–16  Theorem 1 and its full proof','16–19  Equal numbers of odd and even permutations','19–25  Theorem 2 and its full proof','25–31  Definition of the determinant of order n','31–36  Examples and the triangular determinant argument','36–43  The sign of a term in arbitrary order and its proof','43–49  Transposition invariance and its proof','49–50  Summary'])text(t);
heading('Scope and preparation');
text('教材：北大《高等代数》第五版，第二章第33—40页，至§4之前。删去电路背景、二元解公式的详细消元与代回、三元解的逐列展开、阶乘的大数计算，以及重复的逆序练习。保留一例逆序计算，简述反对角线例题，完整讲上三角行列式的推导。');
text('新增的一般项符号证明是核心衔接：交换两个因子，同时交换行指标与列指标，两者逆序数之和的奇偶性保持不变。理解这一步，才能自然得到按列展开的定义与转置性质。');

section('motivation','From linear systems to determinants','引入与二阶行列式','00–02 min · §1 / p.33–34');
cue('写二阶行列式定义。解方程公式只简述，不再写消元和代回过程。');
text('Good morning. Today I will focus on the definitions and proofs that lead to determinants of arbitrary order. We will first establish the required facts about permutations, then define the determinant and prove that transposing it does not change its value.');
math(String.raw`d=\begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}=a_{11}a_{22}-a_{12}a_{21}`);
text('A determinant of order two is defined by this expression. It appears naturally when we solve two linear equations in two unknowns. If the coefficient determinant is nonzero, each unknown is the ratio of a column replacement determinant to the coefficient determinant. This motivates the general theory; the general solution rule will be proved later in the textbook.');
text('To define higher order determinants, we must specify both the products that occur and their signs. Permutations provide the language for doing this.');

section('definitions','Permutations and parity','定义1—3 排列、逆序与奇偶性','02–07 min · §2 / p.35');
heading('Definitions 1 to 3');
text('A permutation of order n is an ordered arrangement of one through n, each occurring exactly once. There are n choices for the first position, n minus one for the second, and so on. Hence there are n factorial permutations. The increasing arrangement is called the natural order.');
math(String.raw`j_1j_2\cdots j_n,\qquad\{j_1,\ldots,j_n\}=\{1,\ldots,n\}`);
math(String.raw`\#\text{permutations}=n(n-1)\cdots1=n!,\qquad 12\cdots n:\ \text{natural order}`);
text('An inversion is a pair of entries for which the earlier entry is larger than the later one. These entries need not be adjacent. The inversion number is the total number of such pairs, denoted by tau of the permutation.');
math(String.raw`p<q,\quad j_p>j_q\qquad\text{an inversion}`);
math(String.raw`\tau(j_1\cdots j_n)=\#\{(p,q):p<q,\ j_p>j_q\}`);
cue('只完整计算2431这一例，指明(2,1)并不相邻。');
text('For the permutation two, four, three, one, the inversions are two and one, four and three, four and one, and three and one. Thus the inversion number is four. We can count them without repetition by counting the smaller entries to the right of each entry.');
math(String.raw`2431:\quad(2,1),(4,3),(4,1),(3,1),\qquad\tau(2431)=4`);
text('A permutation is even when its inversion number is even, and odd when its inversion number is odd. This is its parity. Our example is even. The natural order has inversion number zero, so it is also even. These definitions extend to arrangements of any n distinct natural numbers by the same comparisons.');
math(String.raw`\begin{aligned}\tau\text{ even}&\Longrightarrow\text{even permutation},\\\tau\text{ odd}&\Longrightarrow\text{odd permutation},\\\tau(12\cdots n)&=0.\end{aligned}`);

section('transpositions','Transpositions','对换的定义','07–09 min · §2 / p.35');
text('A transposition exchanges two entries and leaves every other entry fixed. For example, exchanging the entries one and two takes two, four, three, one to one, four, three, two. The exchanged entries need not be adjacent.');
math(String.raw`2431\longleftrightarrow1432`);
text('Repeating the same transposition restores the original permutation. Thus a fixed transposition pairs all permutations, when n is at least two. No permutation is paired with itself, since its entries are distinct. The key fact is that each transposition reverses parity.');
cue('保留“对换做两次恢复原状”，随后推论使用它证明配对是一一对应。');

section('theorem-one','A transposition reverses parity','定理1及完整证明','09–16 min · §2 / p.35–36');
math(String.raw`\text{Theorem 1. A transposition reverses parity.}`);
heading('Adjacent entries');
text('First suppose that the exchanged entries j and k are adjacent. Every other entry lies either before both or after both. Exchanging j and k therefore leaves its inversion relation with each of them unchanged. Pairs involving neither entry are also unchanged.');
math(String.raw`\cdots j\,k\cdots\ \longrightarrow\ \cdots k\,j\cdots`);
text('Only the pair j, k changes its inversion status. If j is greater than k, one inversion disappears. If j is less than k, one inversion is created. The inversion number changes by minus one or plus one, so its parity reverses.');
math(String.raw`\Delta\tau=\begin{cases}-1,&j>k,\\+1,&j<k.\end{cases}`);
heading('Arbitrary entries');
text('Now suppose there are s entries between j and k. We realize their exchange using adjacent transpositions. First move k to the left across the s intermediate entries and then across j. This takes s plus one exchanges.');
math(String.raw`\cdots j\,i_1\cdots i_s\,k\cdots\ \xrightarrow{s+1}\ \cdots k\,j\,i_1\cdots i_s\cdots`);
text('Next move j to the right across the s intermediate entries. This takes s further exchanges. The intermediate entries return to their original positions, while j and k have been exchanged.');
math(String.raw`\cdots k\,j\,i_1\cdots i_s\cdots\ \xrightarrow{s}\ \cdots k\,i_1\cdots i_s\,j\cdots`);
math(String.raw`(s+1)+s=2s+1\qquad\text{odd}`);
text('Each adjacent exchange reverses parity. There are two s plus one of them, an odd number, so the final parity is opposite to the original parity. This proves the theorem. Notice that a general transposition need not change the inversion number by exactly one; it must reverse its parity.');
cue('两个阶段分别写清楚，数的是相邻对换次数。不要省掉“中间各数回到原位置”的说明。');

section('corollary','Counting odd and even permutations','推论及证明','16–19 min · §2 / p.36');
math(String.raw`n\ge2:\qquad\#\text{odd permutations}=\#\text{even permutations}=\frac{n!}{2}`);
text('For n at least two, odd and even permutations occur equally often. To prove this, let s be the number of odd permutations and t the number of even permutations. Exchange the first two entries of every odd permutation. Theorem One tells us that every result is even.');
text('Different inputs give different outputs: if two outputs were equal, exchanging their first two entries again would make the inputs equal. Thus we have s distinct even permutations, and s is at most t. The same argument starting with even permutations gives t at most s.');
math(String.raw`s\le t,\qquad t\le s\quad\Longrightarrow\quad s=t`);
math(String.raw`s+t=n!\quad\Longrightarrow\quad s=t=\frac{n!}{2}`);
text('Since the total number is n factorial, each class has n factorial over two elements. The restriction n at least two is necessary: for n equal to one, the only permutation is even.');

section('theorem-two','Sorting by transpositions','定理2及完整证明','19–25 min · §2 / p.36');
text('Theorem Two states that every permutation can be transformed into natural order by transpositions, and conversely. The number of transpositions has the same parity as the original permutation. We prove existence first, and then the parity statement.');
math(String.raw`j_1\cdots j_n\longleftrightarrow12\cdots n,\qquad m\equiv\tau(j_1\cdots j_n)\pmod2`);
heading('Existence by induction');
text('For n equal to one, the permutation is already in natural order, so zero exchanges suffice. Assume that every permutation of order n minus one can be sorted. Consider a permutation of order n.');
text('If the last entry is n, its first n minus one entries form a permutation of one through n minus one. By the induction hypothesis, we sort those entries while leaving the final n fixed.');
math(String.raw`j_n=n:\qquad j_1\cdots j_{n-1}n\longrightarrow12\cdots(n-1)n`);
text('If the last entry is not n, exchange it with the entry n. The result ends in n, and we have reduced the problem to the previous case. This completes the induction. Each exchange is its own inverse, so reversing the sequence gives the converse transformation.');
math(String.raw`j_n\ne n:\qquad j_1\cdots j_n\longrightarrow j'_1\cdots j'_{n-1}n\longrightarrow12\cdots n`);
heading('Parity of the number of exchanges');
text('The natural order is even. Starting from it, each exchange reverses parity. After m exchanges, the result is even if m is even, and odd if m is odd. Hence m and the inversion number of the resulting permutation have the same parity. Reversing the sequence preserves its length, which proves the statement in both directions.');
math(String.raw`(-1)^m=(-1)^{\tau(j_1\cdots j_n)}`);
text('Different sequences may have different lengths, but their parity is fixed. We will use exactly this parity information to assign signs to determinant terms.');

section('definition-four','The determinant of order n','新增 定义4与符号规则','25–31 min · §3 / p.36–37');
cue('新增内容。从这里起所有元素属于固定数域P。先写一般方阵，再写求和定义，口述说明下标。');
text('From now on, all entries belong to a fixed number field P. Consider n squared entries arranged in n rows and n columns. A determinant is a signed sum of products, each choosing exactly one entry from every row and every column.');
math(String.raw`D=\begin{vmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\a_{21}&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{vmatrix}`);
text('Write the factors in increasing row order. Then a typical product has the following form, where the column indices form a permutation of one through n.');
math(String.raw`a_{1j_1}a_{2j_2}\cdots a_{nj_n},\qquad j_1j_2\cdots j_n\text{ a permutation}`);
text('Definition Four assigns a positive sign to an even column permutation and a negative sign to an odd one. The determinant is the sum over all these permutations.');
math(String.raw`\boxed{D=\sum_{j_1\cdots j_n}(-1)^{\tau(j_1\cdots j_n)}a_{1j_1}a_{2j_2}\cdots a_{nj_n}}`);
text('Read this as: sum over all permutations j one through j n, of minus one to the inversion number, times the selected product. There are n factorial indexed terms. Some terms may vanish or cancel. Since P is closed under these arithmetic operations, the determinant value also belongs to P.');
text('For order two, the column permutations are one two and two one, with inversion numbers zero and one. This reproduces the familiar formula. For order three, the six permutations give the six signed terms.');
math(String.raw`D_2=a_{11}a_{22}-a_{12}a_{21}`);
math(String.raw`\begin{aligned}D_3={}&a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32}\\&-a_{11}a_{23}a_{32}-a_{12}a_{21}a_{33}-a_{13}a_{22}a_{31}.\end{aligned}`);
text('The essential rule is: first fix the row order, then determine the sign from the column permutation. We will shortly remove the need to put the factors in that particular order.');

section('triangular','Evaluating structured determinants','新增 例题与三角行列式证明','31–36 min · §3 / p.37–38');
heading('A short example');
math(String.raw`\begin{vmatrix}0&0&0&1\\0&0&2&0\\0&3&0&0\\4&0&0&0\end{vmatrix}=(-1)^{\tau(4321)}(1\cdot2\cdot3\cdot4)=24`);
text('In this example, only one indexed product can be nonzero. Its column permutation is four three two one, which has six inversions. The sign is therefore positive, and the determinant is twenty-four.');
heading('Upper triangular determinants');
math(String.raw`\begin{vmatrix}a_{11}&a_{12}&\cdots&a_{1n}\\0&a_{22}&\cdots&a_{2n}\\\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&a_{nn}\end{vmatrix}=a_{11}a_{22}\cdots a_{nn}`);
text('An upper triangular determinant has zero entries below its main diagonal. We can evaluate it directly from the definition. For a product to be nonzero, its entry from the last row must be a n n, so j n must equal n.');
text('In the next row, only columns n minus one and n can contribute. But column n is already used, so j n minus one must equal n minus one. Repeating this argument upwards forces every j i to equal i.');
math(String.raw`j_n=n\ \Longrightarrow\ j_{n-1}=n-1\ \Longrightarrow\ \cdots\ \Longrightarrow\ j_1=1`);
text('Thus every term except the diagonal product is zero. The diagonal term has the natural column order, whose sign is positive. This proves the formula, even when a diagonal entry is zero: the surviving candidate product is then also zero.');
text('The main diagonal runs from the top left to the bottom right. A diagonal determinant has all off-diagonal entries zero. It is a special case of the triangular result, so its value is the product of its diagonal entries. In particular, when they are all one, the value is one.');
math(String.raw`\begin{vmatrix}d_1&0&\cdots&0\\0&d_2&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\0&0&\cdots&d_n\end{vmatrix}=d_1\cdots d_n,\qquad \det I_n=1`);

section('general-sign','The sign of a term in any order','新增 一般项符号及完整证明','36–43 min · §3 / p.39');
text('Multiplication is commutative, so the factors of a determinant term may be written in any order. Suppose we write a product as follows, where both the row indices and the column indices are permutations.');
math(String.raw`a_{i_1j_1}a_{i_2j_2}\cdots a_{i_nj_n}`);
text('Its assigned sign is minus one raised to the sum of the two inversion numbers. Here sign means the plus or minus coefficient in the determinant expansion, not the numerical sign of the product of its entries.');
math(String.raw`\boxed{\text{assigned sign}=(-1)^{\tau(i_1\cdots i_n)+\tau(j_1\cdots j_n)}}`);
heading('Proof');
text('Reorder the factors by transpositions until their row indices are in natural order. This is possible by Theorem Two. Let the corresponding reordered column sequence be j prime one through j prime n. The product is now in the standard form used in the determinant definition.');
math(String.raw`a_{i_1j_1}\cdots a_{i_nj_n}\longrightarrow a_{1j'_1}\cdots a_{nj'_n}`);
text('At each exchange of two factors, the row sequence undergoes one transposition, and the column sequence undergoes the same positional transposition. By Theorem One, both inversion numbers reverse parity. Their sum therefore keeps the same parity.');
math(String.raw`\tau(i_1\cdots i_n)+\tau(j_1\cdots j_n)\pmod2\quad\text{is unchanged}`);
text('After all the exchanges, the row sequence has inversion number zero. The proposed sign is therefore equal to minus one to the inversion number of the reordered column sequence. That is precisely the sign specified by the definition. This proves the formula.');
math(String.raw`\begin{aligned}(-1)^{\tau(i_1\cdots i_n)+\tau(j_1\cdots j_n)}&=(-1)^{\tau(12\cdots n)+\tau(j'_1\cdots j'_n)}\\&=(-1)^{\tau(j'_1\cdots j'_n)}.\end{aligned}`);
heading('A sign check');
cue('保留教材这一例，它直接检验新公式；不新增额外计算练习。');
math(String.raw`a_{21}a_{32}a_{14}a_{43}:\quad\tau(2314)=2,\quad\tau(1243)=1,\quad(-1)^{2+1}=-1`);
text('For this product, the row sequence is two three one four and the column sequence is one two four three. Their inversion numbers are two and one, so the assigned sign is negative. In increasing row order, the column sequence is four one two three, with three inversions. It gives the same sign.');
math(String.raw`a_{14}a_{21}a_{32}a_{43}:\qquad\tau(4123)=3,\qquad(-1)^3=-1`);

section('transpose','Transposition leaves the determinant unchanged','新增 按列定义与性质1证明','43–49 min · §3 / p.39–40');
heading('Writing the definition in column order');
text('The general sign formula treats row indices and column indices symmetrically. We may therefore put the column indices, rather than the row indices, in natural order. Their inversion number is then zero, leaving only the inversion number of the row permutation.');
math(String.raw`D=\sum_{i_1\cdots i_n}(-1)^{\tau(i_1\cdots i_n)}a_{i_1 1}a_{i_2 2}\cdots a_{i_n n}`);
text('This is an alternative expression for the same determinant. We still select exactly one entry from each row and column, but now list the factors in increasing column order.');
heading('Property 1 and proof');
text('The transpose is obtained by interchanging rows and columns: the entry in position i, j moves to position j, i. Property One states that this operation does not change the determinant. For convenient notation, let A denote the array of entries and B its transpose.');
math(String.raw`B=A^{\mathsf T},\qquad b_{ij}=a_{ji},\qquad\boxed{\det(A^{\mathsf T})=\det A}`);
text('To prove this using the textbook argument, expand B in column order. Replace each b sub i k by a sub k i. The resulting sum is exactly the row-ordered definition of the determinant of A.');
math(String.raw`\begin{aligned}\det B&=\sum_{i_1\cdots i_n}(-1)^{\tau(i_1\cdots i_n)}b_{i_1 1}\cdots b_{i_n n}\\&=\sum_{i_1\cdots i_n}(-1)^{\tau(i_1\cdots i_n)}a_{1i_1}\cdots a_{ni_n}\\&=\det A.\end{aligned}`);
text('This proves the property. Notice that transposing exchanges the roles of all rows and columns; it is different from swapping two entries of a permutation.');
heading('The lower triangular case');
text('A lower triangular array has zeros above the main diagonal. Its transpose is upper triangular with exactly the same diagonal entries. By transposition invariance and the result already proved, its determinant is also the product of those entries.');
math(String.raw`\begin{vmatrix}a_{11}&0&\cdots&0\\a_{21}&a_{22}&\cdots&0\\\vdots&\vdots&\ddots&\vdots\\a_{n1}&a_{n2}&\cdots&a_{nn}\end{vmatrix}=a_{11}a_{22}\cdots a_{nn}`);
text('More generally, a determinant property about rows has a corresponding property about columns, obtained by transposition. This symmetry will be used repeatedly in the next section.');

section('summary','Summary','结尾回顾','49–50 min');
text('Let me summarize the main chain of reasoning. Inversions define the parity of a permutation, and a transposition reverses that parity. These facts give a consistent sign rule for determinant terms. The determinant is the signed sum of products selecting one entry from every row and column. For triangular arrays, the definition reduces to the diagonal product. Finally, the sign formula is symmetric in row and column indices, which leads to the column-ordered expression and proves invariance under transposition. Next time, we can use this foundation to study the remaining determinant properties. Thank you.');

section('reading-guide','Formula reading guide','英文公式读法','备课参考 · 不额外占用课堂时间');
text('下面读法覆盖原有与新增内容。长公式先说明结构，再指向各部分，不必逐项机械朗读。');
for(const [formula,reading] of [
 [String.raw`a_{ij},\ a_{1j_1}`, '“a sub i j”; “a sub one, j one.” 指向板书，区分行指标1与列指标j₁。'],
 [String.raw`\tau(j_1\cdots j_n)`, '“tau of the permutation j one through j n.”'],
 [String.raw`n!,\quad\frac{n!}{2}`, '“n factorial”; “n factorial divided by two.”'],
 [String.raw`(-1)^{\tau(j_1\cdots j_n)}`, '“minus one raised to the inversion number of the column permutation.”'],
 [String.raw`\sum_{j_1\cdots j_n}`, '“sum over all permutations j one through j n.”'],
 [String.raw`a_{1j_1}\cdots a_{nj_n}`, '“the product of a sub one j one through a sub n j n.”'],
 [String.raw`(-1)^{\tau(i_1\cdots i_n)+\tau(j_1\cdots j_n)}`, '“minus one raised to the sum of the inversion numbers of the row and column permutations.”'],
 [String.raw`m\equiv\tau\pmod2`, '“m is congruent to tau modulo two”; more naturally, “m and the inversion number have the same parity.”'],
 [String.raw`A^{\mathsf T},\quad\det(A^{\mathsf T})=\det A`, '“A transpose”; “the determinant of A transpose equals the determinant of A.”'],
 [String.raw`b_{ij}=a_{ji}`, '“b sub i j equals a sub j i.”'],
 [String.raw`j_{n-1}=n-1`, '“j sub n minus one equals n minus one.” 第一个n−1整体是下标。']
]){math(formula);text(reading)}
heading('Terms for the added section');
text('upper triangular determinant：上三角行列式；lower triangular determinant：下三角行列式；main diagonal：主对角线；transpose：转置；row index / column index：行指标／列指标；assigned sign：展开项前的正负号；commutativity of multiplication：乘法交换律。');

section('rehearsal','Rehearsal notes','试讲重点与内容边界','备课参考');
text('新增内容建议先重点理解两份证明：上三角行列式为何只剩对角项；一般项符号为何由两个逆序数之和决定。转置不变性则直接接在后者之后。遇到不熟悉的环节，可回到对话逐点学习。');
text('试讲时检查9、25、36、43分钟四个节点。正文约为半小时以内的口述量，剩余时间留给公式书写和指示；你的实际语速和板书速度决定最终时间。50分钟是目标，不是已经实测的结果。');
text('若超时，先减少例题解释和重复读公式，不压缩核心证明。可简述反对角线例题及一般项的数值检查，将完整板书时间留给定义4、符号不变性和转置证明。若仍超时，下次可将转置性质作为下一讲开头。');
heading('Textbook boundary');
text('本稿至第40页§4之前结束。包含§2的定义1—3、定理1及推论、定理2；§3的定义4、重要例题结论及推导、一般项符号证明、按列表达式、性质1与证明以及下三角推论。§4中的其余性质暂未纳入。');
fs.writeFileSync('content/lecture-source.json',JSON.stringify(sections,null,2));
console.log(`Revised ${sections.length} sections; ${sections.filter(x=>!['plan','reading-guide','rehearsal'].includes(x.id)).flatMap(x=>x.blocks).filter(x=>x.type==='text').reduce((a,b)=>a+b.text.split(/\s+/).length,0)} spoken words.`);
