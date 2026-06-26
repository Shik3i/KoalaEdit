import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'
import { createHighlighter, type Highlighter } from 'shiki/bundle/web'

let highlighter: Highlighter | null = null

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['min-light', 'min-dark'],
      langs: [
        'md', 'js', 'ts', 'css', 'html', 'json',
        'bash', 'python', 'rust', 'go', 'yaml', 'diff',
        'sql', 'xml', 'shell', 'dockerfile',
      ],
    })
  }
  return highlighter
}

let pipelineLight: ReturnType<typeof unified> | null = null
let pipelineDark: ReturnType<typeof unified> | null = null

async function getPipeline(theme: 'min-light' | 'min-dark') {
  const h = await getHighlighter()
  const key = theme === 'min-light' ? 'light' : 'dark'
  if (key === 'light' && !pipelineLight) {
    pipelineLight = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeShiki, { highlighter: h, theme })
      .use(rehypeStringify, { allowDangerousHtml: true })
  }
  if (key === 'dark' && !pipelineDark) {
    pipelineDark = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeShiki, { highlighter: h, theme })
      .use(rehypeStringify, { allowDangerousHtml: true })
  }
  return key === 'light' ? pipelineLight! : pipelineDark!
}

export async function renderMarkdown(
  markdown: string,
  dark: boolean,
): Promise<string> {
  const pipeline = await getPipeline(dark ? 'min-dark' : 'min-light')
  const result = await pipeline.process(markdown)
  return String(result)
}
