"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import Button from "@/app/components/common/Button";

function SettingPage() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentAccount(localStorage.getItem("currentAccount"));
    }
  }, []);

  return (
    <>
      <Navbar currentAccount={currentAccount} />
      <div className="bg-dark-bg pt-20 pb-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-dark-text mb-8">Settings</h1>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-dark-text mb-4">
                Appearance
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-dark-text font-semibold mb-2">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) =>
                      setTheme(e.target.value as "dark" | "light")
                    }
                    className="w-full px-3 py-2 rounded-input bg-dark-card border border-dark-border text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-dark-text mb-4">
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-dark-text font-semibold">
                    Enable Notifications
                  </label>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="w-5 h-5 rounded bg-dark-card border-dark-border text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="primary">Save Settings</Button>
              <Button variant="outline">Reset to Default</Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SettingPage;
