<script lang="ts">
  import { createEditor, type ContentCallback } from '../lib/editor/editor'
  import { onMount, onDestroy } from 'svelte'

  let { content = $bindable(''), dark = true }: { content?: string; dark?: boolean } = $props()

  let container: HTMLDivElement
  let view: ReturnType<typeof createEditor> | undefined

  const handleChange: ContentCallback = (val) => {
    content = val
  }

  $effect(() => {
    if (!container) return
    view?.destroy()
    view = createEditor(container, content, handleChange, dark)

    return () => view?.destroy()
  })

  // Re-theme on dark change without destroying
  $effect(() => {
    if (!view) return
    // Update theme via CSS variable
    container.style.setProperty('--cm-color', dark ? '#e5e5e5' : '#1a1a1a')
  })
</script>

<div bind:this={container} class="editor-container"></div>

<style>
  .editor-container {
    height: 100%;
    overflow-y: auto;
  }
  .editor-container :global(.cm-editor) {
    height: 100%;
  }
  .editor-container :global(.cm-editor .cm-scroller) {
    overflow: auto;
  }
</style>
