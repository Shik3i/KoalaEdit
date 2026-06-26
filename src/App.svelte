<script lang="ts">
  import { Moon, Sun, MarkdownLogo, Files } from 'phosphor-svelte'
  import Editor from './components/Editor.svelte'

  let theme = $state<'light' | 'dark'>('dark')
  let content = $state('# Hello KoalaEdit\n\nStart writing markdown...')

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
      <div class="sidebar-header">
        <Files size={14} />
        <span>Files</span>
      </div>
    </aside>

    <section class="editor-pane">
      <Editor bind:content={content} dark={theme === 'dark'} />
    </section>

    <section class="preview-pane">
      <p class="placeholder">Preview</p>
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

  .sidebar-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-muted);
    padding: 4px 4px 12px;
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

  .placeholder {
    color: var(--color-text-muted);
    font-size: 13px;
    font-family: var(--font-mono);
  }
</style>
