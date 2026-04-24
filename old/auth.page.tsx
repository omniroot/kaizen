import { Button } from "@chakra-ui/react";
import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

export const AuthPage = () => {
  const { code }: { code: string | undefined } = useSearch({ strict: false });

  useEffect(() => {
    if (code) {
      console.log("Authorized: ", code);

      // loginWithGithub({ githubCode: code });
    }
  }, [code]);

  return (
    <div>
      <Button onClick={() => window.location.href}>Sign in with GitHub</Button>
    </div>
  );
};
