const STORAGE_KEY = "siteProtectorSettings";

export interface ExtensionSettings {
  forbiddenWords: string[];
  blacklist: string[];
  exactList: string[];
  whitelist: string[];
  protectionEnabled: boolean;
}

const defaultSettings: ExtensionSettings = {
  forbiddenWords: ["phishing", "malware"],
  blacklist: [],
  exactList: [],
  whitelist: ["https://www.google.com/"],
  protectionEnabled: true,
};

export async function getSettings(): Promise<ExtensionSettings> {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] ?? defaultSettings);
    });
  });
}

export async function saveSettings(settings: ExtensionSettings): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: settings }, () => resolve());
  });
}

export async function updateSettings(updates: Partial<ExtensionSettings>): Promise<void> {
  const current = await getSettings();
  const merged = { ...current, ...updates };
  await saveSettings(merged);
}

export async function resetSettings(): Promise<void> {
  await saveSettings(defaultSettings);
}