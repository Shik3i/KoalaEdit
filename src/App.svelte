<script lang="ts">
  import { Moon, Sun, MarkdownLogo } from 'phosphor-svelte'
  import Editor from './components/Editor.svelte'
  import Preview from './components/Preview.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import { getNotes, saveNote, deleteNote, createNote, type Note } from './lib/store/storage'

  let theme = $state<'light' | 'dark'>(
    (typeof localStorage !== 'undefined' && localStorage.getItem('koala-theme') as 'light' | 'dark') || 'dark'
  )

  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (typeof localStorage !== 'undefined') localStorage.setItem('koala-theme', theme)
  })
  let notes = $state<Note[]>([])
  let activeNoteId = $state<string | null>(null)
  let content = $state('')
  let loaded = $state(false)
  let saveTimer: ReturnType<typeof setTimeout> | null = null

  $effect(() => {
    if (loaded) return
    getNotes().then((n) => {
      notes = n
      loaded = true
      if (n.length > 0) {
        selectNote(n[0]!.id)
      } else {
        handleNew()
      }
    })
  })

  async function selectNote(id: string) {
    activeNoteId = id
    const note = notes.find((n) => n.id === id)
    if (note) content = note.content
  }

  function handleNew() {
    const note = createNote()
    notes = [note, ...notes]
    activeNoteId = note.id
    content = note.content
  }

  async function handleDelete(id: string) {
    await deleteNote(id)
    notes = notes.filter((n) => n.id !== id)
    if (activeNoteId === id) {
      if (notes.length > 0) {
        selectNote(notes[0]!.id)
      } else {
        handleNew()
      }
    }
  }

  // Auto-save on content change
  $effect(() => {
    void content // track this dependency
    if (!loaded || !activeNoteId) return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(saveCurrentNote, 500)
  })

  async function saveCurrentNote() {
    if (!activeNoteId) return
    const idx = notes.findIndex((n) => n.id === activeNoteId)
    if (idx === -1) return
    const note = notes[idx]!
    const updated = { ...note, content, updatedAt: Date.now() }
    const firstLine = content.split('\n')[0]!.replace(/^#\s*/, '').trim()
    updated.title = firstLine || 'Untitled'
    notes = notes.map((n) => (n.id === activeNoteId ? updated : n))
    await saveNote(updated)
  }

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light'
  }
</script>

<div class="app" data-theme={theme}>
  <header class="toolbar">
    <div class="toolbar-left">
      <MarkdownLogo size={18} weight="fill" color="var(--color-accent)" />
      <span class="title">KoalaEdit</span>
    </div>
    <div class="toolbar-right">
      <button class="icon-btn" onclick={toggleTheme} aria-label="Toggle theme">
        {#if theme === 'light'}
          <Sun size={16} />
        {:else}
          <Moon size={16} />
        {/if}
      </button>
    </div>
  </header>

  <main class="workspace">
    <aside class="sidebar">
      <Sidebar
        {notes}
        activeId={activeNoteId ?? ''}
        onSelect={selectNote}
        onNew={handleNew}
        onDelete={handleDelete}
      />
    </aside>

    <section class="editor-pane">
      <Editor bind:content dark={theme === 'dark'} />
    </section>

    <section class="preview-pane">
      <Preview {content} dark={theme === 'dark'} />
    </section>
  </main>
</div>

<style>
  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 12px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
    gap: 8px;
  }

  .toolbar-left,
  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
  }
  .icon-btn:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  .workspace {
    flex: 1;
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    overflow: hidden;
  }

  .sidebar {
    border-right: 1px solid var(--color-border);
    padding: 8px;
    overflow-y: auto;
  }

  .editor-pane,
  .preview-pane {
    padding: 16px;
    overflow-y: auto;
  }

  .preview-pane {
    border-left: 1px solid var(--color-border);
    background: var(--color-surface-alt);
  }
</style>
