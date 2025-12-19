"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import Button from "@/app/components/common/Button";
import { useI18n } from "@/app/lib/i18n";

function EditorFunctionPage() {
  const { t } = useI18n();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-dark-text mb-8">
              {t.pages.editorFunction.editorFunctions}
            </h1>

            <Card className="p-6">
              <p className="text-dark-text-secondary mb-4">
                {t.pages.editorFunction.description}
              </p>
              <div className="space-y-4">
                <Button variant="primary" fullWidth>
                  {t.pages.editorFunction.addNewMovie}
                </Button>
                <Button variant="outline" fullWidth>
                  {t.pages.editorFunction.editExistingMovie}
                </Button>
                <Button variant="outline" fullWidth>
                  {t.pages.editorFunction.manageReviews}
                </Button>
                <Button variant="outline" fullWidth>
                  {t.pages.editorFunction.manageUsers}
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}

export default EditorFunctionPage;
