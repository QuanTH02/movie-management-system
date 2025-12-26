"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import Button from "@/app/components/common/Button";
import Select from "@/app/components/common/Select";
import Checkbox from "@/app/components/common/Checkbox";
import { useI18n } from "@/app/lib/i18n";

function SettingPage() {
  const { t } = useI18n();
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
            <h1 className="text-3xl font-bold text-dark-text mb-8">
              {t.pages.setting.settings}
            </h1>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-dark-text mb-4">
                {t.pages.setting.appearance}
              </h2>
              <div className="space-y-4">
                <Select
                  label={t.pages.setting.theme}
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "dark" | "light")}
                  options={[
                    { value: "dark", label: t.pages.setting.dark },
                    { value: "light", label: t.pages.setting.light },
                  ]}
                />
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-dark-text mb-4">
                {t.pages.setting.notifications}
              </h2>
              <div className="space-y-4">
                <Checkbox
                  label={t.pages.setting.enableNotifications}
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="primary">{t.common.save}</Button>
              <Button variant="outline">{t.common.cancel}</Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SettingPage;
