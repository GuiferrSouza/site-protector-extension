import { useEffect, useState } from "react";
import type { ExtensionSettings } from "./settings";
import { getSettings, saveSettings } from "./settings";
import Header from "./components/Header";
import CollapsibleSection from "./components/CollapsibleSection";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { Lock, Globe, Link, FileX } from "lucide-react";

export default function App() {
  const [settings, setSettings] = useState<ExtensionSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [newForbiddenWord, setNewForbiddenWord] = useState("");
  const [newForbiddenDomains, setNewForbiddenDomains] = useState("");
  const [newForbiddenUrls, setNewForbiddenUrls] = useState("");
  const [newForbiddenTdls, setNewForbiddenTdls] = useState("");

  useEffect(() => {
    getSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const updateSetting = async (updates: Partial<ExtensionSettings>) => {
    if (!settings) return;
    const updated = { ...settings, ...updates };
    setSettings(updated);
    await saveSettings(updated);
  };

  if (loading || !settings) {
    return <LoadingScreen />;
  }

  const {
    forbiddenWords,
    forbiddenDomains,
    forbiddenUrls,
    forbiddenTdls,
    protectionEnabled
  } = settings;

  const totalRules = [
    forbiddenWords,
    forbiddenDomains,
    forbiddenUrls,
    forbiddenTdls
  ].reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="w-[420px] h-[600px] bg-gray-900 text-white flex flex-col">
      <Header protectionEnabled={protectionEnabled} onToggle={(checked) => updateSetting({ protectionEnabled: checked })} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <CollapsibleSection title="Forbidden Words" icon={Lock} items={forbiddenWords} onAdd={() => {
          if (!newForbiddenWord.trim()) return;
          updateSetting({ forbiddenWords: [newForbiddenWord.trim(), ...forbiddenWords] });
          setNewForbiddenWord("");
        }}
          onRemove={(item) =>
            updateSetting({ forbiddenWords: forbiddenWords.filter((i) => i !== item) })
          }
          newItem={newForbiddenWord}
          setNewItem={setNewForbiddenWord}
          placeholder="Type a word..."
          color="text-red-400" />

        <CollapsibleSection title="Forbidden Domains" icon={Globe} items={forbiddenDomains} onAdd={() => {
          if (!newForbiddenDomains.trim()) return;
          updateSetting({ forbiddenDomains: [newForbiddenDomains.trim(), ...forbiddenDomains] });
          setNewForbiddenDomains("");
        }}
          onRemove={(item) =>
            updateSetting({ forbiddenDomains: forbiddenDomains.filter((i) => i !== item) })
          }
          newItem={newForbiddenDomains}
          setNewItem={setNewForbiddenDomains}
          placeholder="https://example.com"
          color="text-orange-400" />

        <CollapsibleSection title="Forbidden URLs" icon={Link} items={forbiddenUrls} onAdd={() => {
          if (!newForbiddenUrls.trim()) return;
          updateSetting({ forbiddenUrls: [newForbiddenUrls.trim(), ...forbiddenUrls] });
          setNewForbiddenUrls("");
        }}
          onRemove={(item) =>
            updateSetting({ forbiddenUrls: forbiddenUrls.filter((i) => i !== item) })
          }
          newItem={newForbiddenUrls}
          setNewItem={setNewForbiddenUrls}
          placeholder="https://example.com/page"
          color="text-purple-400"
        />

        <CollapsibleSection title="Forbidden TDLs" icon={FileX} items={forbiddenTdls} onAdd={() => {
          if (!newForbiddenTdls.trim()) return;
          updateSetting({ forbiddenTdls: [newForbiddenTdls.trim(), ...forbiddenTdls] });
          setNewForbiddenTdls("");
        }}
          onRemove={(item) =>
            updateSetting({ forbiddenTdls: forbiddenTdls.filter((i) => i !== item) })
          }
          newItem={newForbiddenTdls}
          setNewItem={setNewForbiddenTdls}
          placeholder="xyz"
          color="text-blue-400"
        />
      </div>

      <Footer totalRules={totalRules} />
    </div>
  );
}