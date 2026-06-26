<script lang="ts">
  import { Files, Plus, Trash } from 'phosphor-svelte'
  import type { Note } from '../lib/store/storage'

  let {
    notes = [] as Note[],
    activeId = '',
    onSelect = (_id: string) => {},
    onNew = () => {},
    onDelete = (_id: string) => {},
  }: {
    notes?: Note[]
    activeId?: string
    onSelect?: (id: string) => void
    onNew?: () => void
    onDelete?: (id: string) => void
  } = $props()

  function formatDate(ts: number): string {
    const d = new Date(ts)
    const now = new Date()
    const sameDay = d.toDateString() === now.toDateString()
    if (sameDay) {
      return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  function truncateTitle(title: string, max = 28): string {
    return title.length > max ? title.slice(0, max) + '...' : title
  }
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <Files size={14} />
    <span>Notes</span>
    <button class="new-btn" onclick={onNew} aria-label="New note">
      <Plus size={14} />
    </button>
  </div>

  <div class="note-list">
    {#each notes as note (note.id)}
      <div
        class="note-item"
        class:active={note.id === activeId}
        onclick={() => onSelect(note.id)}
        onkeydown={(e) => e.key === 'Enter' && onSelect(note.id)}
        role="button"
        tabindex="0"
      >
        <span class="note-title">{truncateTitle(note.title)}</span>
        <span class="note-meta">{formatDate(note.updatedAt)}</span>
        <button
          class="delete-btn"
          onclick={(e) => { e.stopPropagation(); onDelete(note.id) }}
          aria-label="Delete note"
        >
          <Trash size={12} />
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .sidebar { display: flex; flex-direction: column; height: 100%; }
  .sidebar-header {
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.06em; color: var(--color-text-muted);
    padding: 4px 4px 8px;
  }
  .new-btn {
    margin-left: auto; display: flex; align-items: center; justify-content: center;
    width: 20px; height: 20px; border: none; border-radius: 3px;
    background: transparent; color: var(--color-text-muted); cursor: pointer;
  }
  .new-btn:hover { background: var(--color-surface-hover); color: var(--color-text); }
  .note-list { display: flex; flex-direction: column; gap: 1px; overflow-y: auto; flex: 1; }
  .note-item {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 8px; border: none; border-radius: 4px;
    background: transparent; color: var(--color-text); cursor: pointer;
    text-align: left; width: 100%;
  }
  .note-item:hover { background: var(--color-surface-hover); }
  .note-item.active { background: var(--color-accent); color: var(--color-accent-text); }
  .note-title {
    flex: 1; font-size: 13px; font-weight: 500;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .note-meta { font-size: 11px; color: var(--color-text-muted); white-space: nowrap; flex-shrink: 0; }
  .note-item.active .note-meta { color: rgba(255, 255, 255, 0.7); }
  .delete-btn {
    display: none; align-items: center; justify-content: center;
    width: 18px; height: 18px; border: none; border-radius: 3px;
    background: transparent; color: var(--color-text-muted); cursor: pointer; flex-shrink: 0;
  }
  .note-item:hover .delete-btn { display: flex; }
  .delete-btn:hover { color: var(--color-danger); background: rgba(239, 68, 68, 0.1); }
  .note-item.active .delete-btn { color: rgba(255, 255, 255, 0.6); }
  .note-item.active .delete-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.15); }
</style>
