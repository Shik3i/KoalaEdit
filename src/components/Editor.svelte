<script lang="ts">
  import { createEditor, type ContentCallback } from '../lib/editor/editor'

  let { content = $bindable(''), dark = true }: { content?: string; dark?: boolean } = $props()

  let container: HTMLDivElement
  let view: ReturnType<typeof createEditor> | undefined

  const handleChange: ContentCallback = (val) => {
    content = val
  }

  // Create editor once on mount
  $effect(() => {
    if (!container || view) return
    view = createEditor(container, content, handleChange, dark)

    return () => {
      view?.destroy()
      view = undefined
    }
  })

  // Re-theme when dark mode changes (recreate editor)
  let prevDark = $state(dark)
  $effect(() => {
    if (!view) return
    if (dark === prevDark) return
    prevDark = dark
    const pos = view.state.selection.main.head
    view.destroy()
    view = createEditor(container, content, handleChange, dark, pos)
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
