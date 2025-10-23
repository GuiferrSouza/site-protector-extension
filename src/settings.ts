const STORAGE_KEY = "siteProtectorSettings";

export interface ExtensionSettings {
  forbiddenWords: string[];
  forbiddenTdls: string[];
  forbiddenDomains: string[];
  forbiddenUrls: string[];
  protectionEnabled: boolean;
}

const defaultSettings: ExtensionSettings = {
  forbiddenWords: ["phishing", "malware"],
  forbiddenTdls: ["tk", "ml", "ga", "cf", "gq", "xyz", "top", "work"],
  forbiddenDomains: [],
  forbiddenUrls: [],
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