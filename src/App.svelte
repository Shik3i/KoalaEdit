<script lang="ts">
  let theme = $state<'light' | 'dark'>('dark')

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light'
  }
</script>

<div class="app" data-theme={theme}>
  <header class="toolbar">
    <h1 class="title">KoalaEdit</h1>
    <button class="icon-btn" onclick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  </header>

  <main class="workspace">
    <aside class="sidebar">
      <p class="placeholder">Files</p>
    </aside>

    <section class="editor-pane">
      <p class="placeholder">Editor</p>
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
    color: var(--color-text);
    cursor: pointer;
    font-size: 16px;
  }
  .icon-btn:hover {
    background: var(--color-surface-hover);
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

  .placeholder {
    color: var(--color-text-muted);
    font-size: 13px;
  }
</style>
