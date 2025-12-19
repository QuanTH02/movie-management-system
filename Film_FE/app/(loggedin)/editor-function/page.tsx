"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/common/Navbar";
import Container from "@/app/components/common/Container";
import Card from "@/app/components/common/Card";
import Button from "@/app/components/common/Button";

function EditorFunctionPage() {
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
              Editor Functions
            </h1>

            <Card className="p-6">
              <p className="text-dark-text-secondary mb-4">
                This page is for content editors to manage movies and content.
              </p>
              <div className="space-y-4">
                <Button variant="primary" fullWidth>
                  Add New Movie
                </Button>
                <Button variant="outline" fullWidth>
                  Edit Existing Movie
                </Button>
                <Button variant="outline" fullWidth>
                  Manage Reviews
                </Button>
                <Button variant="outline" fullWidth>
                  Manage Users
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
