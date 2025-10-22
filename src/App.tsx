import { useEffect, useState } from "react";
import type { ExtensionSettings } from "./settings";
import { getSettings, saveSettings } from "./settings";
import Header from "./components/Header";
import CollapsibleSection from "./components/CollapsibleSection";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { Lock, Globe, Link, CheckCircle2 } from "lucide-react";

export default function App() {
  const [settings, setSettings] = useState<ExtensionSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [newWord, setNewWord] = useState("");
  const [newBlacklist, setNewBlacklist] = useState("");
  const [newWhitelist, setNewWhitelist] = useState("");
  const [newExact, setNewExact] = useState("");

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

  const totalRules = settings.forbiddenWords.length + settings.blacklist.length + settings.exactList.length;

  return (
    <div className="w-[420px] h-[600px] bg-gray-900 text-white flex flex-col">
      <Header protectionEnabled={settings.protectionEnabled} onToggle={(checked) => updateSetting({ protectionEnabled: checked })} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <CollapsibleSection title="Forbidden Words" icon={Lock} items={settings.forbiddenWords} onAdd={() => {
          if (!newWord.trim()) return;
          updateSetting({ forbiddenWords: [...settings.forbiddenWords, newWord.trim()] });
          setNewWord("");
        }}
          onRemove={(item) =>
            updateSetting({ forbiddenWords: settings.forbiddenWords.filter((i) => i !== item) })
          }
          newItem={newWord}
          setNewItem={setNewWord}
          placeholder="Type a word..."
          color="text-red-400" />

        <CollapsibleSection title="Dark List" icon={Globe} items={settings.blacklist} onAdd={() => {
          if (!newBlacklist.trim()) return;
          updateSetting({ blacklist: [...settings.blacklist, newBlacklist.trim()] });
          setNewBlacklist("");
        }}
          onRemove={(item) =>
            updateSetting({ blacklist: settings.blacklist.filter((i) => i !== item) })
          }
          newItem={newBlacklist}
          setNewItem={setNewBlacklist}
          placeholder="https://example.com"
          color="text-orange-400" />

        <CollapsibleSection title="Exact URLs" icon={Link} items={settings.exactList} onAdd={() => {
          if (!newExact.trim()) return;
          updateSetting({ exactList: [...settings.exactList, newExact.trim()] });
          setNewExact("");
        }}
          onRemove={(item) =>
            updateSetting({ exactList: settings.exactList.filter((i) => i !== item) })
          }
          newItem={newExact}
          setNewItem={setNewExact}
          placeholder="https://example.com/page"
          color="text-purple-400"
        />

        <CollapsibleSection title="White List" icon={CheckCircle2} items={settings.whitelist} onAdd={() => {
          if (!newWhitelist.trim()) return;
          updateSetting({ whitelist: [...settings.whitelist, newWhitelist.trim()] });
          setNewWhitelist("");
        }}
          onRemove={(item) =>
            updateSetting({ whitelist: settings.whitelist.filter((i) => i !== item) })
          }
          newItem={newWhitelist}
          setNewItem={setNewWhitelist}
          placeholder="https://example.com"
          color="text-green-400"
        />
      </div>

      <Footer totalRules={totalRules} allowedSites={settings.whitelist.length} />
    </div>
  );
}