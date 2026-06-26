import localForage from 'localforage'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

const notesStore = localForage.createInstance({
  name: 'koalaedit',
  storeName: 'notes',
})

export async function getNotes(): Promise<Note[]> {
  const notes: Note[] = []
  await notesStore.iterate<Note, void>((value) => {
    notes.push(value)
  })
  return notes.sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getNote(id: string): Promise<Note | null> {
  return notesStore.getItem<Note>(id)
}

export async function saveNote(note: Note): Promise<void> {
  await notesStore.setItem(note.id, note)
}

export async function deleteNote(id: string): Promise<void> {
  await notesStore.removeItem(id)
}

export function createNote(title = 'Untitled', content = ''): Note {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  }
}
