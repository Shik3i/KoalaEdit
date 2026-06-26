<script lang="ts">
  import { onMount } from 'svelte'
  import { renderMarkdown } from '../lib/markdown/render'

  let { content = '', dark = true }: { content?: string; dark?: boolean } = $props()

  let html = $state('')
  let loading = $state(true)

  async function update() {
    loading = true
    try {
      html = await renderMarkdown(content, dark)
    } catch (e) {
      html = '<p style="color:var(--color-danger)">Render error</p>'
    }
    loading = false
  }

  $effect(() => {
    content; dark  // track deps
    update()
  })
</script>

<div class="preview">
  {#if loading}
    <div class="preview-placeholder">rendering...</div>
  {:else}
    <div class="preview-content">{@html html}</div>
  {/if}
</div>

<style>
  .preview {
    height: 100%;
    overflow-y: auto;
  }

  .preview-placeholder {
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-size: 13px;
  }

  .preview-content {
    font-size: 14px;
    line-height: 1.7;
    color: var(--color-text);
  }

  .preview-content :global(h1),
  .preview-content :global(h2),
  .preview-content :global(h3) {
    margin: 1.5em 0 0.5em;
    font-weight: 600;
    line-height: 1.3;
  }

  .preview-content :global(h1) { font-size: 1.75em; }
  .preview-content :global(h2) { font-size: 1.35em; }
  .preview-content :global(h3) { font-size: 1.1em; }

  .preview-content :global(p) { margin: 0.75em 0; }
  .preview-content :global(ul),
  .preview-content :global(ol) { margin: 0.5em 0; padding-left: 1.5em; }
  .preview-content :global(li) { margin: 0.25em 0; }
  .preview-content :global(blockquote) {
    margin: 0.75em 0;
    padding: 0.5em 1em;
    border-left: 3px solid var(--color-accent);
    background: var(--color-surface-alt);
    border-radius: 0 4px 4px 0;
  }
  .preview-content :global(code) {
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 0.15em 0.4em;
    background: var(--color-surface-alt);
    border-radius: 3px;
  }
  .preview-content :global(pre) {
    margin: 0.75em 0;
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
  }
  .preview-content :global(pre code) {
    background: transparent;
    padding: 0;
    font-size: 13px;
    line-height: 1.55;
  }
  .preview-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }
  .preview-content :global(th),
  .preview-content :global(td) {
    padding: 0.5em 0.75em;
    border: 1px solid var(--color-border);
    text-align: left;
  }
  .preview-content :global(th) {
    font-weight: 600;
    background: var(--color-surface-alt);
  }
  .preview-content :global(hr) {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 1.5em 0;
  }
  .preview-content :global(img) {
    max-width: 100%;
    border-radius: 4px;
  }
  .preview-content :global(a) {
    color: var(--color-accent);
    text-decoration: none;
  }
  .preview-content :global(a:hover) {
    text-decoration: underline;
  }
</style>
