import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'

export type ContentCallback = (content: string) => void

export function createEditor(
  parent: HTMLElement,
  initialContent = '',
  onContentChange?: ContentCallback,
  dark = true,
  cursorPos?: number,
): EditorView {
  const theme = EditorView.theme(
    {
      '&': {
        backgroundColor: 'transparent',
        color: dark ? '#e5e5e5' : '#1a1a1a',
        height: '100%',
        fontSize: '14px',
        fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
      },
      '&.cm-editor': { outline: 'none' },
      '.cm-scroller': {
        fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
        lineHeight: '1.7',
      },
      '.cm-content': { caretColor: '#3b82f6', padding: '0' },
      '.cm-cursor': { borderLeftColor: '#3b82f6' },
      '.cm-selectionBackground': {
        backgroundColor: dark
          ? 'rgba(59, 130, 246, 0.25)'
          : 'rgba(59, 130, 246, 0.15) !important',
      },
      '.cm-gutters': { display: 'none' },
      '.cm-activeLine': { backgroundColor: 'transparent' },
      '.cm-foldPlaceholder': { display: 'none' },
    },
    { dark },
  )

  const state = EditorState.create({
    doc: initialContent,
    extensions: [
      basicSetup,
      markdown({ base: markdownLanguage }),
      syntaxHighlighting(defaultHighlightStyle),
      theme,
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onContentChange?.(update.state.doc.toString())
        }
      }),
    ],
  })

  const view = new EditorView({ state, parent })

  if (cursorPos !== undefined) {
    view.dispatch({ selection: { anchor: cursorPos } })
  }

  return view
}
