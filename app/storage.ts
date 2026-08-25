const DB_NAME = "chandler-local";
const DB_VERSION = 1;
const STORE = "workspace";

export type WorkspaceState = {
  schemaVersion: number;
  savedAt: string;
  favorites: string[];
  compare: string[];
  bom: unknown[];
  stock: Record<string, number>;
  notes: Record<string, string>;
  customParts: unknown[];
  reviewDecisions: Record<string, string>;
  theme: "dark" | "light" | "contrast";
};

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) database.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Unable to open local workspace"));
  });
}

export async function readWorkspace(): Promise<WorkspaceState | null> {
  if (!("indexedDB" in window)) return null;
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, "readonly");
    const request = transaction.objectStore(STORE).get("current");
    request.onsuccess = () => resolve((request.result as WorkspaceState | undefined) ?? null);
    request.onerror = () => reject(request.error ?? new Error("Unable to read local workspace"));
    transaction.oncomplete = () => database.close();
  });
}

export async function writeWorkspace(state: WorkspaceState): Promise<void> {
  if (!("indexedDB" in window)) {
    localStorage.setItem("chandler-workspace-fallback", JSON.stringify(state));
    return;
  }
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).put(state, "current");
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Unable to save local workspace")); };
  });
}

export async function clearWorkspace(): Promise<void> {
  if (!("indexedDB" in window)) {
    localStorage.removeItem("chandler-workspace-fallback");
    return;
  }
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).delete("current");
    transaction.oncomplete = () => { database.close(); resolve(); };
    transaction.onerror = () => { database.close(); reject(transaction.error ?? new Error("Unable to clear local workspace")); };
  });
}

export function downloadText(filename: string, text: string, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
